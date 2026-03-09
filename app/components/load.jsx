"use client"
import React from 'react'
import { useCntxt } from '../context/context'
function Load() {
    const {wait}=useCntxt()
    //    return (<div>{(<div className="flex justify-center items-center absolute top-[30%] bg-blue-900 w-[60%] sm:w-[35%] sm:left-[35%] left-[20%]  h-[80px]  text-white
    //    text-[20px] md:text-[25px] lg:text-[30px] px-[40px] shadow-black shadow-md rounded z-10" >الرجاء الإنتظار</div>)}</div>)
   

    return (
      <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
  
        <div className="flex flex-col items-center gap-4 bg-blue-950 text-white px-8 py-6 rounded-xl shadow-lg">
  
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
  
          <div className="text-[14px] sm:text-[18px]">
            الرجاء الانتظار، جاري تحميل البيانات...
          </div>
  
        </div>
  
      </div>
    );
}

export default Load
