"use client"
import { useState } from "react";
import { toast } from "react-hot-toast";
const ChairBook = ({id,chairs,setBook,setMutate}) => {
    const [chairId,setChairId]=useState('')
    const[wait,setWait]=useState(false)
    const upd=async()=>{
        setWait(true)
        const inv= await fetch(`/api/invetation/${id}`,{
            method:'PUT',
            body:JSON.stringify({chairId})
        }).then(
            res=>{if(res.status=='200'){
                toast.success("تم حجز مقعد")
               
                setMutate(true)
               
            }
            else{if(inv.status=='200'){
                toast.success("error'")
            }}
            setWait(false)
            setBook(false)
        }
        )
    //    if(inv){alert(inv.status)} 
        // if(inv.status=='200'){
        //     toast.success("تم حجز مقعد")
        // }
        setWait(false)
        // setBook(false)
    }
    return <div className="flex  w-screen h-screen absolute" >
        <div className="flex  w-screen h-screen bg-black opacity-30"
        onClick={()=>{setBook(false)}}
        ></div>
        {wait&&(<div className="flex w-[20%] h-[40px] absolute mx-auto top-[300px] left-[600px] z-30 shadow-md shadow-white bg-blue-500
         rounded-md text-yellow-500 justify-center items-center">...جاري حجز مقعد</div>)}
        <div className="flex flex-col absolute w-[500px] h-[300px]  bg-blue-950 shadow-md shadow-white left-[500px] top-[100px] rounded-md ">
            <div className="flex w-full justify-evenly pt-[20px] ">
                <select className=" flex w-[40%] h-[30px] text-right
                 text-white bg-blue-950 outline-none border-b-[1px] border-yellow-400"
                 value={chairId}
                 onChange={(e)=>{setChairId(e.target.value)}}
                 >
                    <option value="">الرجاء اختيار مقعد</option>
                    {chairs.map(chair=>{
                        return <option key={chair.id} value={chair.id}>{chair.title}</option>
                    })}
                </select>
                <label className="flex  h-[30px] text-right text-white justify-end mr-[20px]
                 bg-blue-950 outline-none border-b-[1px] border-yellow-400" >رمز المقعد</label>
            </div>
            <div className="flex justify-end mt-[60px] mr-[90px]">
                <button className=" flex w-[70px] bg-orange-600 text-white py-[5px]  justify-center items-center rounded-md shadow-md shadow-white active:shadow-sm"
                onClick={()=>{
                    // setMutate(true)
                  upd()
                }}
                >حفظ</button></div>
        </div>
    </div>
    
}
 
export default ChairBook;