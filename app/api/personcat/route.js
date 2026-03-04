import prisma from '../../../lib/prismadb'
import { NextResponse } from "next/server"
export const POST=async(req)=>{
    try{
        console.log('inside cat added')
        const body=await req.json()
        const{name:title,currentColor:color}=await body
        
            const cat=await prisma.personCat.create({
                data:{title,color}
            })
            console.log('person cat added',title,color)
            return new NextResponse (JSON.stringify(cat,{status:'200'}))
    }
   catch(error){
    console.log("error occored",error)
    return new NextResponse(JSON.stringify(error,{status:400}))
   }
}

export const GET=async(req)=>{
    try{
        const titles=await prisma.personCat.findMany()
    return new NextResponse(JSON.stringify(titles,{status:'200'}))
    }
    catch(error){
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
        const d=await prisma.personCat.update({
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