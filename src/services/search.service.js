import {
  responseFromFacilitySearch,
  responseFromSearch,
} from "../dtos/search.dto.js";
import { StationNotFoundError } from "../errors.js";
import {
  getStationCode,
  getStationCoordinate,
} from "../repositories/search.repository.js";

export const searchRoute = async (data) => {
  const odsayApiKey = process.env.ODSAY_DATA_API_KEY;
  const startCoordinate = await getStationCoordinate(data.start);
  const endCoordinate = await getStationCoordinate(data.end);
  if (startCoordinate == -1 || endCoordinate == -1) {
    throw new StationNotFoundError("존재하지 않는 역입니다.", data);
  }
  //최적의 경로 검색
  const routeRequestUrl = `https://api.odsay.com/v1/api/searchPubTransPathT?lang=&SX=${startCoordinate.lon}&SY=${startCoordinate.lat}&EX=${endCoordinate.lon}&EY=${endCoordinate.lat}&SearchPathType=1&apiKey=${odsayApiKey}`;
  const routeRequestResponse = await fetch(routeRequestUrl);
  const routeRequestResult = (await routeRequestResponse.json()).result;
  const mapObject = "0:0@" + routeRequestResult.path[0].info.mapObj;

  // 경로 라인을 생성하기 위한 라인 좌표 로드
  const pathRequestUrl = `https://api.odsay.com/v1/api/loadLane?mapObject=${mapObject}&apiKey=${odsayApiKey}`;
  const pathRequestResponse = await fetch(pathRequestUrl);
  const pathRequestResult = (await pathRequestResponse.json()).result;
  const pathCoordinates = pathRequestResult.lane;
  console.log(pathCoordinates);
  return responseFromSearch(pathCoordinates);
};

