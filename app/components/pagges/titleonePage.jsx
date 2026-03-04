"use client"
import { useState,useEffect } from "react"
import TitleN from "../titleone/TitleOne"
import { TiDelete } from "react-icons/ti";
import { MdModeEditOutline } from "react-icons/md";
import TitleNEdit from "../TitleNEdit";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation"
import {useCntxt} from '../../context/context'
import Container from "../Contaner";
import Load from "../load";

const TitleOnePagr = () => {
    const router=useRouter()
    const {user,setUser,loaded,wait,setWait}=useCntxt()
     const[auth,setAuth]=useState(false)
     const[title,setTitle]=useState('')
   const[emptyResult,setEmptyResult]=useState(true)
     useEffect(()=>{
 if(loaded){
   if(!user ||!user?.name){
       router.push('/')
         }
         else{
             setAuth(true)
         }
 }
     },[loaded])


    const[show,setShow]=useState(false)
    const[eShow,setEShow]=useState(false)
    const[onButton,setOnButton]=useState(false)
const[wt,setWt]=useState(false)
const[showDelete,setShowDelete]=useState(false)
const[selectedId,setSelectedId]=useState('')
const [deleting,setDeleting]=useState(false)
const[mutate,setMutate]=useState(false)
const[titles,setTitles]=useState([])
const[selectedTitle,setSelectedTitle]=useState(null)
const[connectionError,setConnectionError]=useState(false)

    useEffect(()=>{
        const pls=async()=>{
            setWt(true)
            // console.log("search term is ",searchTerm)
            // setEmptyResult(false)
            const ps=await fetch(`/api/titleone`).then(res=>{
            
            
            //   if(res.status=='200')  toast('hi')
            setConnectionError(false)
              return  res.json()}).catch((error)=>{
                setConnectionError(true)
                // toast.error("خطأ")
            })
            if(ps){setTitles(ps)
           
            }
            if(ps&& ps.length==0){ setEmptyResult(true)}
            setWt(false)
            setMutate(false)
            setWait(false)
            // setChairId('')
        }
        pls()
        },[mutate])


        const deleteit=async()=>{

            setDeleting(true)
            setShowDelete(false)
            const t=await fetch(`/api/titleone/${selectedId}`,{
                method:'DELETE'
            }
        
            ).then(res=>{
                if(res.status=='200'){
                    setMutate(true)
                    toast.success('تم حذف اللقب')
                   
                }
                else{
                    toast.error('لم يتم الحذف')
                }
                setDeleting(false)
            }).catch(error=>{
            //  alert(error)
            })
        }
    
    return <div>
        <Container>
        {connectionError && auth&&(
<div className=" flex w-screen h-[60px] z-10 absolute justify-center items-center">
    <div className="flex  h-[50px] justify-center items-center absolute top-[-200px] bg-blue-900
     text-red-400 text-[15px] md:text-[30px] px-[40px] shadow-black shadow-md rounded">ممم حدث خطأ ما . تأكد من جودة الاتصال بالانترنت</div>
</div>
        )} 
{/* 
        {wt&&(<div className="flex justify-center items-center absolute top-[150px] bg-blue-900 w-[400px] h-[80px] left-[500px] text-white
      text-[30px] px-[40px] shadow-black shadow-md rounded">الرجاء الإنتظار</div>)} */}
{(wt||wait)&&(<Load/>)}
             {/* {!connectionError &&auth&&(  */}
           {(  <div className='flex flex-col w-full h-full  items-end relative mb-[70px]  '
    // onClick={()=>{if(!onButton)setShow(false)}}
    >
        <label htmlFor="" className='flex mr-[50px] text-blue-800 font-[900] text-[25px]'>لوحة التحكم / اللقب 1</label>
        <div className='flex h-[30px]'>
        <button className='flex bg-orange-600 w-[80px] py-[5px] items-center justify-center rounded-md
         shadow-black shadow-sm hover:shadow-md hover:shadow-black hover:text-blue-400
          text-white font-[700] text-[13px] sm:text-[20px] mr-[50px]'   onClick={()=>{setShow(true)}}
        onMouseEnter={()=>{setOnButton(true)}}
        onMouseLeave={()=>{setOnButton(false)}}
        >إضافة</button></div>
       <div className='flex w-full justify-between  border-b-[1px] border-yellow-500 mt-[20px] py-[20px] ' >

<div className='flex ml-[70px] py-[10px]  shadow-black shadow-md px-[20px] w-[25%]'>
        <input 
        type="text"
        value={title}
        onChange={(e)=>{setTitle(e.target.value)}}
        className='bg-blue-950 text-white rounded-md border-b-[1px] text-right px-[5px] 
        h-[30px] border-yellow-300 w-[80%] '/>
        <label htmlFor="" className='flex font-[700] md:text-[25px] lg:ml-[50px] w-[10%] text-[10px] sm:text-[15px]  lg:text-[25px]  '>بحث</label>
    </div>

    <div className='flex justify-between mr-[50px] py-[10px] w-[40%] sm:w-[35%]
     shadow-black shadow-md px-[20px]'>
        <label htmlFor="" className='flex font-[700] sm:text-[15px] lg:text-[25px] lg:mr-[50px] w-[20%] text-[10px]'>سجلات</label>
        <input  min={1} type='number' className='bg-blue-950 w-[50%] sm:w-[90px] text-white rounded-md
         border-b-[1px] px-[10px] text-[25px] mt-[5px] text-right  h-[30px] border-yellow-300'/>
        <label className='flex font-[700] text-[10px] sm:text-[15px]  lg:text-[25px] lg:ml-[50px] w-[20%]'>عرض</label>
    </div>
    
</div>
        {/*  titles&&titles.length>0 &&(*/}


        {deleting&&(<div className=" flex w-[400px] h-[80px] absolute z-20 left-[550px] top-[100px] bg-blue-950  shadow-black shadow-sm rounded-md text-white justify-center items-center
">...جاري الحذف</div>)}
        {showDelete&&(<div className="flex justify-center flex-col absolute left-[600px] rounded-md p-[30px] top-[200px]  bg-blue-950 ">
  <div className=" flex text-white text-[25px] mb-[30px] justify-center items-center">هل أنت متأكد انك تريد الحذف؟</div>
  <div className="flex justify-between items-center">
      <button className="flex w-[70px] bg-red-700 text-white rounded-sm m-[10px] justify-center items-center  hover:shadow-white hover:shadow-md"
      onClick={()=>{
          setShowDelete(false)
          deleteit()}}
      >نعم</button>
      <button className="flex w-[70px] bg-green-600 text-white rounded-sm m-[10px] justify-center items-center  hover:shadow-white hover:shadow-md"
      onClick={()=>{setShowDelete(false)}}
      >لا</button>
  </div>
</div>)}

        {show&&(<div className="absolute top-[0px]"><TitleN setShow={setShow} setMutate={setMutate} setWt={setWt}/></div> )} 
        {eShow&&(<div className="absolute top-[0px]"><TitleNEdit setEShow={setEShow} tit={selectedTitle} setMutate={setMutate}/></div> )} 
        <table  className=" flex     flex-col mt-[20px] w-[94%] mx-auto  border-[1px] overflow-scroll  justify-start" align="ltr">
        <thead className="flex justify-evenly  h-[40px] bg-blue-950 text-white  ">
    
   
   
    <th className="border-[1px]  flex-1"></th>
    <th className="border-[1px]  flex-1">اللغة </th>
    <th className="border-[1px]  flex-1">اللقب </th>

    <th className="border-[1px]  flex-1">المعرف</th>
    </thead>
    {titles&& titles.length>0&&titles.map(t=>{
        return <div key={t.id} className=" flex w-full justify-between flex-row-reverse h-[40px] border-b-[1px]">
            <div className="flex w-full justify-end items-end bg-blue-950 text-white">{t.id}</div>
            <div className="flex w-full justify-end items-end bg-blue-950 text-white "><div className=" flex mr-[20px]">{t.title}</div></div>
            <div className="flex w-full justify-end items-end bg-blue-950 text-white"><div className=" flex mr-[20px]">{t.lang}</div></div>
            <div className=" flex w-full justify-evenly items-end border-[1px] bg-blue-950">
               <div className=" flex border-[1px] cursor-pointer"> <MdModeEditOutline size={20} color="white"
               onClick={()=>{setSelectedTitle(t)
            setEShow(true)
            }}
               /></div> 
               <div className="flex border-[1px] cursor-pointer "> <TiDelete
               onClick={()=>{setShowDelete(true)
            setSelectedId(t.id)
            }}
               size={20} color="white"/></div>
            </div>
        </div>
    })}
    </table>
    </div>)}
    </Container>
    </div>
}
 
export default TitleOnePagr;