import { StatusCodes } from "http-status-codes";
import { bodyToFacilitySearch, bodyToSearch } from "../dtos/search.dto.js";
import { searchFacility, searchRoute } from "../services/search.service.js";

export const handleRouteSearch = async (req, res, next) => {
  /*
    #swagger.tags = ['Search']
    #swagger.summary = '경로 검색'
    #swagger.description = '경로 검색을 위한 API 입니다. 요청시 경로 라인 좌표를 반환합니다.'
    #swagger.parameters['start'] = {
        in: 'query',
        description: "출발 역 이름",
        required:true,
    }
    #swagger.parameters['end'] = {
        in: 'query',
        description: "도착 역 이름",
        required:true,
    }

    #swagger.responses[200] = {
      description: '경로 검색 성공',
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
                    routes: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                class:{type: 'number', example: 2},
                                type:{type: 'number', example: 4},
                                section:{
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            graphPos: {
                                                type:'array',
                                                items:{
                                                    type: 'object',
                                                    properties:{
                                                        x:{type: 'number', example:126.972709},
                                                        y:{type: 'number', example:37.553512},
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
              }
            }
          }
        }
      }
    }

    #swagger.responses[404] = {
      description: '역을 찾을수 없음',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              resultType: { type: 'string', example: 'FAIL' },
              error: {
                type: 'object',
                properties: {
                  errorCode: { type: 'string', example: 'S001' },
                  reason: { type: 'string', example: '존재하지 않는 역입니다.' },
                  data: { type: 'object', example: {
                    start:'서울역',
                    end:'서숲',
                  } }
                }
              },
              success: { type: 'object', example: null }
            }
          }
        }
      }
    }
*/
  try {
    console.log("경로 검색 요청이 발생했습니다!");
    console.log("body:", req.body);

    const search = await searchRoute(bodyToSearch(req.body, req.query));
    res.status(StatusCodes.OK).success(search);
  } catch (err) {
    return next(err);
  }
};

export const handleFacilitySearch = async (req, res, next) => {
  /*
    #swagger.tags = ['Search']
    #swagger.summary = '시설 검색'
    #swagger.description = '시설 검색을 위한 API 입니다. 각 역의 각종 편의시설의 정보가 반환됩니다.'
    
   #swagger.parameters['start'] = {
        in: 'query',
        description: "출발 역 이름",
        required:true,
    }
    #swagger.parameters['end'] = {
        in: 'query',
        description: "도착 역 이름",
        required:true,
    }

    #swagger.responses[200] = {
      description: '시설 검색 성공',
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
                    line:{
                        type:'array',
                        items: {
                            type:'object',
                            properties: {
                                stationCount:{type:'number', example:4},
                                line:{type:'string', example:"수도권 4호선"},
                            }
                        }
                    },
                    stations: {
                        type:'array',
                        items: {
                            type:'object',
                            properties: {
                                station:{type:'string', example:'서울역'},
                                elevator:{
                                    type:'array',
                                    items: {
                                        type:'object',
                                        properties: {
                                            name:{type:'string',example:'승강기)엘리베이터-서울(1)역 2번 출구측 외부#1'},
                                            available:{type:'boolean', example:true},
                                        }
                                    }
                                },
                                escalator:{
                                    type:'array',
                                    items: {
                                        type:'object',
                                        properties: {
                                            name:{type:'string',example:'승강기)에스컬레이터-서울역(1) 4호선연결통로 1호기'},
                                            available:{type:'boolean', example:true},
                                        }
                                    }
                                },
                                wheelChairLift:{
                                    type:'array',
                                    items: {
                                        type:'object',
                                        properties: {
                                            name:{type:'string',example:'휠체어 리프트'},
                                            available:{type:'boolean', example:true},
                                        }
                                    }
                                },
                                movingWalk:{
                                    type:'array',
                                    items: {
                                        type:'object',
                                        properties: {
                                            name:{type:'string',example:'무빙 워크'},
                                            available:{type:'boolean', example:true},
                                        }
                                    }
                                },
                                wheelChairCharger:{
                                    type:'array',
                                    items: {
                                        type:'object',
                                        properties: {
                                            name:{type:'string',example:'전동휠체어 충전설비'},
                                            available:{type:'boolean', example:true},
                                        }
                                    }
                                },
                                handVideoPhone:{
                                    type:'array',
                                    items: {
                                        type:'object',
                                        properties: {
                                            name:{type:'string',example:'수어영상전화기'},
                                            available:{type:'boolean', example:true},
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
              }
            }
          }
        }
      }
    }

     #swagger.responses[404] = {
      description: '역을 찾을수 없음',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              resultType: { type: 'string', example: 'FAIL' },
              error: {
                type: 'object',
                properties: {
                  errorCode: { type: 'string', example: 'S001' },
                  reason: { type: 'string', example: '존재하지 않는 역입니다.' },
                  data: { type: 'object', example: {
                    start:'서울역',
                    end:'서숲',
                  } }
                }
              },
              success: { type: 'object', example: null }
            }
          }
        }
      }
    }
*/
  try {
    console.log("시설 검색 요청이 발생했습니다!");
    console.log("body:", req.body);

    const search = await searchFacility(
      bodyToFacilitySearch(req.body, req.query)
    );
    res.status(StatusCodes.OK).success(search);
  } catch (err) {
    return next(err);
  }
};
