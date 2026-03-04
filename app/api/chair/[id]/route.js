import prisma from '../../../../lib/prismadb'
import { NextResponse } from "next/server"

export const PUT=async(req,{params})=>{
const{selectedCategory,title}=await req.json()
console.log({selectedCategory,title})
const{id}=params

console.log("id is ",id)
try{
    const pr=await prisma.chair.findFirst({
        where:{
            title:title,
          NOT:{
            id:id
          }
        }
    })
    if(!pr){
        const chr= await prisma.chair.update({
            data:{catId:selectedCategory,
            title:title
            
            },
            where:{id:id}
        }
            
        )
        if(chr)return new NextResponse(JSON.stringify(chr,{status:'200'}))
    }
  
    
     return new NextResponse(JSON.stringify({status:'500'}))
}
catch(error){
console.log("chair update error :",error)
return new NextResponse(JSON.stringify(error,{status:'500'}))
}
}