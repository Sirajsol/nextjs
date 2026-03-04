"use client"
import React, { useEffect, useState } from 'react'
import EventCard from './eventcard/EventCard'
 import Link from "next/link"
 import { useCntxt } from '../context/context'
import Container from './Contaner'
import Load from './load'
// export const BASE_API_URL=process.env.NEXT_PUBLIC_BASE_API_URL
const AllC=()=> {
    const [wt,setWt]=useState(false)
  
const {wait,setWait}=useCntxt()
useEffect(()=>{

    setWait(true)
},[])
    
       
    const[evts,setEvts]=useState([])
    const getm=async()=>{
        try{ const e= await fetch(`/api/event`)
    //     .then(res=> res.json()).then((ee)=>{setEvts(ee)})
    //    if(e) console.log(e)
        const ee=await e.json()
        console.log("see it now ",e.status)
        console.log(ee)
        if(ee && ee.length>0){setEvts(ee.events)}
        setEvts(ee.events)
        setWait(false)
        console.log('no error yet !!')
    }

        catch(error){
            console.log('what the fuck!!!',error)
        }
        setWait(false)
        setWt(false)
    }
    useEffect(()=>{
       
        getm()
    },[])
    
  return (
    <Container>
   <div className='flex w-[90%] left-[5%] flex-wrap  justify-center ml-[10%]  h-full overflow-scroll border-none outline-none bg-transparent'>
   {/* {(wt||wait)&&(<div className="flex  justify-center items-center absolute top-[150px] bg-blue-900 w-[400px] h-[80px] left-[600px] text-white
    text-[30px] px-[40px] shadow-black shadow-md rounded z-10">الرجاء الإنتظار</div>)}  */}
    {(wt||wait)&&( <Load/> )}
         {evts&&evts.length>0&&evts.map(d=>{
            return <Link href={`/all-events/${d.id}`} key={d.id}
            onClick={()=>{setWt(true)}}
            >
            <EventCard ev={d} />
            </Link>
            
         
        }
       
        )
        }
        {!wt&&!wait&&!evts&&(<div className='flex text-[10px] w-[60%] left-[20%] bg-blue-900 h-[80px]
         rounded-[15px] text-center
          text-blue-300 justify-center items-center sm:text-[25px] shadow-black shadow-lg '>ممممم يبدو انا هنالك مشكلة بالاتصال</div>)}
  {/* {evts[0].title} */}

</div>

 </Container>
)  
    }

  


export default AllC;
