"use client"
import { useState,useEffect } from "react"
import toast from 'react-hot-toast'
import EditEvent from '../components/editEvent/EditEvent'
import TableRow from '../components/TabelRow'
import Eventt from '../components/event/Event'
import Use from '../components/Use'
import TR from "../components/TR"
import { title } from "process"
import { useRouter } from "next/navigation"
import {useCntxt} from '../context/context'
import Load from "../components/load"
import Container from "../components/Contaner"





export const ys=()=>{
    alert("yse")
}
export const no=()=>{
    alert("no")
}
const Events = () => {



    const router=useRouter()
    const {user,setUser,loaded}=useCntxt()
     const[auth,setAuth]=useState(false)
     const[isDeleteing,setIsDeleteing]=useState(false)
     
     useEffect(()=>{
 if(loaded){
   if(!user ||!user?.name){
      router.push('/')
         }
         else{
             setAuth(true)
         }
        //  setAuth(true)
 }
//  setAuth(true)
        
     },[loaded])


    const[show,setShow]=useState(false)
    const[onButton,setOnButton]=useState(false)
const[events,setEvents]=useState([])
const[eShow,setEShow]=useState(false)
const[evtId,setEvtId]=useState('')
const[wait,setWait]=useState(false)
const[innser,setInner]=useState(0)
const[outer,setOuter]=useState(0)
const[evvt,setEvvt]=useState(null)
const[entriesPerPage,setEntriesPerPage]=useState(5)
const[page,setPage]=useState(1)
const[mCount,setMCount]=useState(0)
const[searchTerm,setSearchTerm]=useState('')
const[wt,setWt]=useState(false)
const[mutate,setMutate]=useState(false)
const[title,setTitle]=useState('')
const[emptyResult,setEmptyResult]=useState(false)
const[connectionError,setConnectionError]=useState(false)
// useEffect(()=>{
    
//   setWait(true)
//     const pls=async()=>{
//         const ps=await fetch('/api/event').then(res=>res.json()).catch((error)=>{
//             // toast.error("خطأ")
//         })
//         if(ps){setEvents(ps)
//             setWait(false)
//         }
        
//     }
//     pls()
// },[])

useEffect(()=>{
const pls=async()=>{
    setWt(true)
    console.log("search term is ",searchTerm)
    console.log("fetch from ",`/api/event${searchTerm}`)
    setEmptyResult(false)
    const {events:ps,count}=await fetch(`api/event${searchTerm}`).then(res=>{
        if(res.ok) return res.json()
    else {
        // alert('errr')
throw error
}
    })
    .catch((error)=>{
        setConnectionError(true)
        setWt(false)
        toast.error("خطأ")})
    if(ps){setEvents(ps)
    setMCount(count)
    }
    
    if(ps&& ps.length==0){ setEmptyResult(true)}
    console.log("length is ",ps?.length)
    setWt(false)
    setMutate(false)
    // setChairId('')
}
pls()
},[searchTerm,mutate])


const search=()=>{
    let terms=[]
    let ter=""
   
    if(Number(page)>0){ 
        //
        // alert('pagggge')
    terms.push(`page=${page}`)}
    // alert('search')
    if(Number(entriesPerPage)>0){terms.push(`entriesPerPage=${entriesPerPage}`)}
    if(title.length>0){terms.push(`title=${title}`)}
    // if(name.length>0){terms.push(`name=${name}`)}
    // if(name.length>0){terms.push(`name=${name}`)}
    if(terms.length>0){
        for(var i=0;i<terms.length-1;i++){
             ter=ter+terms[i]+"&"
        }
        ter="?"+ter+terms[terms.length-1]
      
    }
    setSearchTerm(ter)
}
// if(connectionError && auth){console.log("noooooooooooooooooo dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
// return<div className=" flex w-screen h-screen justify-center items-center">
//     <div className="flex justify-center items-center absolute top-[150px] bg-blue-900
//      text-red-600 text-[30px] px-[40px] shadow-black shadow-md rounded">ممم حدث خطأ ما . تأكد من جودة الاتصال بالانترنت</div>
// </div>
// }  
    return <Container>
        {/* <div> */}
        {connectionError && auth&&(
<div className=" flex w-screen h-screen justify-center items-center absolute ">
    <div className="flex justify-center items-center absolute top-[150px] bg-blue-900
     text-yellow-500 py-[5px] text-[10px] sm:text-[20px] md:text-[30px] px-[40px] shadow-black shadow-md rounded">ممم حدث خطأ ما . تأكد من جودة الاتصال بالانترنت</div>
</div>
)}  

{/* {wt &&(<div className='flex justify-center text-center items-center text-white border-[1px]
        border-yellow-400 shadow-md shadow-white bg-blue-800 z-20 w-[400px] h-[100px]  text-[35px] 
        absolute top-[150px] left-[600px]'>الرجاء الانتظار</div>)} */}
        {wt &&(<Load/>)}
   {auth &&(   <div className='flex flex-col w-screen h-screen items-end relative mb-[70px] mt-[250px] '
    // onClick={()=>{if(!onButton)setShow(false)}}
    >

        <label htmlFor="" className='flex mr-[60px] text-blue-800 font-[900] text-[18px] sm:text-[25px]'>الفعاليات/الفعالية</label>
        <div className='flex h-[30px]'>
        <button className='flex bg-orange-600 w-[80px] py-[5px] items-center justify-center rounded-md
         shadow-black shadow-sm hover:shadow-md hover:shadow-black hover:text-blue-400
          text-white font-[700] text-[13px] sm:text-[20px] mr-[50px]'
        onClick={()=>{setShow((prev=>{return !prev}))
    
    }}
        onMouseEnter={()=>{setOnButton(true)}}
        onMouseLeave={()=>{setOnButton(false)}}
        >إضافة</button></div>
        {isDeleteing&&(<div className="flex w-full h-screen absolute">
        
        <div className="flex w-full h-screen absolute bg-black opacity-30 left-0 top-[-20px]"></div>
        <div className='flex w-[80%] left-[10%] md:w-[400px] h-[100px]  bg-blue-950 text-white shadow-md shadow-white rounded-md
 md:left-[600px] top-[100px] justify-center items-center absolute z-30' >جاري الحذف</div>
 </div>
 )}

        <div className='flex w-full justify-between  border-b-[1px] border-yellow-500 mt-[20px] py-[20px] ' >

        <div className='flex ml-[70px] py-[10px]  shadow-black shadow-md px-[20px] w-[25%]'>
                <input 
                type="text"
                value={title}
                onChange={(e)=>{setTitle(e.target.value)}}
                className='bg-blue-950 text-white rounded-md border-b-[1px] text-right px-[5px] 
                h-[30px] border-yellow-300 w-[80%] '/>
                <label htmlFor="" className='flex font-[700]  lg:ml-[25px]
                 w-[10%] text-[10px] sm:text-[15px]  lg:text-[25px]  '>بحث</label>
            </div>

            <div className='flex justify-between mr-[50px] py-[10px] w-[40%] sm:w-[35%]
             shadow-black shadow-md px-[20px]'>
                <label htmlFor="" className='flex font-[700] sm:text-[15px] lg:text-[25px] lg:mr-[50px] w-[20%] text-[10px]'>سجلات</label>
                <input  min={1} type='number' className='bg-blue-950 w-[50%] sm:w-[90px] text-white rounded-md
                 border-b-[1px] px-[10px] text-[25px] mt-[5px] text-right  h-[30px] border-yellow-300'/>
                <label className='flex font-[700] text-[10px] sm:text-[15px]  lg:text-[25px] lg:ml-[50px] w-[20%]'>عرض</label>
            </div>
            
        </div>

        {evtId.length>0 && eShow&&(<EditEvent id={evtId} evvt={evvt} setShow={setEShow} setMutate={setMutate}/>)}
        <table  className=" flex flex-col w-[94%] mx-auto border-[1px] border-black mt-[30px] overflow-scroll" align="ltr">
{/* <thead className="flex  w-full h-[40px] bg-slate-500">
    
    <th className="border-[1px]  flex-1"></th>
    <th className="border-[1px]  flex-1">عددالدعوات العامة</th>
    <th className="border-[1px]  flex-1">عدد الدعوات المرسلة</th>
    <th className="border-[1px]  flex-1">الوقت</th>
   
    <th className="border-[1px]  flex-1">التاريخ</th>
    <th className="border-[1px]  flex-1">الاسم</th>
    <th className="border-[1px]  flex-1">المعرف</th>
    </thead> */}
    <thead className=" flex w-full bg-blue-300  h-[50px] border-b-[1px] border-yellow-500 mb-[2px] shadow-black shadow-sm">
    
    {/* <div className=" flex w-full bg-blue-700  h-[50px] border-[1px] mb-[2px]"> */}
   
    
        <th className="flex flex-1 justify-center  border-b-[1px] text-[10px] md:text-[15px] lg:text-[18px] font-[800] text-blue-800">عددالدعوات العامة</th>
        <th className="flex flex-1 justify-center  border-b-[1px] text-[10px] md:text-[15px] lg:text-[18px] font-[800] text-blue-800">عددالدعوات المرسلة</th>
        <th className="flex flex-1 justify-center  border-b-[1px] text-[10px] md:text-[15px] lg:text-[18px] font-[800] text-blue-800">الوقت</th>
        <th className="flex flex-1 justify-center  border-b-[1px] text-[10px] md:text-[15px] lg:text-[18px] font-[800] text-blue-800">التاريخ</th>
        <th className="flex flex-1  flex-row justify-center border-b-[1px] text-[10px] md:text-[15px] lg:text-[18px] font-[800] text-blue-800">الاسم</th>
        <th className="flex flex-1  flex-row justify-center border-b-[1px] text-[10px] md:text-[15px] lg:text-[18px] font-[800] text-blue-800">المعرف</th>
        {/* </div> */}

</thead>

{/* {events.length>0 && events.map(evt=>{
    return <tr className="flex justify-evenly w-full h-[40px] border-[1px]">
         <td td className="border-[1px]  text-right flex-1 overflow-scroll"><button onClick={()=>{setEvtId(evt.id)
        setEShow(true)
        }}>edit</button></td>
         
         <td td className="border-[1px]  text-right flex-1 overflow-scroll" >{evt.invetations && evt.invetations.length>0&& evt.invetations.filter((inn) => inn.itype=="خارجي").length}</td>
        <td td className="border-[1px]  text-right flex-1 overflow-scroll" >{evt.invetations && evt.invetations.length>0&& evt.invetations.filter((inn) => inn.itype=="داخلي").length}</td>
        <td td className="border-[1px]  text-right flex-1 overflow-scroll">{evt.time}</td>
        <td td className="border-[1px]  text-right flex-1 overflow-scroll" >{evt.date}</td>
        <td td className="border-[1px]  text-right flex-1 overflow-scroll">{evt.title}</td>
        <td td className="border-[1px]  text-right flex-1 overflow-scroll">{evt.id}</td>
    </tr>
    
})} */}
 
<tr>
{events.length>0 && events.map(evt=>{
    return <TR  key={evt.id} cols={[    (evt.invetations && evt.invetations.length>0&& evt.invetations.filter((inn) => inn.itype=="داخلي").length ||0)
    ,(evt.invetations && evt.invetations.length>0&& evt.invetations.filter((inn) => inn.itype=="خارجي").length || 0),
   , evt.time,evt.date
    
    ]} name={evt.title} id={evt.id} setEShow={setEShow} setEvtId={setEvtId} setEvvt={setEvvt} evt={evt} 
    setIsDeleteing={setIsDeleteing} setMutate={setMutate}/>
    
})}

</tr>
{!wt &&  emptyResult && events.length==0 && (
    <div className="flex justify-center items-center w-full h-[40px] bg-blue-950 text-yellow-500 text-[30px]">! لا توجد نتائج مطابقة</div>
)}
{/* <tr>
    
     <TableRow id={1} name={"data"} date={"12-2-2023"} time={"10:34"} sentNumer={5} generalNumber={8} />
    
</tr>

<tr>
    
     <TableRow id={1} name={"data"} date={"12-2-2023"} time={"10:34"} sentNumer={5} generalNumber={8} />
    
</tr> */}



</table>
{/* <Use/> */}
{ show&&(<Eventt setShow={setShow} setMutate={setMutate}/>)}
    </div>
    )}
    {/* </div> */}
    </Container>
}
 
export default Events ;