"use client"
import { useState } from "react"

import { MdModeEditOutline } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import {placedel} from '../actions/eventactions'
import {toast} from 'react-hot-toast'


const PlaceTableRow = ({place,setPlace,setEShow,setMutate,setIsDeleting}) => {

    const[confirm,setConfirm]=useState(false)
    const[showDelete,setShowDelete]=useState(false)
    const[deleting,setDeleting]=useState(false)

        // const del=async()=>{
        //   setDeleting(true)
        //     console.log("statrt deeting")
        //     const s=await fetch(`/api/place/?id=${place.id}`,{
        //         method:'DELETE'
        //     }).then(res=>{
        //         if (res.status=='200'){
        //           setDeleting(false)
        //             toast.success('تم الحذف')
        //             // setExpand(false)
        //             setMutate(true)
        //         }
        //     })
        // }


        const del=async(id)=>{
          // setDeleting(true)
          setIsDeleting(true)
          const r=await placedel(id)
toast.success('تم الحذف')
// setDeleting(false)
setIsDeleting(false)

setMutate(true)
        }

    const[expand,setExpand]=useState(false)
  return  <div className={`flex flex-col justify-between bg-yellow-300`}>


{/* {deleting&&(<div className="flex w-full h-screen absolute">
        
        <div className="flex w-full h-screen absolute bg-black opacity-30 left-0 top-[-20px]"></div>
        <div className='flex w-[80%] left-[10%] md:w-[400px] h-[100px]  bg-blue-950 text-white shadow-md shadow-white rounded-md
 md:left-[600px] top-[100px] justify-center items-center absolute z-30' >جاري الحذف</div>
 </div>
 )} */}


{ (<div className={`flex flex-col justify-between bg-red-700 `}>
  {showDelete&&(<div className="flex justify-center flex-col absolute z-20
   left-[20%] sm:left-[30%] lg:left-[600px] rounded-md p-[30px] top-[200px]  bg-blue-950 ">
  <div className=" flex text-white text-[25px] mb-[30px] justify-center items-center">هل أنت متأكد انك تريد الحذف؟</div>
  <div className="flex justify-between items-center">
      <button className="flex w-[70px] bg-red-700 text-white rounded-sm m-[10px] justify-center items-center  hover:shadow-white hover:shadow-md"
      onClick={()=>{
          setShowDelete(false)
          del(place.id)}}
      >نعم</button>
      <button className="flex w-[70px] bg-green-600 text-white rounded-sm m-[10px] justify-center items-center  hover:shadow-white hover:shadow-md"
      onClick={()=>{setShowDelete(false)}}
      >لا</button>
  </div>
</div>)}
<div className="flex justify-between flex-row-reverse h-[50px] border-b-[1px]">


<div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500  text-[13px] sm:text-[20px]  whitespace-nowrap  overflow-hidden "><div className=" mr-[5px]  justify-end  hover:overflow-scroll">{place.id}</div></div>
<div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500  text-[13px] sm:text-[20px]  whitespace-nowrap overflow-hidden"><div className="flex mr-[5px] justify-end  overflow-hidden">
<div className=" flex flex-1  justify-end items-center bg-blue-950 text-yellow-500  text-[13px] sm:text-[20px]  whitespace-nowrap  overflow-hidden "><div className={` justify-end   hover:overflow-scroll`}>{place?.name}</div></div>
{/* <div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500  text-[20px]  whitespace-nowrap  overflow-hidden "><div className=" mr-[5px]  justify-end  hover:overflow-scroll">{chair?.category?.title}</div></div> */}
<div className="flex w-[30px] h-[30px] rounded-full border-[1px] border-white justify-center items-center">
  <label htmlFor="" className=" cursor-pointer" onClick={()=>{setExpand(prev=>!prev)}}>{`${expand?"-":"+"}`}</label></div>
</div></div>
<div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500 text-[13px] sm:text-[20px]  whitespace-nowrap  overflow-hidden "><div className=" mr-[5px]  justify-end  hover:overflow-scroll">{place.enName}</div></div>

<div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500 text-[13px] sm:text-[20px]  whitespace-nowrap  overflow-hidden "><div className=" mr-[5px]  justify-end  hover:overflow-scroll">{place.seatPlan}</div></div>


</div>


<div className={`   justify-evenly z-0 ${expand?"flex":"hidden"}  bg-blue-950`}>
<div  onClick={()=>{setPlace(place)
{setEShow(true)}

}}

className=" flex border-[1px] border-white my-[5px] cursor-pointer"

><MdModeEditOutline size={20} color="white"/></div>




<div className="flex cursor-pointer border-[1px] border-white my-[5px]" onClick={()=>{
setShowDelete(true)


}}><TiDelete size={20} color="white" /></div>
{/* {chair.invetation.length} */}
</div>
</div>)  


  } 

  </div>
  
  
  
  
}
 
export default PlaceTableRow;

/*
1-return the main din explicitly refardless of any condition

2-within the main div render conditionally {condition &&()}
*/