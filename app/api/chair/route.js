import { NextResponse } from "next/server"
import prisma from '../../../lib/prismadb'

export const GET=async(req)=>{
   
    const ur=new URL(req.url)
    console.log(ur.searchParams)
    const {searchParams}=new URL(req.url)
// let{name}=searchPparams.get('name')
 console.log("search  params is    ",searchParams.get('placeId'))
const placeID=searchParams.get('placeId')
const title=searchParams.get('title')
const Empty=searchParams.get('empty')
//some

let page=1
if(searchParams.get('page')){
    page=Number(searchParams.get('page'))
}
let entriesPerPage=5
if(searchParams.get('entriesPerPage')){
    entriesPerPage=Number(searchParams.get('entriesPerPage'))
}
    // const {searchParams}=new URL(req.url)
// return new NextResponse(searchParams.get('placeId'))
try{

    const [chrs,count]=await prisma.$transaction([ prisma.chair.findMany({
        take:entriesPerPage,
        skip:entriesPerPage*(page-1),
        where:{
            ...(placeID && {placeId:placeID}),
            ...(Empty && {
                invetation:{
                    //    some:{}  return only chair with invitations
                    //    none:{}  return only chair with no invitations
                        none:{},
                       
                       }
            }),
     ...(title && {title:title})
      }
        
        ,
       
        // orderBy:{invetation:{

        //      _count:'asc'
        // }},
        include:{category:true,
            invetation:true
        }
    }),prisma.chair.count({
        where:{
            ...(placeID && {placeId:placeID}),
            ...(Empty && {
                invetation:{
                    //    some:{}  return only chair with invitations
                    //    none:{}  return only chair with no invitations
                        none:{},
                       
                       }
            }),
     ...(title && {title:title})
      }
    })])

    // const chrs=await prisma.chair.findMany({
    //     where:{
    //         ...(placeID && {placeId:placeID}),
    //         ...(Empty && {
    //             invetation:{
    //                 //    some:{}  return only chair with invitations
    //                 //    none:{}  return only chair with no invitations
    //                     none:{},
                       
    //                    }
    //         }),
     
    //   }
        
    //     ,
       
    //     // orderBy:{invetation:{

    //     //      _count:'asc'
    //     // }},
    //     include:{category:true,
    //         invetation:true
    //     }
    // })
    // console.log(chrs)
    return new NextResponse(JSON.stringify({chrs,count},{status:'200'}))
}
catch(error){
    console.log("error is :",error)
    return new NextResponse(null)
}
}

export const POST=async(req)=>{
    console.log("inside chair api")
    try{ const da=await req.json()
        const chrs=await prisma.chair.createMany({
            data:[...da]
        })

        console.log("inside chair post api ",da)
    return new NextResponse(JSON.stringify(chrs,{status:'200'}))}
        catch(error){
            console.log("error ",error)
            return new NextResponse(JSON.stringify(error,{status:400}))
        }
   
}

export const DELETE=async(req)=>{
    const ur=new URL(req.url)
    console.log(ur.searchParams)
    const {searchParams}=new URL(req.url)
    const id=searchParams.get('id')
    console.log("inside chair api ",id)
    try{ 
        const chr=await prisma.chair.delete({
           where:{
            id:id
           }
        })

        console.log("delete chair post api ")
    return new NextResponse(JSON.stringify(chr,{status:'200'}))}
        catch(error){
            console.log("error in chair delete ",error)
            return new NextResponse(JSON.stringify(error,{status:400}))
        }
   
}