"use client"
import Image from 'next/image';
import Style from './page.module.css'
import { useEffect, useState } from 'react';
import { useCntxt } from '@/app/context/context';
const EventCard = ({ev}) => {
const [wt,setWt]=useState(false)
const {wait,setWait}=useCntxt()
useEffect(()=>{

    setWait(false)
},[])
    return <div className={Style.mainContainer}
    // onClick={()=>{setWt(true)}}
    >
       {/* {(wt||wait)&&(<div className="flex  justify-center items-center absolute top-[150px] bg-blue-900 w-[400px] h-[80px] left-[200px] text-white
    text-[30px] px-[40px] shadow-black shadow-md rounded z-10">الرجاء الإنتظار</div>)}  */}
        <div className={Style.title}>{ev.title}</div>
        <div className={Style.img}>
            <Image src={ev.img} alt={"image"} fill className="w-full h-full object-contain"/>
        </div>
        <div className={Style.desc}>{ev.description}</div>
    </div>
}
 
export default EventCard;