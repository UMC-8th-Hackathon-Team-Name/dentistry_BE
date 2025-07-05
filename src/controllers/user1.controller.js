import { StatusCodes } from "http-status-codes";
import {bodyToUserEdit, bodyToUserId } from "../dtos/user1.dto.js";
import { userDeleteProfile, userEdit, userProfile, userRecentSearch, UserDeleteSearch } from "../services/user1.service.js";

// 프로필 정보 수정
export const handleUserEditProfile = async (req, res, next) => {
  /*
   #swagger.tags = ['User']
   #swagger.summary = '프로필 정보 수정'
   #swagger.description = '프로필 정보 수정을 위한 API입니다. 사용자 ID와 수정할 카테고리 ID 배열을 포함해 요청해야 합니다.'
   
   #swagger.requestBody = {
     required: true,
     content: {
       'application/json': {
         schema: {
           type: 'object',
           properties: {
             id: { type: 'number', example: 1 },
             facility: { type: 'array', example: [1, 2, 3] },
           },
         }
       }
     }
   }
   #swagger.responses[200] = {
     description: '프로필 수정 성공',
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
                 user: { type: 'object', example: { id: 1, categoryIds: [1, 2, 3] } },
               }
             }
           }
         }
       }
     }
   }
   #swagger.responses[400] = {
     description: '잘못된 요청',
     content: {
       'application/json': {
         schema: {
           type: 'object',
           properties: {
             resultType: { type: 'string', example: 'FAIL' },
             error: {
               type: 'object',
               example: {
                 errorCode: 'invalid_request',
                 reason: '요청 형식이 잘못되었습니다.'
               }
             },
             success: { type: 'null' }
           }
         }
       }
     }
   }
  */
  try {
    console.log("프로필 수정을 요청했습니다!");
    console.log("body:", req.body);

    const user = await userEdit(bodyToUserEdit(req.body));
    res.status(StatusCodes.OK).success(user);
  } catch (err) {
    return next(err);
  }
};

// 내 프로필 조회
export const handleUserProfile = async (req, res, next) => {
  /*
   #swagger.tags = ['User']
   #swagger.summary = '내 프로필 조회'
   #swagger.description = '내 프로필 정보를 조회하기 위한 API입니다.'
    #swagger.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              userId: { type: 'int', example: 1 },
              password: { type: 'string', example: '비밀번호' }
            },
            required: ['userId','password']
          }
        }
      }
    }
   
   #swagger.responses[200] = {
     description: '프로필 조회 성공',
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
                 user: { 
                   type: 'object', 
                   properties: {
                     id: { type: 'number', example: 1 },
                     email: { type: 'string', example: 'user@example.com' },
                     password: { type: 'string', example: 'hashed_password' },
                     createdAt: { type: 'string', example: '2023-10-01T00:00:00Z' },
                     updatedAt: { type: 'string', example: '2023-10-01T00:00:00Z' }
                   }
                 },
                 PreferFacilities: {
                   type: 'array',
                   items: {
                     type: 'object',
                     properties: {
                       id: { type: 'number', example: 1 },
                       facilityId: { type: 'number', example: 1 },
                       facility: { 
                         type: 'object',
                         properties: {
                           id: { type: 'number', example: 1 },
                           name: { type: 'string', example: '시설 이름' },
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
   #swagger.responses[400] = {
     description: '잘못된 요청',
     content: {
       'application/json': {
         schema: {
           type: 'object',
           properties: {
             resultType: { type: 'string', example: 'FAIL' },
             error: {
               type: 'object',
               example: {
                 errorCode: 'invalid_request',
                 reason: '요청 형식이 잘못되었습니다.'
               }
             },
             success: { type: 'null' }
           }
         }
       }
     }
   }
  */
  try {
    console.log("내 프로필 조회를 요청했습니다!");
    const user = await userProfile(bodyToUserId(req.body));
    res.status(StatusCodes.OK).success(user);
  } catch (err) {
    return next(err);
  }
};

