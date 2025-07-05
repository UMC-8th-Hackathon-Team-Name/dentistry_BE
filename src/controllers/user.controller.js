import { StatusCodes } from "http-status-codes";
import { userSignUp,userSignUpComplete,userLogin,userPatchPasswd } from "../services/user.service.js";
import { bodyToUser,bodyToUserComplete } from "../dtos/user.dto.js";

export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입 요청했습니다")
  const user=await userSignUp(bodyToUser(req.body))
  console.log(user)
  res.status(StatusCodes.OK).success(user)
/*
    #swagger.tags = ['User']
    #swagger.summary = '회원가입'
    #swagger.description = '회원가입을 위한 API입니다. 이메일, 비밀번호를 포함해 요청해야 합니다. '
    
    #swagger.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: { type: 'string', example: 'email@email.com' },
              password: { type: 'string', example: '비밀번호' },
            },
            required: ['email','password']
          }
        }
      }
    }

    #swagger.responses[200] = {
      description: '회원가입 성공',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              resultType: { type: 'string', example: 'SUCCESS' },
              error: { type: 'object', example: null },
              success: {
                type: 'object',
                properties: {
                  id: { type: 'number', example: 1 },
                  email: { type: 'string', example: 'email@email.com' },
                  password: { type: 'string', example: '비밀번호' },
                  createdAt: { type: 'string', example: '2023-01-01T00:00:00.000Z' },
                  updatedAt: { type: 'string', example: '2023-01-01T00:00:00.000Z' }
                }
              }
            }
          }
        }
      }
    }

    #swagger.responses[409] = {
      description: '이메일 중복',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              resultType: { type: 'string', example: 'FAIL' },
              error: {
                type: 'object',
                properties: {
                  errorCode: { type: 'string', example: 'duplicate_email' },
                  reason: { type: 'string', example: '이미 존재하는 이메일입니다.' },
                  data: { type: 'object', example: null }
                
              },
              success: { type: 'object', example: null }
            }
          }
        }
      }
    }

    #swagger.responses[400] = {
      description: '비밀번호나 아이디가 입력되지 않았습니다',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              resultType: { type: 'string', example: 'FAIL' },
              error: {
                type: 'object',
                properties: {
                  errorCode: { type: 'string', example: 'duplicate_email' },
                  reason: { type: 'string', example: '이메일이나 비밀번호가 입력되지 않았습니다.' },
                  data: { type: 'object', example: null }
                
              },
              },
              success: { type: 'object', example: null }
            }
          }
        }
      }
    }
*/
};

export const handleUserSignUpComplete= async(req,res,next) => {
  console.log("세부정보 입력하기가 요청되었습니다.")
  const user=await userSignUpComplete(bodyToUserComplete(req.body))
  res.status(StatusCodes.OK).success(user)

  /*
    #swagger.tags = ['User']
    #swagger.summary = '회원가입 완료'
    #swagger.description = '회원가입 완료를 위한 API입니다. 유저 ID, 시설 정보를 포함해서 요청해야 합니다. '
    
    #swagger.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              userId: { type: 'int', example:  },
              facility: { type: 'array', example: '["엘리베이터" , "에스컬레이터"]' },
            },
            required: ['userId', 'facility']
          }
        }
      }
    }

    #swagger.responses[200] = {
      description: '회원가입 완료 성공',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              resultType: { type: 'string', example: 'SUCCESS' },
              error: { type: 'object', example: null },
              success: {
                type: 'object',
                properties: {
                  userId: { type: 'int', example:  },
                }
              }
            }
          }
        }
      }
    }


    #swagger.responses[400] = {
      description: '유저 ID 나 시설정보가 입력되지 않았습니다',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              resultType: { type: 'string', example: 'FAIL' },
              error: {
                type: 'object',
                properties: {
                  errorCode: { type: 'string', example: 'duplicate_email' },
                  reason: { type: 'string', example: '유저 ID 나 시설정보가 입력되지 않았습니다' },
                  data: { type: 'object', example: null }
                
              },
              },
              success: { type: 'object', example: null }
            }
          }
        }
      }
    }
*/
}
export const handleUserLogin=async(req,res,next)=>{
  const userId=await userLogin(bodyToUser(req.body))
  res.status(StatusCodes.OK).success(userId)

  /*
    #swagger.tags = ['User']
    #swagger.summary = '로그인 성공'
    #swagger.description = '로그인를 위한 API입니다. 이메일과 비밀번호를 포함해서 요청해야 합니다. '
    
    #swagger.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: { type: 'string', example: 'email@email.com' },
              password: { type: 'string', example: '비밀번호' }
            },
            required: ['email', 'password']
          }
        }
      }
    }

    #swagger.responses[200] = {
      description: '로그인 성공',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              resultType: { type: 'string', example: 'SUCCESS' },
              error: { type: 'object', example: null },
              success: {
                type: 'object',
                properties: {
                  userId: { type: 'int', example:  }
                }
              }
            }
          }
        }
      }
    }


    #swagger.responses[400] = {
      description: '이메일 이나 비밀번호가 입력되지 않았습니다',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              resultType: { type: 'string', example: 'FAIL' },
              error: {
                type: 'object',
                properties: {
                  errorCode: { type: 'string', example: 'duplicate_email' },
                  reason: { type: 'string', example: '이메일 이나 비밀번호가 입력되지 않았습니다' },
                  data: { type: 'object', example: null }
                
              },
              },
              success: { type: 'object', example: null }
            }
          }
        }
      }
    }
*/
}

export const handlePatchPasswd=async(req,res,next)=>{
  const userId=await userPatchPasswd(req.body)
  res.status(StatusCodes.OK).success(userId)

   /*
    #swagger.tags = ['User']
    #swagger.summary = '비밀번호 변경 성공'
    #swagger.description = '비밀번호 변경을 위한 API입니다. 유저 ID 와 비밀번호를 포함해서 요청해야 합니다. '
    
    #swagger.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              userId: { type: 'int', example:  },
              password: { type: 'string', example: '비밀번호' }
            },
            required: ['userId','password']
          }
        }
      }
    }

    #swagger.responses[200] = {
      description: '로그인 성공',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              resultType: { type: 'string', example: 'SUCCESS' },
              error: { type: 'object', example: null },
              success: {
                type: 'object',
                properties: {
                  userId: { type: 'int', example:  },
                  password: { type: 'string', example: '비밀번호' }
                }
              }
            }
          }
        }
      }
    }


    #swagger.responses[400] = {
      description: '비밀번호가 입력되지 않았습니다',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              resultType: { type: 'string', example: 'FAIL' },
              error: {
                type: 'object',
                properties: {
                  errorCode: { type: 'string', example: 'duplicate_email' },
                  reason: { type: 'string', example: '유저 ID 나 시설정보가 입력되지 않았습니다' },
                  data: { type: 'object', example: null }
                
              },
              },
              success: { type: 'object', example: null }
            }
          }
        }
      }
    }
*/
}

export const handleAutoComplete=async(req,res,next)=>{
  console.log("자동완성 API 를 호출하였습니다.")
  console.log(req.query.station)
  

}