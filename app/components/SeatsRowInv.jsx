"use client"
import { useState } from "react"
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { Checkbox } from "@mui/material"
import { chdir } from "process";
import { toast } from "react-hot-toast";
const SeatsRowInv = ({inv,chairId,setChairId,setEShow}) => {

    const[confirm,setConfirm]=useState(false)
    const[showDelete,setShowDelete]=useState(false)
        const del=async()=>{
            console.log("statrt deeting")
            const s=await fetch(`/api/chair/?id=${chairId}`,{
                method:'DELETE'
            }).then(res=>{
                if (res.status=='200'){
                    toast.success('تم الحذف')
                    setMutate(true)
                }
            })
        }

    const[expand,setExpand]=useState(false)
  return  <div className={`flex flex-col justify-between bg-yellow-300`}>
 {showDelete&&(<div className="flex justify-center flex-col absolute left-[600px] rounded-md p-[30px] top-[200px]  bg-blue-950 ">
  <div className=" flex text-white text-[25px] mb-[30px] justify-center items-center">هل أنت متأكد انك تريد الحذف؟</div>
  <div className="flex justify-between items-center">
      <button className="flex w-[70px] bg-red-700 text-white rounded-sm m-[10px] justify-center items-center  hover:shadow-white hover:shadow-md"
      onClick={()=>{
          setShowDelete(false)
          del()}}
      >نعم</button>
      <button className="flex w-[70px] bg-green-600 text-white rounded-sm m-[10px] justify-center items-center  hover:shadow-white hover:shadow-md"
      onClick={()=>{setShowDelete(false)}}
      >لا</button>
  </div>
</div>)}
 <div  className={`flex flex-col justify-between bg-yellow-300`}>
<div className="flex justify-between flex-row-reverse h-[50px]">


<div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500  text-[20px]  whitespace-nowrap  overflow-hidden "><div className=" mr-[5px]  justify-end  hover:overflow-scroll">{inv.chairId}</div></div>
<div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500  text-[20px]  whitespace-nowrap overflow-hidden"><div className="flex mr-[5px] justify-end  overflow-hidden">
<div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500  text-[20px]  whitespace-nowrap  overflow-hidden "><div style={{backgroundColor:`${inv.chair?.category?.color}`}} className={`  justify-end  `}>{inv?.chair?.title}</div></div>
{/* <div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500  text-[20px]  whitespace-nowrap  overflow-hidden "><div className=" mr-[5px]  justify-end  hover:overflow-scroll">{inv.chair?.category?.title}</div></div> */}
    <div className="flex w-[30px] h-[30px] rounded-full border-[1px] border-white justify-center items-center " >
        <label htmlFor="" className=" cursor-pointer"  onClick={(e)=>{
          
            setExpand(prev=>!prev)
          
            // alert(e.currentTarget.id)
            }}>{`${expand?"-":"+"}`}</label></div>
    </div></div>

<div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500  text-[20px]  whitespace-nowrap  overflow-hidden "><div className=" mr-[5px]  justify-end  hover:overflow-scroll">{inv.name}</div></div>
<div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500  text-[20px]  whitespace-nowrap  overflow-hidden "><div className=" mr-[5px]  justify-end  hover:overflow-scroll">{inv.chair.catId}</div></div>


<div  className=" flex flex-1 border-[1px] justify-center  items-center bg-blue-950 text-yellow-500  text-[20px]  whitespace-nowrap ">
    {/* <Checkbox  checked={inv.affirm=="لا"} color="#fffff" disabled ></Checkbox></div> */}
{/* <input type="checkbox" checked={true} className=" bg-blue-950 text-yellow-500 w-[20px] h-[20px]"></input> */}
محجوز
</div>
</div>


<div className={`   justify-evenly z-30 ${expand?"flex":"hidden"}  bg-blue-950`}>
    <div  onClick={()=>{setChairId(chairId)
   {setEShow(true)}
  
    }}
    
    className=" flex border-[1px] border-white my-[5px] cursor-pointer"

    ><MdModeEditOutline size={20} color="white"/></div>

   <div className="flex cursor-pointer border-[1px] border-white my-[5px]" onClick={()=>{
   setShowDelete(true)
    
    }}><TiDelete size={20} color="white" /></div>
    
</div>
</div>







  </div>
  
  
  
  
}
 
export default SeatsRowInv;

/*
1-return the main din explicitly refardless of any condition

2-within the main div render conditionally {condition &&()}
*/