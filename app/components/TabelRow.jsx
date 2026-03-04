"use client"
import { useState } from "react";

const TableRow = ({id,name,date,time,sentNumer,generalNumber}) => {
    const[expand,setExpand]=useState(false)
    return    <div className="flex flex-col w-full ">
    <div className=" flex w-full  justify-between h-[50px] border-b-[1px] mb-[2px] bg-blue-500">
    <div className="flex flex-1 items-center justify-end">show</div>
    
        <div className="flex flex-1 justify-center items-center hover:border-[1px] font-[700] text-white  text-[20px]">{generalNumber}</div>
        <div className="flex flex-1 justify-center items-center hover:border-[1px] font-[700] text-white  text-[20px]">{sentNumer}</div>
        <div className="flex flex-1 justify-center items-center hover:border-[1px] font-[700] text-white  text-[20px]">{time}</div>
        <div className="flex flex-1 justify-center items-center hover:border-[1px] font-[700] text-white  text-[20px]">{date}</div>
        <div className="flex flex-1  flex-row justify-between items-center hover:border-[1px] font-[700] text-white  text-[20px]">

            <div className="flex w-full justify-end ">{name}</div>
            <div className=" flex w-full justify-end">
                <label 
            onClick={()=>{setExpand(prev =>!prev)}}
            htmlFor="" className=" flex mr-[10px] font-[700] text-[25px] w-[25px] h-[25px] 
            justify-center items-center cursor-pointer rounded-full border-[2px] hover:border-yellow-300" 
           
            >{expand?"-":"+"}</label></div>
        </div>
        <div className="flex flex-1 justify-center items-center hover:border-[1px] font-[700] text-white  text-[20px]">6</div>
        </div>
        {expand&&(<div className="flex  justify-center items-center w-full border-[1px]">
            <div className="flex flex-col w-[300px] justify-center border-[1px]">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            </div>
        </div>)}
        
</div>
}
 
export default TableRow;