import prisma from '../../../lib/prismadb'
import { NextResponse } from "next/server"
export const POST=async(req)=>{
    console.log("inside invitation post ")
    const {name,eventId,title, orgnization,position,email,whatsapp,categoryId,itype,istate,affirm}=await req.json()
    console.log("inside invitation post ",{name,eventId,title,categoryId, orgnization,position,email,whatsapp,itype,istate,affirm})
    try{
const inv=await prisma.invetation.create({
    data:{name,eventId,title, orgnization,position,email,whatsapp,categoryId,itype,istate,affirm}
})
if(inv){
    console.log("inside inv post inv is ",inv)
    return new NextResponse(JSON.stringify(inv,{status:'200'}))}
return new NextResponse(JSON.stringify({name,eventId,title, orgnization,position,email,whatsapp}))
    }
    catch(error){
      
console.log("error in incitation post "+error)
return new NextResponse(JSON.stringify(error,{status:400}))
    }
}

export const GET =async(req)=>{
    


    const ur=new URL(req.url)
    console.log(ur.searchParams)
    const {searchParams}=new URL(req.url)
    
    const categoryId=searchParams.get('categoryId')
    const whatsapp=searchParams.get('whatsapp')
    const itype=searchParams.get('itype')
    const name=searchParams.get('name')
    console.log("inside invitation get name is     ",searchParams.get('name'))
    const eventId=searchParams.get('eventId')
    const email=searchParams.get('email')
    const affirm=searchParams.get('affirm')
    const chaircategory=searchParams.get('chaircategory')

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
const placeID=searchParams.get('placeId')
    // const {searchParams}=new URL(req.url)
// return new NextResponse(searchParams.get('placeId'))
try{
    const [inv,count]=await prisma.$transaction([ prisma.invetation.findMany({
        take:entriesPerPage,
        skip:entriesPerPage*(page-1),
    // const inv=await prisma.invetation.findMany({
        where:{
            ...(eventId && {eventId:eventId}),
            ...(whatsapp && {whatsapp:whatsapp}),
            ...(itype && {itype:itype}),
            ...(name && {name:name}
            //      
            ),
            ...(categoryId && {categoryId:categoryId}),
            ...(email && {email:email}),
            ...(affirm && {affirm:affirm}),
            ...(chaircategory && {
                chair:{
                    category:{
                        title:chaircategory
                    }
                  }
            }
                
                ),
          
               
                    // ...(chaircategory && {chair.categoryId:chaircategory}),
              
           
        },



        
        
        include:{
            event:{
                include:{
                    place:{
                        include:{
                            chairs:true
                        }
                    }
                }
                
            },
            chair:{
                include:{
                    category:true
                    
                }
            }
           }
    }),prisma.invetation.count(

        {
            where:{
                ...(eventId && {eventId:eventId}),
                ...(whatsapp && {whatsapp:whatsapp}),
                ...(itype && {itype:itype}),
                ...(name && {name:name}
                //      
                ),
                ...(categoryId && {categoryId:categoryId}),
                ...(email && {email:email}),
                ...(affirm && {affirm:affirm}),
                ...(chaircategory && {
                    chair:{
                        category:{
                            title:chaircategory
                        }
                      }
                }
                    
                    ),
              
                   
                        // ...(chaircategory && {chair.categoryId:chaircategory}),
                  
               
            }
        }
    )])
    // console.log(chrs)
    return new NextResponse(JSON.stringify({inv,count},{status:'200'}))
}



   
// try{
//     const inv=await prisma.invetation.findMany({
//        include:{
//         event:{
//             include:{
//                 place:{
//                     include:{
//                         chairs:true
//                     }
//                 }
//             }
            
//         },
//         chair:{
//             include:{
//                 category:true
//             }
//         }
//        }
//     })
//     return new NextResponse(JSON.stringify(inv,{status:'200'}))
//     return new NextResponse(id)
// }
catch(error){
    // return new NextResponse(JSON.stringify(error,{status:400}))
    return null
}



}

export const PUT =async(req)=>{
    console.log("inside  inv put ")
    // const {name,eventId,title, orgnization,position,email,whatsapp,itype,istate,affirm}=await req.json()
    
    
    try{
       
        return new NextResponse("update")
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
         
            const cat= await prisma.invetation.delete({
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