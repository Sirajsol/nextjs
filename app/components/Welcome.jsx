"use client"
import { useRouter } from "next/navigation";
import Load from "./load";
import Link from "next/link"
import EventCard from "./eventcard/EventCard";
import { useState,useEffect } from "react";
import { useCntxt } from "../context/context";
const Welcome = () => {
    const router=useRouter()
    // const{wait,setWait}=useCntxt()

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
        


    return <div className=" flex w-screen h-full absolute z-40">

        <div className='flex flex-row w-[90%] top-[15%]  flex-wrap absolute justify-center ml-[10%]  h-full overflow-auto border-none outline-none bg-transparent'>
            {evts&&evts.length>0&&evts.map(d=>{
            return <Link href={`/all-events/${d.id}`} key={d.id}
            onClick={()=>{setWt(true)}}
            >
            <EventCard ev={d} />
            </Link>
            
         
        }
       
        )
        }
        </div>
        <div className=" flex w-screen h-screen bg-black opacity-70 "></div>
        <div className="flex  flex-col justify-evenly absolute top-[30%] left-[30%] w-[40%]">
           <h1 className="flex h-[40px]   text-white justify-center my-[20px]">أهلا بك</h1>
            <h1 className="flex  h-[40px] text-white justify-center text-center my-[20px]"> تسرنا زيارتك, نتمنى ان تتعرف من خلالنا على الأحداث التي قد تهمك</h1>
            
            <div className=" flex  h-[40px] justify-center items-center my-[60px]">
                <button 
                onClick={()=>{

                    router.push('/all-events')
                setWait(true)
                }}
                className="flex bg-orange-600 justify-center items-center text-white w-[120px] h-[40px] rounded-md shadow-md shadow-white">
                    اكتشف اكثر
                </button>
            </div>

        </div>
        

         {wait&& <Load/>} 
      
        
    </div>
}
 
export default Welcome;