export const searchFacility = async (data) => {
  const odsayApiKey = process.env.ODSAY_DATA_API_KEY;
  const publicApiKey = process.env.PUBLIC_DATA_API_KEY;
  const startCoordinate = await getStationCoordinate(data.start);
  const endCoordinate = await getStationCoordinate(data.end);
  if (startCoordinate == -1 || endCoordinate == -1) {
    throw new StationNotFoundError("존재하지 않는 역입니다.", data);
  }
  //최적의 경로 검색
  const routeRequestUrl = `https://api.odsay.com/v1/api/searchPubTransPathT?lang=&SX=${startCoordinate.lon}&SY=${startCoordinate.lat}&EX=${endCoordinate.lon}&EY=${endCoordinate.lat}&SearchPathType=1&apiKey=${odsayApiKey}`;
  const routeRequestResponse = await fetch(routeRequestUrl);
  const routeRequestResult = (await routeRequestResponse.json()).result;
  const subPath = routeRequestResult.path[0].subPath;
  const transferStations = [];
  const stationCount = [];
  const stationCodes = [];
  transferStations.push(data.start);
  subPath.forEach((element) => {
    if (element.trafficType == 1) {
      stationCount.push({
        stationCount: element.stationCount,
        line: element.lane[0].name,
      });
      transferStations.push(element.way);
    }
  });
  //   console.log(transferStations);
  for (const element of transferStations) {
    stationCodes.push(await getStationCode(element));
  }
  const stationFacilities = [];
  for (let i = 0; i < stationCodes.length; i++) {
    const stationFacility = {
      station: transferStations[i],
    };
    const code = stationCodes[i];
    if (code != -1) {
      const paddedCode = code.toString().padStart(4, "0");
      //   console.log(paddedCode);
      // 앨리베이터
      const elevatorRequestURL = `https://apis.data.go.kr/B553766/wksn/getWksnElvtr?serviceKey=${publicApiKey}&dataType=JSON&stnCd=${paddedCode}&numOfRows=100`;
      const elevatorRequestResponse = await fetch(elevatorRequestURL);
      const elevatorRequestResult = (await elevatorRequestResponse.json())
        .response;
      const elevatorItems = elevatorRequestResult.body.items.item;
      const elevatorItemConverted = [];
      elevatorItems.forEach((element) => {
        elevatorItemConverted.push({
          name: element.fcltNm,
          available: element.oprtngSitu == "M" || element.oprtngSitu == null,
        });
      });
      stationFacility.elevator = elevatorItemConverted;

      //에스컬레이터
      const escalatorRequestURL = `https://apis.data.go.kr/B553766/wksn/getWksnEsctr?serviceKey=${publicApiKey}&dataType=JSON&pageNo=1&numOfRows=100&stnCd=${paddedCode}`;
      const escalatorRequestResponse = await fetch(escalatorRequestURL);
      const escalatorRequestResult = (await escalatorRequestResponse.json())
        .response;
      const escalatorItems = escalatorRequestResult.body.items.item;
      const escalatorItemConverted = [];
      escalatorItems.forEach((element) => {
        escalatorItemConverted.push({
          name: element.fcltNm,
          available: element.oprtngSitu == "M" || element.oprtngSitu == null,
        });
      });
      stationFacility.escalator = escalatorItemConverted;

      // 휠체어 리프트
      const wheelChairLiftRequestURL = `https://apis.data.go.kr/B553766/wksn/getWksnWhcllift?serviceKey=${publicApiKey}&dataType=JSON&pageNo=1&numOfRows=100&stnCd=${paddedCode}`;
      const wheelChairLiftRequestResponse = await fetch(
        wheelChairLiftRequestURL
      );
      const wheelChairLiftRequestResult = (
        await wheelChairLiftRequestResponse.json()
      ).response;
      const wheelChairLiftItems = wheelChairLiftRequestResult.body.items.item;
      stationFacility.wheelChairLift = wheelChairLiftItems;
      // 무빙 워크
      const movingWalkRequestURL = `https://apis.data.go.kr/B553766/wksn/getWksnMvnwlk?serviceKey=${publicApiKey}&dataType=JSON&stnCd=${paddedCode}&numOfRows=100`;
      const movingWalkRequestResponse = await fetch(movingWalkRequestURL);
      const movingWalkRequestResult = (await movingWalkRequestResponse.json())
        .response;
      const movingWalkItems = movingWalkRequestResult.body.items.item;
      const movingWalkItemConverted = [];
      movingWalkItems.forEach((element) => {
        movingWalkItemConverted.push({
          name: element.fcltNm,
          available: element.oprtngSitu == "M" || element.oprtngSitu == null,
        });
      });
      stationFacility.movingWalk = movingWalkItemConverted;

      const wheelChairChargerRequestURL = `https://apis.data.go.kr/B553766/wksn/getWksnWhclCharge?serviceKey=${publicApiKey}&dataType=JSON&stnCd=${paddedCode}&numOfRows=100`;
      const wheelChairChargerRequestResponse = await fetch(
        wheelChairChargerRequestURL
      );
      // 휠체어 급속 충전기
      const wheelChairChargerRequestResult = (
        await wheelChairChargerRequestResponse.json()
      ).response;
      const wheelChairChargerItems =
        wheelChairChargerRequestResult.body.items.item;

      const wheelChairChargerItemConverted = [];
      wheelChairChargerItems.forEach((element) => {
        wheelChairChargerItemConverted.push({
          name: element.fcltNm,
          available: element.oprtngSitu == "M" || element.oprtngSitu == null,
        });
      });

      stationFacility.wheelChairCharger = wheelChairChargerItemConverted;
      // 수화 영상 전화
      const handVideoPhoneRequestURL = `https://apis.data.go.kr/B553766/wksn/getWksnSlng?serviceKey=${publicApiKey}&dataType=JSON&stnCd=${paddedCode}&numOfRows=100`;
      const handVideoPhoneRequestResponse = await fetch(
        handVideoPhoneRequestURL
      );
      const handVideoPhoneRequestResult = (
        await handVideoPhoneRequestResponse.json()
      ).response;
      const handVideoPhoneItems = handVideoPhoneRequestResult.body.items.item;
      const handVideoPhoneItemConverted = [];
      handVideoPhoneItems.forEach((element) => {
        handVideoPhoneItemConverted.push({
          name: element.fcltNm,
          available: element.oprtngSitu == "M" || element.oprtngSitu == null,
        });
      });
      stationFacility.handVideoPhone = handVideoPhoneItemConverted;
      stationFacilities.push(stationFacility);
    }
  }
  return responseFromFacilitySearch({ stationCount, stationFacilities });
};
