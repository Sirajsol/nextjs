"use client"
import React from 'react'
import { useCntxt } from '../context/context'
function Load() {
    const {wait}=useCntxt()
    //    return (<div>{(<div className="flex justify-center items-center absolute top-[30%] bg-blue-900 w-[60%] sm:w-[35%] sm:left-[35%] left-[20%]  h-[80px]  text-white
    //    text-[20px] md:text-[25px] lg:text-[30px] px-[40px] shadow-black shadow-md rounded z-10" >الرجاء الإنتظار</div>)}</div>)
   

      return <div className="fixed inset-0 z-50 flex justify-center items-start pt-[150px]">

      <div className="absolute inset-0 bg-black/30"></div>
        <div className="flex w-[70%] h-[100px] justify-center items-center left-[15%] top-[150px] text-[12px] sm:text-[16px]
         bg-blue-950 text-white absolute rounded-md shadow-md shadow-white ">الرجاء الانتظار , جاري تحميل البيانات</div>
    </div>
}

export default Load
