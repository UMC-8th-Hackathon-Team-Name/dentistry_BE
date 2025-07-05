import { prisma } from "../db.config.js";
import crypto from "crypto"
export const createHashedPassword = (passwd) => {
  return crypto.createHash("sha512").update(passwd).digest("hex");
};
export const addUser = async (data) => {
    const user = await prisma.user.findFirst({ where: { email: data.email } });
    if (user) {
        return null;
    }
    else{
        const email=data.email
        const hashPassword=createHashedPassword(data.password)
    const created = await prisma.user.create({ data: {email:email,password:hashPassword} });
    return created.id;
}
    
};
export const getUser = async (userId) => {
    const user = await prisma.user.findFirstOrThrow({ where: { id: userId } });
    return user;
};

export const getFacility= async(data)=>{
    const facilityData=await prisma.user.findFirst({ where: { id:data.userId}}) 
    if (facilityData==null) {
            return null
        }
    else{
        let preferData;
        for(let i=0;i<data.facility.length;i++){
        const eachData=data.facility[i]
        const facilityData=await prisma.facility.findFirst({ where: { name:eachData }})
        if (!facilityData) {
            return null
        }
        preferData=await prisma.preferFacility.create({data:{userId:data.userId,facilityId:facilityData.id}})
        }
    return(preferData)
}
    
}
    
 
    
export const getUserAccount=async(data)=>{  
    const userData=await prisma.user.findUnique({ where: { email:data.email}})
    const hashPasswd=createHashedPassword(data.password)
    if(hashPasswd!=userData.password){
        return null
    }
    else{
        return userData.id
    }
}
export const updateUserPasswd=async(data)=>{
    const userData=await prisma.user.findFirst({ where: { id:data.userId}}) 
    if(userData==null){
        return null
    }
    else{
        const userDataAccount=await prisma.user.findFirst({ where: { password:data.password}})
        if(userDataAccount===data.password){
            return equal
            
        }
        const userId=await prisma.user.update({where:{id:data.userId},data:{password:data.password}})
        return(userId)
    }
    
}