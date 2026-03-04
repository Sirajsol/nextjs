
import prisma from '../../../lib/prismadb'
import { NextResponse } from "next/server"
export const POST=async(req)=>{

    const{title,lang}=await req.json()
    console.log("inside title2 api",{title,lang})
    try{
    const tt=await prisma.title1.create({
        data:{title,lang}
    })
return new NextResponse(JSON.stringify(tt,{status:'200'}))
    }
    catch(error){
        console.log("error ",error)
        return new NextResponse(JSON.stringify(error,{status:400}))
    }

}
export const GET=async(req)=>{
    try{
        const titles=await prisma.title1.findMany()
    return new NextResponse(JSON.stringify(titles,{status:'200'}))
    }
    catch(error){
        console.log("error ",error)
        return new new NextResponse(JSON.stringify(error,{status:400}))
    }
}