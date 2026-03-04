import prisma from '../../../lib/prismadb'
import { NextResponse } from "next/server"

export const GET =async(req)=>{

    


    const ur=new URL(req.url)
    console.log(ur.searchParams)
    const {searchParams}=new URL(req.url)
    
    const name=searchParams.get('name')
    console.log("inside users  name is     ",searchParams.get('name'))
   

    let page=1
    if(searchParams.get('page')){
        page=Number(searchParams.get('page'))
    }
    let entriesPerPage=5
    if(searchParams.get('entriesPerPage')){
        entriesPerPage=Number(searchParams.get('entriesPerPage'))
    }
   
// let{name}=searchPparams.get('name')
 console.log("search  params is    ",searchParams.get('placeId'))

    // const {searchParams}=new URL(req.url)
// return new NextResponse(searchParams.get('placeId'))
try{
    const [uss,count]=await prisma.$transaction([ prisma.mUser.findMany({
        take:entriesPerPage,
        skip:entriesPerPage*(page-1),
    // const inv=await prisma.invetation.findMany({
        where:{
        
            ...(name && {name:name}
            //      
            ),
           
           
        },



        
        
       
    }),prisma.mUser.count(

        {
            where:{
               
                ...(name && {name:name}
                //      
                ),
               
                }
           
                   
              
                   
                        // ...(chaircategory && {chair.categoryId:chaircategory}),
                  
               
            
        }
    )])
    // console.log(chrs)
    return new NextResponse(JSON.stringify({uss,count},{status:'200'}))
}



   

catch(error){
    console.log("error in users is  ",error)
    return new NextResponse(JSON.stringify(error,{status:400}))
}



}

export const PUT =async(req)=>{
    const ur=new URL(req.url)
    console.log(ur.searchParams)
    const {searchParams}=new URL(req.url)
    
    const id=searchParams.get('id')

    console.log("inside  users put ")
    // const {name,eventId,title,orgnization,position,email,whatsapp,category,istate}=await req.json()
    const data=await req.json()
    
    
    try{
        const d=await prisma.mUser.update({
            // data: {name,eventId,title,orgnization,position,email,whatsapp,category,istate},
            data:data,
            where:{id:id}
        })
        console.log("d is ",d)
        return new NextResponse(JSON.stringify(d,{status:'200'}))
    }
    catch(error){
        console.log("errro in inv put ",error)
        return new new NextResponse(JSON.stringify(error,{status:400}))
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
         
            const cat= await prisma.mUser.delete({
                where:{id:id}
            })
            console.log('user deleted')
            return new NextResponse (JSON.stringify({},{status:'200'}))
    }
   catch(error){
    console.log("error occored",error)
    return new NextResponse(JSON.stringify(error,{status:400}))
   }
}