export const handleUserDeleteProfile = async (req, res, next) => {

    /*
     #swagger.tags = ['User']
     #swagger.summary = '내 프로필 삭제'
     #swagger.description = '내 프로필을 삭제하기 위한 API입니다.'
    
     #swagger.requestBody = {
         required: true,
         content: {
         'application/json': {
             schema: {
             type: 'object',
             properties: {
                 id: { type: 'number', example: 1 },
             },
             }
         }
         }
     }
     #swagger.responses[200] = {
         description: '프로필 삭제 성공',
         content: {
         'application/json': {
             schema: {
             type: 'object',
             properties: {
                 resultType: { type: 'string', example: 'SUCCESS' },
                 error: { type: 'object', example: null },
                 success: { type: 'null' }
             }
             }
         }
         }
     }
     #swagger.responses[400] = {
         description: '잘못된 요청',
         content: {
         'application/json': {
             schema: {
             type: 'object',
             properties: {
                 resultType: { type: 'string', example: 'FAIL' },
                 error: {
                 type: 'object',
                 example: {
                     errorCode: 'invalid_request',
                     reason: '요청 형식이 잘못되었습니다.'
                 }
                 },
                 success: { type: 'null' }
             }
             }
         }
         }
     }
    */
     try {
        console.log("내 프로필 삭제를 요청했습니다!");
        const user = await userDeleteProfile(bodyToUserId(req.body));
        res.status(StatusCodes.OK).success(user);
      } catch (err) {
        return next(err);
      }
};

// 최근 검색 기록 조회
export const handleRecentSearch = async (req, res, next) => {
    /*
     #swagger.tags = ['User']
     #swagger.summary = '최근 검색 기록 조회'
     #swagger.description = '사용자의 최근 검색 기록을 조회하기 위한 API입니다.'
    
     #swagger.requestBody = {
         required: true,
         content: {
         'application/json': {
             schema: {
             type: 'object',
             properties: {
                 id: { type: 'number', example: 1 },
             },
             }
         }
         }
     }
     #swagger.responses[200] = {
  description: '최근 검색 기록 조회 성공',
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
              user: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number', example: 1 },
                    searchId: { type: 'number', example: 1 },
                    stationId: { type: 'number', example: 1 },
                    station: {
                      type: 'object',
                      properties: {
                        id: { type: 'number', example: 1 },
                        name: { type: 'string', example: 'name1' },
                        latitude: { type: 'number', example: 0 },
                        longitude: { type: 'number', example: 0 }
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

     #swagger.responses[400] = {
         description: '잘못된 요청',
         content: {
         'application/json': {
             schema: {
             type: 'object',
             properties: {
                 resultType: { type: 'string', example: 'FAIL' },
                 error: {
                 type: 'object',
                 example: {
                     errorCode: 'invalid_request',
                     reason: '요청 형식이 잘못되었습니다.'
                 }
                 },
                 success: { type: 'null' }
             }
             }
         }
         }
     }
    */
    try {
        console.log("최근 검색 기록 조회를 요청했습니다!");
        const user = await userRecentSearch(bodyToUserId(req.body));
        res.status(StatusCodes.OK).success(user);
    } catch (err) {
        return next(err);
    }
};

export const handleDeleteRecentSearch = async (req, res, next) => {
    /*
     #swagger.tags = ['User']
     #swagger.summary = '최근 검색 기록 삭제'
     #swagger.description = '사용자의 최근 검색 기록을 삭제하기 위한 API입니다.'
    
     #swagger.requestBody = {
         required: true,
         content: {
         'application/json': {
             schema: {
             type: 'object',
             properties: {
                 id: { type: 'number', example: 1 },
             },
             }
         }
         }
     }
     #swagger.responses[200] = {
         description: '최근 검색 기록 삭제 성공',
         content: {
         'application/json': {
             schema: {
             type: 'object',
             properties: {
                 resultType: { type: 'string', example: 'SUCCESS' },
                 error: { type: 'object', example: null },
                 success: { type: 'null' }
             }
             }
         }
         }
     }
     #swagger.responses[400] = {
         description: '잘못된 요청',
         content: {
         'application/json': {
             schema: {
             type: 'object',
             properties: {
                 resultType: { type: 'string', example: 'FAIL' },
                 error: {
                 type: 'object',
                 example: {
                     errorCode: 'invalid_request',
                     reason: '요청 형식이 잘못되었습니다.'
                 }
                 },
                 success: { type: 'null' }
             }
             }
         }
         }
     }
    */
    try {
        console.log("최근 검색 기록 삭제를 요청했습니다!");
        const search = await UserDeleteSearch(bodyToUserId(req.body));
        res.status(StatusCodes.OK).success(search);
    } catch (err) {
        return next(err);
    }
};
