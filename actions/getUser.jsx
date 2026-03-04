import { PrismaClient } from "@prisma/client"
export async function getCurrentUser(name,password) {
    try{
        const p=new PrismaClient()
const user= await p.mUser.findUnique({
    where:{
        name:name,
        password:password
    }
})
console.log("hhhhhhhhhhhhhhhhhhhhh ")
if(user){console.log("user issssssssssssssss ",user)}
return "user"
        }
        catch (error){
            console.log("erroe---------------------- ",error)
            return null
        }
    }