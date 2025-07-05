import { responseFromUser,responseFromUserComplete } from "../dtos/user.dto.js";;
import {
    addUser,
    getUser,
    getFacility,
    getUserAccount,updateUserPasswd
} from "../repositories/user.repository.js";
import { DuplicateUserEmailError,NoUserEmailOrPasswd,NoUserIdOrFacility,NoUser,EncorrectPassward,NoUserIdOrPasswd } from "../errors.js";

export const userSignUp = async (data) => {
    console.log(data.email,data.password)
    if(data.email==null || data.password==null){
        throw new NoUserEmailOrPasswd("비밀번호나 이메일이 입력되지 않았습니다.",data)
    }

    const UserId = await addUser({
        email: data.email,
        password: data.password,
    });

    if (UserId === null) {
        throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
    }

    const user = await getUser(UserId);
    return responseFromUser(
        {
            user
        });
};

export const userSignUpComplete=async(data)=>{
    if(data.userId==null || data.facility==null){
        throw new NoUserIdOrFacility("유저 ID 나 시설 정보가 입력되지 않았습니다",data)
    }
    const facilityId=await getFacility(data)

    if(facilityId==null){
        throw new NoUser("해당 유저 정보가 없습니다",data)
    }
    else{return responseFromUserComplete({facilityId})}
}

export const userLogin=async(data)=>{
    console.log("data2",data)
    if(data.email==null || data.password==null){
        throw new NoUserEmailOrPasswd("비밀번호나 이메일이 입력되지 않았습니다.",data)
    }
    const userAccount=await getUserAccount(data)
    if(userAccount==null){
        throw new EncorrectPassward("비밀번호가 틀립니다",data)
    }
    return userAccount
}

export const userPatchPasswd=async(data)=>{
    console.log(data)
    if(data.userId==null || data.password==null){
        throw new NoUserIdOrPasswd("비밀번호가 입력되지 않았습니다.",data)
    }
    const userId=await updateUserPasswd(data)
    if(userId==null){
        throw new NoUser("해당 유저 정보가 없습니다 ",data)
    }
    else{
        return userId
    }
}