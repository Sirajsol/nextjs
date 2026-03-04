import { NextResponse } from "next/server"
import prisma from '../../../lib/prismadb'
export const GET=async(req)=>{
    const fr={
        "id":"1",
        "name":"siraj sol"
    }
    try{
      
        const e=await prisma.event.findMany()
        return new NextResponse(JSON.stringify(e,{status:'200'}))
    }
    catch(error){
        return new NextResponse(JSON.stringify(error,{status:'400'}))
    }
   
}