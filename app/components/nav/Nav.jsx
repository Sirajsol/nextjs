"use client"
import Link from "next/link";
import { useState ,useEffect } from "react";
import {useCntxt} from '../../context/context'
const NavBar = ({children}) => {

    const[visible,setVisible]=useState(false)
    const {user,setUser,loaded,setWait}=useCntxt()
     const[auth,setAuth]=useState(false)
   
     useEffect(()=>{
 if(loaded){
   if(!user ||!user?.name){
      setVisible(false)
         }
         else{
             setVisible(true)
         }
 }
     },[loaded,user])

    const[oncontrol,setOnControl]=useState(false)
    const[onevent,setOnEvent]=useState(false)
    return <div className="flex  w-screen justify-end h-[50px] bg-blue-100 py-[30px] items-center  z-10 ">
  {visible &&(  <div className="flex  w-full justify-end h-[50px] bg-blue-100 py-[30px] items-center  z-10 ">
        
        
        <div className="flex flex-col relative ml-[50px] cursor-pointer font-[800] text-[15px] sm:text-[25px] text-blue-950 pb-[10px] sm:mr-[150px] z-10"
         onMouseEnter={()=>{setOnControl(true)}} onMouseLeave={()=>{setOnControl(false)}}>التحكم
        {oncontrol &&( <div className="bg-yellow-600 w-[140px] h-[2px] absolute left-[-25px] top-[35px]"></div>)}

        {oncontrol &&(<div className="flex flex-col  absolute   bg-gray-900 w-[120px] sm:w-[200px] h-[300px] mt-[40px] ml-[-20px] justify-between rounded shadow-black shadow-md z-20">
            <div  onMouseEnter={()=>{setOnControl(true)}} onClick={()=>{setOnControl(false) 
                setWait(true)}} className="flex h-[50px]  mx-[5px]  bg-gray-900 text-white text-center justify-center hover:bg-blue-950 cursor-pointer text-[10px] sm:text-[25px] hover:border-b-[1px] border-yellow-600"> <Link href="/events/invitations">  ارسال دعوة </Link></div>
            <div  onClick={()=>{setOnControl(false)
              setWait(true)}} className="flex  h-[50px]  mx-[5px] bg-gray-900 text-white text-center justify-center hover:bg-blue-950 cursor-pointer text-[10px] sm:text-[25px] hover:border-b-[1px] border-yellow-600"  ><Link href="/events/invitations">الدعوات  العامة </Link></div>
            <div  onClick={()=>{setOnControl(false)
              setWait(true)}} className="flex  h-[50px] mx-[5px]  bg-gray-900 text-white text-center justify-center hover:bg-blue-950  cursor-pointer text-[10px] sm:text-[25px] hover:border-b-[1px] border-yellow-600"><Link href="/all-events">كل الفعاليات</Link></div>
               <div  onClick={()=>{setOnControl(false)
              setWait(true)}} className="flex  h-[50px] mx-[5px]  bg-gray-900 text-white text-center justify-center hover:bg-blue-950  cursor-pointer text-[10px] sm:text-[25px] hover:border-b-[1px] border-yellow-600"><Link href="/events/titleOne">الألقاب1</Link></div>
            <div  onClick={()=>{setOnControl(false)
              setWait(true)}} className="flex  h-[50px] mx-[5px]  bg-gray-900 text-white text-center justify-center hover:bg-blue-950  cursor-pointer text-[10px] sm:text-[25px] hover:border-b-[1px] border-yellow-600"><Link href="/events/titleTwo">الألقاب2</Link></div>
            <div  onClick={()=>{setOnControl(false)
              setWait(true)}} className="flex  h-[50px] mx-[5px]  bg-gray-900 text-white text-center justify-center hover:bg-blue-950  cursor-pointer text-[10px] sm:text-[25px] hover:border-b-[1px] border-yellow-600"><Link href="/events/personCat">الفئات</Link></div>
           {(user.role=='مدير')&&(<div  onClick={()=>{setOnControl(false)
          setWait(true)}} className="flex  h-[50px] mx-[5px]  bg-gray-900 text-white text-center justify-center hover:bg-blue-950  cursor-pointer text-[10px] sm:text-[25px] hover:border-b-[1px] border-yellow-600"><Link href="/add-users">إضافة مستخدمين</Link></div>)} 

        </div>)}
        </div>
        <div div className="flex mr-[30px] flex-col relative ml-[50px] cursor-pointer font-[800] text-[15px] 
        sm:text-[25px] text-blue-950 pb-[10px] sm:mr-[150px] z-30"
         onMouseEnter={()=>{setOnEvent(true)}} onMouseLeave={()=>{setOnEvent(false)}}>الفعاليات
        {onevent &&( <div className="bg-yellow-600 w-[140px] h-[2px] absolute left-[-25px] top-[35px]"></div>)}
        {onevent &&(<div className="flex flex-col absolute   bg-gray-900  w-[120px] sm:w-[200px] h-[300px] mt-[40px] ml-[-20px] justify-between rounded shadow-black shadow-md z-20">
            <div onClick={()=>{setOnEvent(false)
              setWait(true)}} className="flex h-[50px]  mx-[5px]  bg-gray-900 text-white text-center justify-center hover:bg-blue-950 cursor-pointer text-[10px] sm:text-[25px] hover:border-b-[1px] border-yellow-600"><Link href="/events">الفعاليات</Link></div>
            <div onClick={()=>{setOnEvent(false)
              setWait(true)}} className="flex  h-[50px]  mx-[5px] bg-gray-900 text-white text-center justify-center hover:bg-blue-950 cursor-pointer text-[10px] sm:text-[25px] hover:border-b-[1px] border-yellow-600"><Link href="/events/places">أماكن الفعاليات</Link></div>
            <div onClick={()=>{setOnEvent(false)
              setWait(true)}} className="flex  h-[50px] mx-[5px]  bg-gray-900 text-white text-center justify-center hover:bg-blue-950  cursor-pointer text-[10px] sm:text-[25px] hover:border-b-[1px] border-yellow-600"> <Link href="/events/chair-categories">فئات الكراسي </Link></div>
            <div onClick={()=>{setOnEvent(false)
              setWait(true)}} className="flex  h-[50px] mx-[5px]  bg-gray-900 text-white text-center justify-center hover:bg-blue-950  cursor-pointer text-[10px] sm:text-[25px] hover:border-b-[1px] border-yellow-600"><Link href="/events/chairs">الكراسي</Link></div>
            <div onClick={()=>{setOnEvent(false)
              setWait(true)}} className="flex  h-[50px] mx-[5px]  bg-gray-900 text-white text-center justify-center hover:bg-blue-950  cursor-pointer text-[10px] sm:text-[25px] hover:border-b-[1px] border-yellow-600"><Link href="/events/invitations-day">  جميع الدعوات </Link> </div>
            <div onClick={()=>{setOnEvent(false)
              setWait(true)}} className="flex  h-[50px] mx-[5px]  bg-gray-900 text-white text-center justify-center hover:bg-blue-950  cursor-pointer text-[10px] sm:text-[25px] hover:border-b-[1px] border-yellow-600"><Link href="/events/invitations-sent">   الدعوات المرسلة </Link> </div>

        </div>)}
        </div>
        
       
    </div>
    )}
    {children}
    </div>
}
 
export default NavBar;
