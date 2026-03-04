



"use client"
import {useState} from 'react'
import { toast } from 'react-hot-toast';
import { MdModeEditOutline } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { eventdel } from '../actions/eventactions';
import { revalidatePath } from 'next/cache';


const TR = ({cols,name,id,setEShow,setEvtId,setEvvt,evt,setIsDeleteing,setMutate}) => {

    const[confirm,setConfirm]=useState(false)
    const[showDelete,setShowDelete]=useState(false)
   
        // const del=async()=>{
        //     console.log("statrt deeting")
        //     const s=await fetch(`/api/event/id=${evt.id}`,{
        //         method:'DELETE'
        //     }).then(res=>{
        //         if (res.status=='200'){
        //             toast.success('تم الحذف')
        //             setMutate(true)
        //         }
        //     }).catch(error=>console.log('error in TR i is ',error))
        // }
       
        const delet=async(id)=>{
            setIsDeleteing(true)
           const r=await eventdel(id)
        //    alert(r)
        setIsDeleteing(false)
      
           toast.success('تم الحذف')
           setMutate(true)
        }

    const[expand,setExpand]=useState(false)
//     const delet=async()=>{
// const w=await fetch(`/api/event${id}`,{
//     method:'DELETE'
// }).then(res=>res.json())
// if(w.res=='200'){
//     toast.success('yes')
// }
//     }
    return    <div className="flex flex-col w-full  ">
            {showDelete&&(<div className="flex justify-center flex-col absolute md:left-[600px] rounded-md p-[30px] top-[200px] bg-blue-950 ">
            <div className=" flex text-white text-[25px] mb-[30px] justify-center items-center">هل أنت متأكد انك تريد الحذف؟</div>
            <div className="flex justify-between items-center">
                <button className="flex w-[70px] bg-red-700 text-white rounded-sm m-[10px] justify-center items-center  hover:shadow-white hover:shadow-md"
                onClick={()=>{
                    setShowDelete(false)
                    // eventdel(evt.id)
                delet(evt.id)
                }}
                >نعم</button>
                <button className="flex w-[70px] bg-green-600 text-white rounded-sm m-[10px] justify-center items-center  hover:shadow-white hover:shadow-md"
                onClick={()=>{setShowDelete(false)}}
                >لا</button>
            </div>

        </div>)}

    <div className=" flex w-full  justify-between h-[80px] border-b-[1px] mb-[2px] bg-blue-500 overflow-hidden">
    {cols.map((col,index)=>{
        return         <div key={index} className="flex flex-1 justify-end mr-[10px] items-center hover:border-[1px] font-[700] text-white  text-[20px] overflow-hidden hover:overflow-visible  text-right">{col}</div>

    })}
       
        <div className="flex flex-1  flex-row justify-between items-center hover:border-[1px] font-[700] text-white  text-[20px] overflow-hidden">

            {/* <div className="  h-[30px] w-[40px] justify-end items-center overflow-hidden hover:overflow-visible text-right">{name}</div> */}
            <div className="flex whitespace-nowrap flex-nowrap  w-full h-[30px] justify-end items-start hover:border-[1px] font-[700] text-white  text-[20px]  overflow-hidden hover:overflow-visible text-right text-wrap">{name}</div>
{/* <label className='flex max-h-[40px] text-nowrap whitespace-nowrap overflow-hidden hover:overflow-x-scroll ' htmlFor="">llllllllllllllllll lllllllllllllllll llllllllllllllllllll</label> */}
            <div className=" flex w-[50px] justify-end">
                <label 
            onClick={()=>{setExpand(prev =>!prev)}}
            htmlFor="" className=" flex mr-[10px] font-[700] text-[25px] w-[25px] h-[25px] 
            justify-center items-center cursor-pointer rounded-full border-[2px] hover:border-yellow-300" 
           
            >{expand?"-":"+"}</label></div>
        </div>
        <div className="flex flex-1 justify-center items-center hover:border-[1px] font-[700] text-white  text-[20px] overflow-hidden hover:overflow-scroll text-right">{id}</div>
        </div>
        {expand&&(<div className="flex  justify-center items-center w-full border-[1px]">
            <div className="flex  w-[300px] justify-center border-[1px]">
            {/* <div>1</div>
            <div>2</div>
            <div>3</div> */}

            {/* {actions.map(act=>{
               return <div onClick={()=>{act()}} className='flex w-[50px] cursor-pointer'><MdModeEditOutline size={20}/></div>
            })} */}
            <div  className='flex w-[50px] cursor-pointer'
            ><MdModeEditOutline size={20} onClick={()=>{
                setEvtId(id)
                setEvvt(evt)
                setEShow(true)
            }}/></div>
            <div onClick={()=>{setShowDelete(true)}} className='flex w-[50px] cursor-pointer'><TiDelete size={20}/></div>
            </div>
        </div>)}
        
</div>
}
 
export default TR;