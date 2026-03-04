import { error } from 'console'
import prisma from '../../../../lib/prismadb'
import { NextResponse } from "next/server"
export const GET =async(req,{params})=>{
    const {id}=params
   
try{
    const inv=await prisma.event.findUnique({
        where:{id:id}
    })
    if(!inv)throw error
    return new NextResponse(JSON.stringify(inv,{status:'200'}))
    // return new NextResponse(id)
}
catch(error){
    // return error
    new NextResponse(JSON.stringify(inv,{status:'404'}))
}


}

export const PUT =async(req,{params})=>{
    console.log("inside  event put ")
    // const {id}=params
    const{title,placeId,date,description,time,enMessage,arMessage,img}=await req.json()
    const {id}=params
    console.log("inside  event put id is ",id)
    try{
        const d=await prisma.event.update({
            // data: {title,placeId,date,description,time,enMessage,arMessage,img},
            where:{id:id}
        })
        console.log("vefore return ",d)
        return new NextResponse(JSON.stringify(d,{status:'200'}))
    }
    catch(error){
        console.log("errro in inv put ",error)
        return new null
    }
    // return new NextResponse(id)
}


// export const DELETE =async(req,{params})=>{
//     console.log("inside  event put ")

//     const {id}=params
//     console.log("inside  event delete id is ",id)
//     try{
//         const d=await prisma.event.delete({
            
//             where :{id  :id},
//         })
//         console.log("before return ",d)
//         return new NextResponse(JSON.stringify(d,{status:'200'}))
//     }
//     catch(error){
//         console.log("errro in inv delete ",error)
//         return new null
//     }
//     // return new NextResponse(id)
// }

export const DELETE =async(req,{params})=>{
    console.log("inside  event put ")
    // const {id}=params
    const{title,placeId,date,description,time,enMessage,arMessage,img}=await req.json()
    const {id}=params
    console.log("inside  event put id is ",id)
    try{
        const d=await prisma.event.delete({
            // data: {title,placeId,date,description,time,enMessage,arMessage,img},
            where:{id:id}
        })
        console.log("vefore return ",d)
        return new NextResponse(JSON.stringify(d,{status:'200'}))
    }
    catch(error){
        console.log("errro in inv put ",error)
        return new null
    }
    // return new NextResponse(id)
}
