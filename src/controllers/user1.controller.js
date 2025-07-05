import { StatusCodes } from "http-status-codes";
import { bodyToUserEdit } from "../dtos/user1.dto.js";
import { userEdit } from "../services/user1.service.js";

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
              categoryIds: { type: 'array', example: [1, 2, 3] },
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
                error: { type: 'object', example: { errorCode: 'invalid_request', reason: '요청 형식이 잘못되었습니다.' } },
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