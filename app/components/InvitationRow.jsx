"use client"
import { useState } from "react"
import { TiDelete } from "react-icons/ti";
import { MdModeEditOutline } from "react-icons/md";
import { Checkbox } from "@mui/material"
import { toast } from "react-hot-toast";
const InvitationSentRow = ({inv,setInvId,setEShow,setIEShow,setMutate}) => {

    const[confirm,setConfirm]=useState(false)
    const[showDelete,setShowDelete]=useState(false)
        const del=async()=>{
            console.log("statrt deeting")
            const s=await fetch(`/api/invetation/?id=${inv.id}`,{
                method:'DELETE'
            }).then(res=>{
                if (res.status=='200'){
                    toast.success('تم الحذف')
                    setMutate(true)
                }
            })
        }

    const[expand,setExpand]=useState(false)
    return <div className={`flex flex-col justify-between `}>
            {showDelete&&(<div className="flex justify-center flex-col absolute left-[600px] rounded-md p-[30px] top-[200px] bg-blue-950 ">
            <div className=" flex text-white text-[25px] mb-[30px] justify-center items-center">هل أنت متأكد انك تريد الحذف؟</div>
            <div className="flex justify-between items-center">
                <button className="flex w-[70px] bg-red-700 text-white rounded-sm m-[10px] justify-center items-center hover:shadow-white hover:shadow-md"
                onClick={()=>{
                    setShowDelete(false)
                    del()}}
                >نعم</button>
                <button className="flex w-[70px] bg-green-600 text-white rounded-sm m-[10px] justify-center items-center  hover:shadow-white hover:shadow-md"
                onClick={()=>{setShowDelete(false)}}
                >لا</button>
            </div>
        </div>)}
    <div className="flex justify-between flex-row-reverse h-[50px]">
    <div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500 text-[20px]  whitespace-nowrap  overflow-hidden "><div className=" mr-[5px]  justify-endtext-yellow-500 hover:overflow-scroll">{inv.id}</div></div>
    <div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500 text-[20px]  whitespace-nowrap  overflow-hidden "><div className=" mr-[5px]  justify-endtext-yellow-500 hover:overflow-scroll">{inv.createdDate}</div></div>

    <div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500 text-[20px]  whitespace-nowrap overflow-hidden"><div className="flex mr-[5px] justify-endtext-yellow-500 overflow-hidden">
    <div className=" mr-[5px] w-[70%] justify-end overflow-hiddentext-yellow-500 hover:overflow-scroll">{inv.name}</div>
        <div className="flex w-[30px] h-[30px] rounded-full border-[1px] border-white justify-center items-center">
            <label htmlFor="" className=" cursor-pointer" onClick={()=>{setExpand(prev=>!prev)}}>{`${expand?"-":"+"}`}</label></div>
        </div></div>
    <div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500 text-[20px]  whitespace-nowrap  overflow-hidden "><div className=" mr-[5px]  justify-endtext-yellow-500 hover:overflow-scroll">{inv.whatsapp}</div></div>
  <div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500 text-[20px]  whitespace-nowrap  overflow-hidden "><div className=" mr-[5px]  justify-endtext-yellow-500 hover:overflow-scroll">{inv.email}</div></div>
  <div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500 text-[20px]  whitespace-nowrap  overflow-hidden "><div className=" mr-[5px]  justify-endtext-yellow-500 hover:overflow-scroll">{inv.istate}</div></div>
  <div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500 text-[20px]  whitespace-nowrap  overflow-hidden "><div className=" mr-[5px]  justify-endtext-yellow-500 hover:overflow-scroll">{inv.itype}</div></div>
  <div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500 text-[20px]  whitespace-nowrap  overflow-hidden "><div className=" mr-[5px]  justify-endtext-yellow-500 hover:overflow-scroll">{inv.eventId}</div></div>



    {/* <div  className=" flex flex-1 border-[1px] justify-end items-center bg-blue-600 text-[20px]  whitespace-nowrap ">
        <Checkbox  checked={inv.affirm=="لا"} disabled ></Checkbox></div> */}


    </div>
    <div className={`   justify-evenly  ${expand?"flex":"hidden"} bg-blue-950`} >
        <div className="flex cursor-pointer border-[1px] border-white my-[5px]" onClick={()=>{setInvId(inv.id)
        if(inv.itype=="خارجي"){setEShow(true)}
        else {setIEShow(true)}
        
        }}><MdModeEditOutline size={20} color="white"/></div>
     
     <div className="flex cursor-pointer border-[1px] border-white my-[5px]" onClick={()=>{
       setShowDelete(true)
        
        }}><TiDelete size={20} color="white" /></div>
    </div>
    </div>
  
}
 
export default InvitationSentRow;