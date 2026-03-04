
import { NextResponse } from "next/server"
import prisma from '../../../lib/prismadb'
import { error } from "console"
export  const GET=async(req)=>{
    console.log('find many events')
// const title=await req.json()
// console.log('totle ',title)
    const ur=new URL(req.url)
    console.log(ur.searchParams)
    const {searchParams}=new URL(req.url)
    let page=1
    if(searchParams.get('page')){
        page=Number(searchParams.get('page'))
    }
    let entriesPerPage=5
    if(searchParams.get('entriesPerPage')){
        entriesPerPage=Number(searchParams.get('entriesPerPage'))
    }

    try{ 
        // const prisma=new PrismaClient()
        const [events,count]=await prisma.$transaction([prisma.event.findMany({
            take:entriesPerPage,
            skip:entriesPerPage*(page-1),
            where:{
                // ...(title&&{title:title})
            },
            include:{
                place:true,
                invetations:true
            }
        }),prisma.event.count()])
        // const events=await prisma.event.findMany({
        //     include:{
        //         place:true,
        //         invetations:true
        //     }
        // })
        console.log("inside event api get ,events is",events)
        if(events&& count)
    return new NextResponse(JSON.stringify({events,count},{status:'200'}))
    throw error
    }
    catch(error){
        console.log("error in event api get mrthod  is",error)
    //    return  new NextResponse(JSON.stringify(error,{status:400}))
   
} 
}

export const POST=async(req)=>{
    // const {name:title,selectedPlace:placeId,selectedDate:date,timeTerm:time,description}=await req.json()
    const{title,placeId,date,description,time,enMessage,arMessage,img}=await req.json()
    console.log("from event api ",{title,placeId,date,description,time,arMessage,enMessage,img})
    try{
        const ev=await prisma.event.create({
            data:{title,placeId,date,description,time,arMessage,enMessage,img}

        })
        // const ev= await prisma.place.create({
        //     data:{name :"معر",enName:"sho",seatPlan:"",img:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwg"}

        // })
           
            return new NextResponse(JSON.stringify(ev,{status:'200'}))
    }
    catch(error){
        console.log("error in add event api ",error)
        return new NextResponse(JSON.stringify(error,{status:400}))
    }
}

