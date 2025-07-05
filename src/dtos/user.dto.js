export const bodyToUser = (body) => {
    return {
        email: body.email,
        password: body.password,
    }
};
export const responseFromUser = ({ user }) => {
    return {
        id: user.id,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    }
};

export const bodyToUserComplete=(body)=>{
    return {
        userId:body.userId,
        facility:body.facility
    }
}
export const responseFromUserComplete=(data)=>{
    console.log("data1",data.facilityId.userId)
    return {
        userId:data.facilityId.userId
    }
}
