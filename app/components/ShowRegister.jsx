"use client"
import { useState } from "react";
import Register from './Register'
import { useCntxt } from "../context/context";
const ShowRegister = ({id}) => {
    const [show,setShow]=useState(false)
const{setWait}=useCntxt()
    return <div className='flex w-[100%] justify-end py-[20px]'>
    <button 
    onClick={()=>{
        // alert('fuck')
        // console.log('fuckkkkk')
        setShow(true)
    setWait(true)
    }}
    className='flex w-[10%] text-[10px] rounded-md bg-orange-600
     text-white justify-center items-center mr-[10%] py-[5px] shadow-sm shadow-black mt-[30px] sm:text-[14px] md:text-[17px]
     hover:shadow-md hover:shadow-white
     '>سجل الآن</button>
     { show &&<Register eventid={id} setShow={setShow} />}
</div>
}
 
export default ShowRegister;