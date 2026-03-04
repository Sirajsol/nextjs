import prisma from '../../../lib/prismadb'
import { NextResponse } from "next/server"



export const GET=async(req)=>{
    try{
        const pls=await prisma.chairCategory.findMany({})
        if(pls){return new NextResponse(JSON.stringify(pls,{status:'200'}))}
        // return new NextResponse("hi")
    }
    catch(error){
        return new new NextResponse(JSON.stringify(error,{status:'400'}))
    }
}

export const POST=async(req)=>{
    try{
        console.log('inside cat added')
        const body=await req.json()
        const{name:title,currentColor:color,currentTextColor:textColor,imgData:img}=await body
        
            const cat= await prisma.chairCategory.create({
                data:{title,color,textColor,img}
            })
            console.log('cat added',title,color)
            return new NextResponse (JSON.stringify(cat,{status:'200'}))
    }
   catch(error){
    console.log("error occored",error)
   return new NextResponse (JSON.stringify(error,{status:'400'}))

   }
}


export const PUT=async(req)=>{
    const ur=new URL(req.url)
    console.log(ur.searchParams)
    const {searchParams}=new URL(req.url)
    const id=searchParams.get('id')
console.log("category put id is ",id)
    try{
        console.log('inside cat added')
        const body=await req.json()
        const{name:title,currentColor:color,currentTextColor:textColor,imgData:img}=await body
        
            const cat= await prisma.chairCategory.update({
                data:{title,color,textColor,img:img},
                where:{id:id}
            })
            console.log('cat added',title,color)
            return new NextResponse (JSON.stringify(cat,{status:'200'}))
    }
   catch(error){
    console.log("error occored",error)
    return null
   }
}




export const DELETE=async(req)=>{
    const ur=new URL(req.url)
    console.log(ur.searchParams)
    const {searchParams}=new URL(req.url)
    const id=searchParams.get('id')
console.log("category delete id is ",id)
    try{
        console.log('inside cat delete')
         
            const cat= await prisma.chairCategory.delete({
                where:{id:id}
            })
            console.log('cat deleted')
            return new NextResponse (JSON.stringify({},{status:'200'}))
    }
   catch(error){
    console.log("error occored",error)
    return null
   }
}