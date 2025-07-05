import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import { handleUserSignUp, handleUserSignUpComplete, handleUserLogin, handlePatchPasswd, handleAutoComplete } from './controllers/user.controller.js';
import {
  handleUserEditProfile,
  handleUserProfile,
  handleUserDeleteProfile,
  handleRecentSearch,
  handleDeleteRecentSearch
} from "./controllers/user1.controller.js";
import {
  handleFacilitySearch,
  handleRouteSearch,
} from "./controllers/search.controller.js";

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
dotenv.config();
const app = express()
const port = process.env.PORT
app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };
  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };
  next();
});

app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(
    {},
    {
      swaggerOptions: {
        url: "/openapi.json",
      },
    }
  )
);

app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null";
  const routes = ["./src/index.js"];
  const protocol = req.protocol;
  const host = req.get("host");
  const doc = {
    info: {
      title: "제목",
      description: "설명",
    },
    host: `${protocol}://${host}`,
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.post('/auth/signup', handleUserSignUp);
app.post('/auth/complete', handleUserSignUpComplete)
app.post('/auth/login', handleUserLogin)
app.patch('/auth/resetPasswd', handlePatchPasswd)
app.patch('/profile/edit', handleUserEditProfile);
app.post('/profile/me', handleUserProfile);
app.delete('/profile/delete/me', handleUserDeleteProfile);
app.post('/recent', handleRecentSearch);
app.delete('/recent', handleDeleteRecentSearch);
app.get("/map/search", handleRouteSearch);
app.get("/facility/search", handleFacilitySearch);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "C001",
    reason: err.reason || err.message || "서버가 응답하지 못 하였습니다.",
    data: err.data || null,
  });

});


app.listen(port, () => {
  console.log(`Server: http://localhost:${port}`)
})
