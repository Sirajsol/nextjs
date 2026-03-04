"use client"
import { useState } from "react"
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { Checkbox } from "@mui/material"
import { chdir } from "process";
import SeatsRowInv from "./SeatsRowInv";
import { toast } from "react-hot-toast";
const SeatsRow = ({chair,setChairId,setEShow,setMutate, setWt}) => {

    const[confirm,setConfirm]=useState(false)
    const[showDelete,setShowDelete]=useState(false)
    const[deleting,setDeleting]=useState(false)
        const del=async()=>{
          setDeleting(true)
            console.log("statrt deeting")
            const s=await fetch(`/api/chair/?id=${chair.id}`,{
                method:'DELETE'
            }).then(res=>{
                if (res.status=='200'){
                  setDeleting(false)
                    toast.success('تم الحذف')
                    // setExpand(false)
                    setMutate(true)
                }
            })
        }

    const[expand,setExpand]=useState(false)
  return  <div className={`flex flex-col justify-between bg-yellow-300`}>
{deleting&&(<div className=" flex w-[400px] h-[80px] absolute z-20 left-[550px] top-[100px] bg-blue-950  shadow-black shadow-sm rounded-md text-white justify-center items-center
">...جاري الحذف</div>)}
{chair.invetation.length>0 &&chair.invetation.map(inv=>{
return <SeatsRowInv key={inv.id} inv={inv} chairId={chair.id} setEShow={setEShow} setChairId={setChairId}/>
//  <div  className={`flex flex-col justify-between bg-yellow-300`}>
// <div className="flex justify-between flex-row-reverse h-[50px]">


// <div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500  text-[20px]  whitespace-nowrap  overflow-hidden "><div className=" mr-[5px]  justify-end  hover:overflow-scroll">{inv.chairId}</div></div>
// <div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500  text-[20px]  whitespace-nowrap overflow-hidden"><div className="flex mr-[5px] justify-end  overflow-hidden">
// <div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500  text-[20px]  whitespace-nowrap  overflow-hidden "><div style={{backgroundColor:`${inv.chair?.category?.color}`}} className={`  justify-end  `}>{inv?.chair?.title}</div></div>
// {/* <div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500  text-[20px]  whitespace-nowrap  overflow-hidden "><div className=" mr-[5px]  justify-end  hover:overflow-scroll">{inv.chair?.category?.title}</div></div> */}
//     <div className="flex w-[400px] h-[30px] rounded-full border-[1px] border-white justify-center items-center " >
//         <label htmlFor="" className=" cursor-pointer" id={inv.id} onClick={(e)=>{
//           if(e.currentTarget.id=="659c0983a65d74d0038f8727"){
//             setExpand(prev=>!prev)
//           }
//             // alert(e.currentTarget.id)
//             }}>{`${expand?"-":"+"}`}{inv.id}</label></div>
//     </div></div>

// <div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500  text-[20px]  whitespace-nowrap  overflow-hidden "><div className=" mr-[5px]  justify-end  hover:overflow-scroll">{inv.name}</div></div>
// <div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500  text-[20px]  whitespace-nowrap  overflow-hidden "><div className=" mr-[5px]  justify-end  hover:overflow-scroll">{inv.chair.catId}</div></div>


// <div  className=" flex flex-1 border-[1px] justify-center  items-center bg-blue-950 text-yellow-500  text-[20px]  whitespace-nowrap ">
//     {/* <Checkbox  checked={inv.affirm=="لا"} color="#fffff" disabled ></Checkbox></div> */}
// <input type="checkbox" checked={chair.invetation?.length>0} className=" bg-blue-950 text-yellow-500 w-[20px] h-[20px]"></input></div>
// </div>


// <div className={`   justify-evenly z-30 ${expand?"flex":"hidden"}  bg-blue-950`}>
//     <div  onClick={()=>{setChairId(chair.id)
//    {setEShow(true)}
  
//     }}
    
//     className=" flex border-[1px] border-white my-[5px] cursor-pointer"

//     ><MdModeEditOutline size={20} color="white"/></div>

//    <div className="flex cursor-pointer border-[1px] border-white my-[5px]" onClick={()=>{
//    setShowDelete(true)
    
//     }}><TiDelete size={20} color="white" /></div>
//     {chair.invetation.length}
// </div>
// </div>

})}



{chair.invetation.length==0 && (<div className={`flex flex-col justify-between bg-red-700 `}>
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
<div className="flex justify-between flex-row-reverse h-[50px]">


<div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500  text-[20px]  whitespace-nowrap  overflow-hidden "><div className=" mr-[5px]  justify-end  hover:overflow-scroll">{chair.id}</div></div>
<div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500  text-[20px]  whitespace-nowrap overflow-hidden"><div className="flex mr-[5px] justify-end  overflow-hidden">
<div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500  text-[20px]  whitespace-nowrap  overflow-hidden "><div style={{backgroundColor:`${chair.category.color}`}} className={` justify-end   hover:overflow-scroll`}>{chair?.title}</div></div>
{/* <div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500  text-[20px]  whitespace-nowrap  overflow-hidden "><div className=" mr-[5px]  justify-end  hover:overflow-scroll">{chair?.category?.title}</div></div> */}
<div className="flex w-[30px] h-[30px] rounded-full border-[1px] border-white justify-center items-center">
  <label htmlFor="" className=" cursor-pointer" onClick={()=>{setExpand(prev=>!prev)}}>{`${expand?"-":"+"}`}</label></div>
</div></div>
<div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500  text-[20px]  whitespace-nowrap  overflow-hidden "><div className=" mr-[5px]  justify-end  hover:overflow-scroll"></div>{""}</div>
<div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500  text-[20px]  whitespace-nowrap  overflow-hidden "><div className=" mr-[5px]  justify-end  hover:overflow-scroll">{chair.catId}</div></div>


<div  className=" flex flex-1 border-[1px] justify-center  items-center bg-blue-950 text-yellow-500  text-[20px]  whitespace-nowrap ">
{/* <Checkbox  checked={inv.affirm=="لا"} color="#fffff" disabled ></Checkbox></div> */}
{/* <input type="checkbox" checked={chair.invetation?.length>0} className=" bg-blue-950 text-yellow-500 w-[20px] h-[20px]"></input> */}
{chair.invetation?.length>0?"محجوز":"فارغ"}
</div>
</div>


<div className={`   justify-evenly z-0 ${expand?"flex":"hidden"}  bg-blue-950`}>
<div  onClick={()=>{setChairId(chair.id)
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
  
  
  // {chr.invetation &&chr.invetation.length>0 &&chr.invetation.map(invv=>{
    //     return     <div className=" flex h-[20px]  "> {invv.name} {invv.chairId}</div>
        
    //     })}
//     {chair.invetation.length>0 &&chair.invetation.map(inv=>{
//         return <div className={`flex flex-col justify-between bg-yellow-300`}>
//         {/* {showDelete&&(<div className="flex justify-center flex-col absolute left-[600px] rounded-md p-[30px] top-[200px] bg-blue-950 ">
//         <div className=" flex text-white text-[25px] mb-[30px] justify-center items-center">هل أنت متأكد انك تريد الحذف؟</div>
//         <div className="flex justify-between items-center">
//             <button className="flex w-[70px] bg-red-700 text-white rounded-sm m-[10px] justify-center items-center  hover:shadow-white hover:shadow-md"
//             onClick={()=>{
//                 setShowDelete(false)
//                 del()}}
//             >نعم</button>
//             <button className="flex w-[70px] bg-green-600 text-white rounded-sm m-[10px] justify-center items-center  hover:shadow-white hover:shadow-md"
//             onClick={()=>{setShowDelete(false)}}
//             >لا</button>
//         </div>
//     </div>)} */}
// <div className="flex justify-between flex-row-reverse h-[50px]">


// <div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500  text-[20px]  whitespace-nowrap  overflow-hidden "><div className=" mr-[5px]  justify-end  hover:overflow-scroll">{inv.name}</div></div>
// <div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500  text-[20px]  whitespace-nowrap overflow-hidden"><div className="flex mr-[5px] justify-end  overflow-hidden">
// <div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500  text-[20px]  whitespace-nowrap  overflow-hidden "><div style={{backgroundColor:`${inv.chair?.category?.color}`}} className={`mr-[5px]  justify-end bg-[#555]  hover:overflow-scroll`}>{chair?.chair?.title}</div></div>
// <div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500  text-[20px]  whitespace-nowrap  overflow-hidden "><div className=" mr-[5px]  justify-end  hover:overflow-scroll">{inv.chair?.category?.title}</div></div>
//     <div className="flex w-[30px] h-[30px] rounded-full border-[1px] border-white justify-center items-center">
//         <label htmlFor="" className=" cursor-pointer" onClick={()=>{setExpand(prev=>!prev)}}>{`${expand?"-":"+"}`}</label></div>
//     </div></div>

// <div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500  text-[20px]  whitespace-nowrap  overflow-hidden "><div className=" mr-[5px]  justify-end  hover:overflow-scroll">{inv.name}</div></div>
// <div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-950 text-yellow-500  text-[20px]  whitespace-nowrap  overflow-hidden "><div className=" mr-[5px]  justify-end  hover:overflow-scroll">{inv.chair.categoryId}</div></div>


// <div  className=" flex flex-1 border-[1px] justify-center  items-center bg-blue-950 text-yellow-500  text-[20px]  whitespace-nowrap ">
//     {/* <Checkbox  checked={inv.affirm=="لا"} color="#fffff" disabled ></Checkbox></div> */}
// <input type="checkbox" checked={chair.invetation?.length>0} className=" bg-blue-950 text-yellow-500 w-[20px] h-[20px]"></input></div>
// </div>


// <div className={`   justify-evenly z-30 ${expand?"flex":"hidden"}  bg-blue-950`}>
//     <div  onClick={()=>{setChairId(chair.id)
//    {setEShow(true)}
  
//     }}
    
//     className=" flex border-[1px] border-white my-[5px] cursor-pointer"

//     ><MdModeEditOutline size={20} color="white"/></div>
// {/* 
//     <div onClick={()=>{setInvId(inv.id)
//     setChairs(inv.event.place.chairs)
//     // alert(inv.event.place.name)
//     setBook(true)
//     // setCustomer(inv.name)
//     }}
//     className=" flex border-[1px] border-white my-[5px] cursor-pointer"
//     ><MdAirlineSeatReclineExtra size={20} color="white"/></div> */}
//    <div className="flex cursor-pointer border-[1px] border-white my-[5px]" onClick={()=>{
//    setShowDelete(true)
    
//     }}><TiDelete size={20} color="white" /></div>
//     {chair.invetation.length}
// </div>
// </div>
//     })}
  
}
 
export default SeatsRow;

/*
1-return the main din explicitly refardless of any condition

2-within the main div render conditionally {condition &&()}
*/