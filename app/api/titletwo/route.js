
import prisma from '../../../lib/prismadb'
import { NextResponse } from "next/server"
export const POST=async(req)=>{

    const{title,lang}=await req.json()
    console.log("inside title2 api",{title,lang})
    try{
    const tt=await prisma.title2.create({
        data:{title,lang}
    })
    if(tt)
return new NextResponse(JSON.stringify(tt,{status:'200'}))
    }
    catch(error){
        console.log("error ",error)
        return new NextResponse(JSON.stringify(tt,{status:'500'}))
    }

}
export const GET=async(req)=>{
    console.log('innnnnnnnnnnn tittttttttttttttttttle')
    try{
        const titles=await prisma.title2.findMany()
    if(titles)return new NextResponse(JSON.stringify(titles,{status:'200'}))
    }
    catch(error){
        console.log('fuckong error isssssssssssssssssssssssssssssss ',error)
          return new NextResponse(JSON.stringify(error,{status:400}))
}
}