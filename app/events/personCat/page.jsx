"use client"
import { useState,useEffect } from 'react';
import AddPerspnCat from '../../components/addPersonCat/AddPersonCat'
import {useCntxt} from '../../context/context'
import EditPersonCat from '../../components/EditPersonCat';
import PersonCatTableRow from '../../components/PersonCatTableRow';
import { useRouter } from 'next/navigation';
import Load from '@/app/components/load';
const PersonCat = () => {

    const[wt,setWt]=useState(false)
    const[cats,setCats]=useState([])
    const[eShow,setEShow]=useState(false)
    const[cat,setCat]=useState(null)
    const[mutate,setMutate]=useState(false)
    const[empty,setEmpty]=useState(false)
    const router=useRouter()
    const[connectionError,setConnectionError]=useState()
// import {useCntxt} from '../../context/context'
const {user,setUser,loaded,wait,setWait}=useCntxt()

const[auth,setAuth]=useState(false)
console.log('the user is ',user)
    
useEffect(()=>{
    setWt(true)
    const pls=async()=>{
        const ps=await fetch('/api/personcat').then(res=>res.json()).catch((error)=>{
        setConnectionError(true)    
        // toast.error("خطأ")
    })
        if(ps&&ps.length>0){setCats(ps)}
        else if(ps && ps.length==0){setEmpty(true)}
       setMutate(false) 
       setWt(false)
       setWait(false)
    }
    pls()
},[mutate])
  
    useEffect(()=>{
if(loaded){
  if(!user || !user.name){
      router.push('/')
        }
        else{
            setAuth(true)
        //     if(user && user?.role=="مدير"){
        //         router.push('/add-users')
        //     }
        }
}
    },[loaded])

    const[show,setShow]=useState(false)
    const[onButton,setOnButton]=useState(false)
    return <div className='flex w-screen h-screen flex-col mt-[50px]'>
{connectionError && auth&&(
<div className=" flex w-screen h-screen justify-center items-center">
    <div className="flex justify-center items-center absolute top-[150px] bg-blue-900
     text-red-600 text-[30px] px-[40px] shadow-black shadow-md rounded">ممم حدث خطأ ما . تأكد من جودة الاتصال بالانترنت</div>
</div>
        )} 
        {/* {wt&&(<div className="flex justify-center items-center absolute top-[150px] bg-blue-900 w-[400px] h-[80px] left-[500px] text-white
      text-[30px] px-[40px] shadow-black shadow-md rounded">الرجاء الإنتظار</div>)} */}
 {(wt||wait)&&(<Load/>)}

  {!wt && empty && invetations.length==0 && (
    <div className="flex absolute top-[300px] justify-center items-center w-full h-[40px]
     bg-blue-950 text-yellow-500 text-[30px]">! لا توجد  فئات</div>
)}

{!connectionError &&auth&& ( <div className='flex w-screen h-screen flex-col mt-[50px]'>
    
    <div className='flex flex-col  items-end relative mb-[70px]  '
        onClick={()=>{if(!onButton)setShow(false)}}
        >
            <label htmlFor="" className='flex mr-[50px] text-blue-800 font-[900] text-[25px]'>لوحة التحكم / الفئات</label>
            <div className='flex h-[30px]'></div>
            <button className='flex bg-orange-600 w-[80px] py-[5px] items-center justify-center rounded-md
             shadow-black shadow-sm hover:shadow-md hover:shadow-black hover:text-blue-400 text-white font-[700] text-[20px] mr-[50px]'
            onClick={()=>{setShow(true)}}
            onMouseEnter={()=>{setOnButton(true)}}
            onMouseLeave={()=>{setOnButton(false)}}
            >إضافة</button>
            <div className='flex flex-col sm:flex-row  w-full justify-between 
             border-b-[1px] border-yellow-500 mt-[20px] py-[20px] ' >

            <div className='flex  justify-evenly md:ml-[70px] py-[10px]  shadow-black shadow-md px-[20px] left-[10%] mx-auto w-[80%] sm:w-[45%]'>
                    <input className='bg-blue-950 text-white rounded-md border-b-[1px] text-right px-[5px] h-[30px] border-yellow-300'/>
                    <label htmlFor="" className='flex font-[700] text-[15px] sm:text-[20px] md:text-[25px] md:ml-[50px]'>بحث</label>
                </div>

                <div className='flex  justify-evenly mx-auto w-[80%] sm:w-[45%]   py-[10px] shadow-black shadow-md px-[20px]'>
                    <label htmlFor="" className='flex font-[700] text-[15px] sm:text-[20px] md:text-[25px] md:mr-[50px]'>سجلات</label>
                    <input  min={1} type='number' className='bg-blue-950 w-[90px] text-white rounded-md border-b-[1px] px-[10px] text-[25px] mt-[5px] text-right  h-[30px] border-yellow-300'/>
                    <label className='flex font-[700] text-[15px] sm:text-[20px] md:text-[25px] md:ml-[50px]'>عرض</label>
                </div>
                
            </div>
        </div>
  {show&&(<div className=' flex absolute '><AddPerspnCat Showit={setShow}/></div>)} 
  {eShow&&(<div className=' flex absolute '><EditPersonCat setEShow={setEShow} cat={cat} setMutate={setMutate}/></div>)} 
  {cats&&cats.length>0&&(
    <table  className=" flex flex-col w-full border-[1px] border-black" align="ltr">
<thead className="flex justify-evenly w-full h-[40px] bg-slate-500">
    
   
    <th className="flex-1 bg-blue-950 text-white text-[23px]">اللون</th>
    <th className="flex-1  bg-blue-950 text-white text-[23px]">الاسم</th>
    <th className="flex-1  bg-blue-950 text-white text-[23px]">المعرف</th>
    </thead>
    {cats&&cats.length>0 &&(cats.map(c=>{
        return <tr key={c.id}><PersonCatTableRow cat={c} setEShow={setEShow} setMutate={setMutate} setCat={setCat}/></tr>
    }))}

</table>
  )}
</div>)}
</div>
}
 
export default PersonCat;