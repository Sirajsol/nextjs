import prisma from '../../../../lib/prismadb'
import { NextResponse } from "next/server"
export const PUT =async(req,{params})=>{
    console.log("inside  inv put ")
    // const {name,eventId,title,orgnization,position,email,whatsapp,category,istate}=await req.json()
    const data=await req.json()
    const {id}=params
    console.log("id  inv put ",id)
    try{
        const d=await prisma.title1.update({
            // data: {name,eventId,title,orgnization,position,email,whatsapp,category,istate},
            data:data,
            where:{id:id}
        })
        return new NextResponse(JSON.stringify(d,{status:'200'}))
    }
    catch(error){
        console.log("errro in inv put ",error)
        return  new NextResponse(JSON.stringify(error,{status:400}))
    }
}


export const DELETE=async(req,{params})=>{
    console.log("imside titleone dellete")
    
    const {id}=params
    console.log("id titleone dellete",id)
        try{
            const t=await prisma.title1.delete({
                where:{
                    id:id
                }
            })
            return new NextResponse(JSON.stringify(t,{status:'200'}))
        }
        catch(error){
            console.log(error)
            return new NextResponse(JSON.stringify(error,{status:'500'}))
        }
    }