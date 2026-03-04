"use server"
import prisma from'../../lib/prismadb'
import { redirect } from 'next/navigation'
export const eventdel=async(eid)=>{
    console.log("statrt deeting")
   await prisma.event.delete({where:{id:eid}}).then(res=>{
    return "1"})
   console.log('deleted')

}

export const placedel=async(eid)=>{
    console.log("statrt deeting")
    const s=await prisma.place.delete({where:{id:eid}}).then(res=>{
        return "1"}).catch(error=>console.log('error in TR i is ',error))
       console.log('deleted')
}

export const userdel=async(eid)=>{
    console.log("statrt deeting")
    const s=await prisma.mUser.delete({where:{id:eid}}).then(res=>{
     
    }).catch(error=>console.log('error in TR i is ',error))
}