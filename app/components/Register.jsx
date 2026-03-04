"use client"
import { useState,useEffect } from "react"
import {toast} from 'react-hot-toast'
const Register = ({eventid,setShow}) => {

    const[titles,setTitles]=useState([])
    // const[categories,setCategories]=useState([])
    const[name,setName]=useState('')
       
        const[email,setEmail]=useState('')
        const[whatsapp,setWhatsapp]=useState('')
        const[title,setTitle]=useState('')
        const[position,setPosition]=useState('')
        // const[category,setCategory]=useState('')
        const[orgnization,setOrgnization]=useState('')
        const[wait,setWait]=useState(false)

        useEffect(()=>{
            const pls=async()=>{
                setWait(true)
                const ttls=await fetch('/api/titletwo').then(res=>res.json())
    
                if(ttls){setTitles(ttls)}
                setWait(false)
            }
            pls()
        },[])

        const posinvite=async()=>{

            // alert("sending")

            const ev=await fetch('/api/invetation',{
                method:'POST',
                body:JSON.stringify({name,eventId:eventid,title, orgnization,position,categoryId:"",email,whatsapp,itype:"خارجي",affirm:"",istate:"قيد الدراسة"})
            }).then(res=>res.json())
            .catch((error)=>{toast.error("لم يتم التسجيل")
            console.log("error------------------------",error)
        })
            if(ev){toast.success("تم التسجيل")
            setShow(false)
            console.log(ev)}
        //   else  if(!ev){toast.error("error")
        
        // }
        
        
        }
       



   
    return <div className=" flex flex-col">
    <div onClick={()=>{setShow(false)}}
    className=" flex w-screen h-screen bg-black opacity-35 absolute top-[-10px]  sm:top-[-100px] left-[-50px] "></div>
    {wait&&(<div className="flex w-[30%]  mx-auto text-yellow-500 bg-blue-950  justify-center items-center absolute
     border-[1px] px-[20px]  top-[30%] "></div>)}
    <div className="flex w-[60%]  flex-col justify-end mr-30px border-[1px] px-[20px]
     bg-blue-950 rounded-md border-yellow-300 shadow-black shadow-md absolute z-20 top-[20%] sm:top-[30%] left-[20%]">

      <div className=" flex  justify-between flex-col sm:flex-row ">
       <div className="flex sm:w-[40%] flex-col justify-center mb-[20px] w-full">
       <label className="flex w-full justify-end text-[8px] sm:text-[14px] md:text-[17px] botder-b-[1px] border-yellow-400 text-white" text-white>اللقب</label>
        <select className="flex text-[8px] sm:text-[14px] md:text-[17px] w-full text-right h-[40px]  bg-blue-950  text-white outline-none border-b-[1px] border-yellow-300"
        onChange={(e)=>{setTitle(e.target.value)}}
        >
            <option>الرجاء اختيار اللقب</option>
            {titles&& titles.length>0&& titles.map(tit=>{
                return <option key={tit.id} value={tit.title}>{tit.title}</option>
            })}
        </select>
        </div>
        <div className="flex sm:w-[40%] flex-col justify-center mb-[20px] w-full">
        <label className="flex w-full justify-end text-[8px] sm:text-[14px] md:text-[17px]  botder-b-[1px] border-yellow-400 text-white">الاسم</label>
        <input type="text" 
        value={name}
        onChange={(e)=>{setName(e.target.value)}}
        className="flex w-full text-right h-[40px] bg-transparent  text-white outline-none border-b-[1px] border-yellow-300"/>
        </div>
        </div>


        <div className="flex  justify-between flex-col sm:flex-row">
        <div className="flex sm:w-[40%] flex-col justify-center mb-[20px] w-full">
        <label className="flex w-full justify-end text-[8px] md:text-[17px] sm:text-[14px] botder-b-[1px] border-yellow-400 text-white">البريد الإلكتروني</label>
        <input type="text"
        value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
        className="flex w-full text-right h-[40px]  bg-transparent  text-white outline-none border-b-[1px] border-yellow-300"/>
        </div>

        <div className="flex sm:w-[40%] flex-col justify-center mb-[20px] w-full">
        <label className="flex w-full justify-end text-[8px] md:text-[17px] sm:text-[14px]  botder-b-[1px] border-yellow-400 text-white">الجوال</label>
        <input type="text" 
        value={whatsapp}
        onChange={(e)=>{setWhatsapp(e.target.value)}}
        className="flex w-full text-right h-[40px] text-[8px] bg-transparent md:text-[17px] sm:text-[14px] text-white outline-none border-b-[1px] border-yellow-300"/>
        </div>
        </div>

        <div className="flex  justify-between flex-col sm:flex-row">
        <div className="flex sm:w-[40%] flex-col justify-center mb-[20px] w-full">
        <label className="flex w-full justify-end text-[8px] botder-b-[1px] md:text-[17px]  sm:text-[14px] max-w-xs:text-[8px] border-yellow-400 text-white">المنظمة</label>
        <input type="text"
        value={orgnization}
        onChange={(e)=>{setOrgnization(e.target.value)}}
        className="flex w-full text-right h-[40px] text-[8px] bg-transparent md:text-[17px] sm:text-[14px] max-w-xs:text-[8px] text-white outline-none border-b-[1px] border-yellow-300"/>
        </div>

        <div className="flex sm:w-[40%]  flex-col justify-center mb-[20px] w-full">
        <label className="flex w-full justify-end text-[8px] botder-b-[1px] border-yellow-400 text-white md:text-[17px] sm:text-[14px]   ">المنصب</label>
        <input type="text"
        value={position}
        onChange={(e)=>{setPosition(e.target.value)}}
        className="flex w-full text-right h-[40px]  bg-transparent  text-white outline-none border-b-[1px] border-yellow-300 md:text-[17px] sm:text-[12px]"/>
        </div>
        </div>


<div className="flex w-full justify-end">
    <button
    disabled={(!name || !email ||!orgnization ||! title ||!position)}
    className=" flex w-[80px] py-[5px] mb-[12px] rounded-md  border-[1px] cursor-pointer disabled:cursor-not-allowed >
     text-white items-center justify-center hover:border-yellow-400 hover:shadow-white hover:shadow-md"
     onClick={()=>{posinvite()}}
     >إرسال</button>
    </div>
        
    </div>
    </div>
}
 
export default Register;