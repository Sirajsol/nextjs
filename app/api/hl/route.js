
import prisma from '../../../lib/prismadb'
import { NextResponse } from "next/server"
export const GET =async(req)=>{
    


    const ur=new URL(req.url)
    console.log(ur.searchParams)
    const {searchParams}=new URL(req.url)
    
    const categoryId=searchParams.get('categoryId')
    const whatsapp=searchParams.get('whatsapp')
    const itype=searchParams.get('itype')
    const name=searchParams.get('name')
    console.log("inside hl get name is     ",searchParams.get('name'))
    const eventId=searchParams.get('eventId')
    const email=searchParams.get('email')
    const affirm=searchParams.get('affirm')
    const chaircategory=searchParams.get('chaircategory')
    const Empty=searchParams.get('empty')
    let page=1
    if(searchParams.get('page')){
        page=Number(searchParams.get('page'))
    }
    let entriesPerPage=5
    if(searchParams.get('entriesPerPage')){
        entriesPerPage=Number(searchParams.get('entriesPerPage'))
    }
    // const page=Number(searchParams.get('page'))

    // const entriesPerPage=Number(searchParams.get('entriesPerPage'))
    console.log("page anf entries  is    ",page)
// let{name}=searchPparams.get('name')
 console.log("search  params is    ",eventId)
const placeID=searchParams.get('placeId')
    // const {searchParams}=new URL(req.url)
// return new NextResponse(searchParams.get('placeId'))
try{
    const [chrs,count]=await prisma.$transaction([ prisma.chair.findMany({
        take:entriesPerPage,
        skip:entriesPerPage*(page-1),
        where:{
            ...(eventId &&      {
            invetation:{
            every:{
                // ...(eventId && {eventId:eventId}),
                ...(name && {name:name}),
                // ...(chaircategory && {chaircategory:chaircategory}),
               
            }
        }
        ,
      place:{
       event:{
        some:{
           title:eventId
        }
       }
      }
    }),
       

//             ...(eventId &&      { invetation:{
//           some:  {
//                 eventId:eventId,
               
//             },
            
//         },
       
//      }),
     ...(name && { invetation:{
        some:{
            name:name,
           
        },
        
    },
   
 })
           ,

           
            ...(chaircategory && {catId:chaircategory}),
            ...(Empty &&(Empty=="true")&& {
               
                invetation:
                {
                    //    some:{}  return only chair with invitations
                    //    none:{}  return only chair with no invitations
                    ...(name && {  some:{
                            ...(name && {name:name}),
                        }}),
                       none:{
                     
                       }
                       },
                    
                    
            })
     ,...(Empty &&(Empty=="false") && {
        invetation:{
            //    some:{}  return only chair with invitations
            //    none:{}  return only chair with no invitations
                some:{
                    ...(name && {name:name})
                },
               
               }
    }),
    // ...(Empty &&(Empty=="true") && {
    //     invetation:{
    //         //    some:{}  return only chair with invitations
    //         //    none:{}  return only chair with no invitations
    //             none:{},
               
    //            }
    // })
      }
        
        ,
       
        // orderBy:{invetation:{

        //     // _count:'asc'
        // }},
        include:{
            invetation:{
                where:{
                    ...(eventId && {eventId:eventId}),
                    ...(name && {name:name}),
                    // ...(chaircategory && {chaircategory:chaircategory}),
                   
                },
                include:{
                    chair:{
                        include:{
                            category:true
                        }
                    }
                }
            },
            category:true
        }
    }),  prisma.chair.count()])
    // const chrs=await prisma.chair.findMany({
    //     take:entriesPerPage,
    //     skip:entriesPerPage*(page-1),
    //     where:{
          
    //         ...(chaircategory && {catId:chaircategory}),
    //         ...(Empty &&(Empty=="true") && {
    //             invetation:{
    //                 //    some:{}  return only chair with invitations
    //                 //    none:{}  return only chair with no invitations
    //                     none:{},
                       
    //                    }
    //         })
    //  ,...(Empty &&(Empty=="false") && {
    //     invetation:{
    //         //    some:{}  return only chair with invitations
    //         //    none:{}  return only chair with no invitations
    //             some:{},
               
    //            }
    // }),
    // ...(Empty &&(Empty=="true") && {
    //     invetation:{
    //         //    some:{}  return only chair with invitations
    //         //    none:{}  return only chair with no invitations
    //             none:{},
               
    //            }
    // })
    //   }
        
    //     ,
       
    //     // orderBy:{invetation:{

    //     //     // _count:'asc'
    //     // }},
    //     include:{
    //         invetation:{
    //             where:{
    //                 ...(eventId && {eventId:eventId}),
    //                 ...(name && {name:name}),
    //                 // ...(chaircategory && {chaircategory:chaircategory}),
                   
    //             },
    //             include:{
    //                 chair:{
    //                     include:{
    //                         category:true
    //                     }
    //                 }
    //             }
    //         },
    //         category:true
    //     }
    // })
    // console.log(chrs)
    // return new NextResponse(JSON.stringify(chrs,{status:'200'}))
    console.log("chrs is-----------------------",chrs)
    return new NextResponse(JSON.stringify({chrs,count},{status:'200'}))
}
catch(error){
    console.log("error is :",error)
    return new NextResponse(JSON.stringify(error,{status:400}))
}
}