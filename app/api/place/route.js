
import prisma from '../../../lib/prismadb'
import { NextResponse } from "next/server"

export const GET=async(req)=>{
    try{
        const plss=await prisma.place.findMany({
            include:{
                event:true
            }
        })
        if(plss){
            console.log("inside place api plass is ",plss)
            return new NextResponse(JSON.stringify({plss}),{status:'200'})}
          
            // return new NextResponse(JSON.stringify(plss),{status:'200'})} does it work without {} surrounding plass??
        // return new NextResponse("hi")
    }
    catch(error){
        console.log("inside place api plass not fuckin found "+error)
        return new NextResponse(JSON.stringify(error,{status:400}))
        // return new NextResponse(null)
    }
}

export const POST=async(req)=>{
    const{name,enName,seatPlan,imgData:img}=await req.json()
    console.log("inside aaaplace api",{name,enName,seatPlan,img})
    try{
const placce= await prisma.place.create({
    data:{name,enName,seatPlan,img}
    
})
// const placce=prisma.place.create({
//     data:{name :"معر",enName:"sho",seatPlan:"",img:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwg"}

// })
if(placce){
    console.log("place------------------------------------------")
    return new NextResponse(JSON.stringify(placce,{status:'200'}))

}
    }
catch(error){
    console.log("error addplace api",error)
    return new NextResponse(JSON.stringify(error,{status:400}))
}
}

export const DELETE=async(req)=>{
    const ur=new URL(req.url)
    console.log(ur.searchParams)
    const {searchParams}=new URL(req.url)
    const id=searchParams.get('id')
console.log("place delete id is ",id)
    try{
        console.log('inside cat delete')
         
            const cat= await prisma.place.delete({
                where:{id:id}
            })
            console.log('invitation deleted')
            return new NextResponse (JSON.stringify({},{status:'200'}))
    }
   catch(error){
    console.log("error occored",error)
    return new NextResponse(JSON.stringify(error,{status:400}))
   }
}

export const PUT =async(req)=>{
    console.log("inside  inv put ")
    // const {name,eventId,title,orgnization,position,email,whatsapp,category,istate}=await req.json()
    const data=await req.json()
    const ur=new URL(req.url)
    console.log(ur.searchParams)
    const {searchParams}=new URL(req.url)
    const id=searchParams.get('id')
    
    try{
        const d=await prisma.place.update({
            // data: {name,eventId,title,orgnization,position,email,whatsapp,category,istate},
            data:data,
            where:{id:id}
        })
        return new NextResponse(JSON.stringify(d,{status:'200'}))
    }
    catch(error){
        console.log("errro in place put ",error)
        return  new NextResponse(JSON.stringify(error,{status:400}))
    }
}