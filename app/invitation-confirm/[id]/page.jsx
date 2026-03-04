"use client"
import { useParams } from "next/navigation";
import{useState,useEffect} from 'react'
import toast from 'react-hot-toast'
const   Confirm= ({params}) => {


    const {id}=useParams()
const[name,setName]=useState('')
const[title,setTitle]=useState('')
const[email,setEmail]=useState('')
const[whatsapp,setWhatsapp]=useState('')
const[position,setPosition]=useState('')
const[orgnization,setOrgnization]=useState('')
const[confirmed,setConfirmed]=useState(false)
const[wait,setWait]=useState(false)
useEffect(()=>{
    const invv=async()=>{
        setWait(true)
        const inv=await fetch(`/api/invetation/${id}`).then(res=>{
            if(!res.ok) throw Error("error")
            return res.json()
        }).catch(Error=>{})
        if(inv){
            setName(inv.name)
            setTitle(inv.title)
            
            setPosition(inv.position)
            setEmail(inv.email)
            setWhatsapp(inv.whatsapp)
            setOrgnization(inv.orgnization)

        }
        setWait(false)
    }
    invv()
},[])
    const posinvite=async()=>{
       setWait(true)
        const ev=await fetch(`/api/invetation/${id}`,{
            method:'PUT',
            headers: { 
                'Content-type': 'application/json'
              }, 
            body:JSON.stringify({name,title,orgnization,position,email,whatsapp,affirm:"نعم"})

        
             }) .then((res=>{
                if(res.ok){
                    toast.success("تم التأكيد") 
                   setConfirmed(true)
                    }
                    else{
                        toast.error("لم يتم التأكيد")
                    }
                
                res.json}))

        .catch((error)=>{toast.error(" لم يتم ")
     
        console.log("error------------------------",error)
    })
    setWait(false)
    }
    return <div className="flex flex-col mb-[10px]">
        <div className="flex w-[80%] bg-blue-500 text-white justify-center text-[30px] py-[5px] mt-[30px] rounded-md mx-auto">المعلومات</div>
      {confirmed&&(  <div className="flex w-[76%] bg-slate-400 text-white justify-end px-[10px] py-[10px] text-[15px]  mt-[30px] rounded-md mx-auto">تم حفظ المعلومات بنجاح</div>)}

{wait &&(<div className="flex w-[33%] bg-blue-950 text-yellow-500 font-bold justify-center px-[10px] py-[10px] text-[15px]  mt-[30px] rounded-md mx-auto">...الرجاء الإنتظار   </div>

)}
<div className="flex   flex-col sm:text-[18px] md:text-[22px]  w-[76%] mx-auto mt-[50px] py-[40px] bg-blue-950 text-white px-[10px] shadow-black shadow-md">

    <div className="flex flex-col sm:flex-row  w-full justify-between">

        <div className="flex flex-col items-end w-full sm:w-[50%]">
            <label className="flex  text-right sm:mr-[10%] text-blue-400" htmlFor="">الاسم</label>
            <input
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
            className=" flex w-[90%] sm:mr-[10%]  py-[5px] text-right border-yellow-400 border-b-[1px] outline-none rounded-sm bg-blue-950"/>
        </div>
        
        <div className="flex flex-col items-end w-full sm:w-[50%]">
            <label className="flex text-right text-blue-400 " htmlFor="">اللقب</label>
            <input 
            value={title}
            onChange={(e)=>{setTitle(e.target.value)}}
            className=" flex w-[90%]   py-[5px]   border-yellow-400 border-b-[1px] outline-none rounded-sm bg-blue-950 text-right"/>
        
        </div>


    </div>
     <div className="flex flex-col sm:flex-row w-full  justify-between">

        <div className="flex flex-col items-end  w-full sm:w-[50%]">
            <label className="flex text-right sm:mr-[10%] text-blue-400  " htmlFor="">الجوال</label>
            <input 
            value={whatsapp}
            onChange={(e)=>{setWhatsapp(e.target.value)}}
            className=" flex w-[90%] sm:mr-[10%]  py-[5px]  border-yellow-400 border-b-[1px] outline-none rounded-sm bg-blue-950 text-right"/>
        </div>
        
        <div className="flex flex-col items-end w-full sm:w-[50%]">
            <label className="flex text-right text-blue-400 " htmlFor="">البريد الالكتروني</label>
            <input 
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            className=" flex w-[90%]   py-[5px]  border-yellow-400 border-b-[1px] outline-none rounded-sm bg-blue-950 text-right"/>
        
        </div>


    </div>
    <div className="flex flex-col sm:flex-row w-full justify-between">

<div className="flex flex-col items-end w-full sm:w-[50%]">
    <label className="flex text-right sm:mr-[10%] text-blue-400 " htmlFor="">المنصب</label>
    <input 
    value={position}
    onChange={(e)=>{setPosition(e.target.value)}}
    className=" flex w-[90%] sm:mr-[10%]  py-[5px]   border-yellow-400 border-b-[1px] outline-none rounded-sm bg-blue-950 text-right"/>
</div>

<div className="flex flex-col items-end w-full sm:w-[50%]">
    <label className="flex text-right text-blue-400 " htmlFor="">المنظمة</label>
    <input
     value={orgnization}
     onChange={(e)=>{setOrgnization(e.target.value)}}
    className=" flex w-[90%]   py-[5px]   border-yellow-400 border-b-[1px] outline-none rounded-sm bg-blue-950 text-right"/>

</div>


</div>
</div>
<div className="flex w-[76%] mt-[20px]   justify-end mx-auto "><button 
onClick={()=>{posinvite()}}
disabled={(!name || !email ||!position || !whatsapp ||!orgnization ||!title)}
className="flex justify-center w-[90px] bg-blue-600 text-white
 py-[5px] px-[10px] rounded cursor-pointer disabled:cursor-not-allowed ">تأكيد</button></div>

        {/* {id} */}
        </div>
}
 
export default Confirm ;