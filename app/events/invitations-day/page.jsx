"use client"
import { useEffect, useState } from "react"
import InvitForm from "../../components/InviteFotm/InvitForn"
import EditInvetation from "../../components/EditInvitation/EditInvetation"
import EditInternalInvetation from "../../components/editInternalInvetation/EditInternalInvetation"
import ChairBook from '../../components/chairBook'
import InvitationsDayRow from '../../components/Invitations-dayRow'
import { Checkbox } from "@mui/material"
import {useCntxt} from '../../context/context'
import { useRouter } from "next/navigation"
import Container from "../../components/Contaner"
import {toast} from 'react-hot-toast'
import Load from "@/app/components/load"
import BadConnection from "@/app/components/badConnection"
const InvitationsDay = () => {
    const[entriesPerPage,setEntriesPerPage]=useState(5)
    const[page,setPage]=useState(1)
    const[total,setTotal]=useState(10)
// import {useCntxt} from '../../context/context'
const router=useRouter()
const {user,setUser,loaded,wait,setWait}=useCntxt()
 const[auth,setAuth]=useState(false)
const[connectionError,setConnectionError]=useState(false)
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
    const[IEShow,setIEShow]=useState(false)
    const[book,setBook]=useState(false)
const[customer,setCustomer]=useState('')
    const[onButton,setOnButton]=useState(false)
    const[invetations,setInvetations]=useState([])
    const[wt,setWt]=useState(true)
const[whatsapp,setWhatsapp]=useState('')
    const[invId,setInvId]=useState('')
    const[chairs,setChairs]=useState([])
    const[expand,setExpand]=useState(false)
    const [co,setCo]=useState("#555")
    const[email,setEmail]=useState('')
    const [categories,setCategories]=useState([])
    const[selectedCategory,setSelectedCatedgory]=useState('')
    const [events,setEvents]=useState([])
    const[selectedEvent,setSelectedEvent]=useState('')
    const[personCats,setPersonCats]=useState([])
    const[selectedPersonCat,setSelectedPersonCat]=useState('')
    const[searchTerm,setSearchTerm]=useState('')
    const[mutate,setMutate]=useState(false)
    const[itype,setIType]=useState('')
    const[empty,setEmpty]=useState(false)
    useEffect(()=>{
       
        const pls=async()=>{
            setWt(true)
            setEmpty(false)
            const {inv:ps,count}=await fetch(`/api/invetation${searchTerm}`).then(res=>{
                if(!res.ok) {throw Error("no connection")}
              return  res.json()
           })
            .catch((error)=>{
                setConnectionError(true)
                setWt(false)
                setWait(false)
                toast.error("خطأ")})
            if(ps){setInvetations(ps)
            setTotal(count)
            setWait(false)
            setWt(false)
            }
            if(ps.length==0){ setEmpty(true)}
            // setWt(false)
            // setWait(false)
            setMutate(false)
        }
        pls()
    },[searchTerm,mutate])

    useEffect(()=>{
    const cts=async()=>{
        const cs=await fetch('/api/category').then(res=>res.json())
        if(cs){setCategories(cs)}
    }
    cts()
},[])

const reset=()=>{
    setSelectedCatedgory('')
   
    setSelectedEvent('')
    setSelectedPersonCat('')
    setEmail('')
    
    setIType('')
    setSearchTerm('')
}
// useEffect(()=>{
//     setWait(true)
//     const pls=async()=>{
//         const ps=await fetch('/api/invetation').then(res=>res.json()).catch((error)=>{toast.error("خطأ")}).finally(setWait(false))
//         if(ps){setInvetations(ps)}
//         setMutate(false)
//     }
//     pls()
// },[mutate])

useEffect(()=>{
    const cts=async()=>{
        const {events:cs}=await fetch('/api/event').then(res=>res.json())
        if(cs){setEvents(cs)}
    }
    cts()
},[])

useEffect(()=>{
    const cts=async()=>{
        const cs=await fetch('/api/personcat').then(res=>res.json())
        if(cs){setPersonCats(cs)}
    }
    cts()
},[])


useEffect(()=>{
    search()
},[page])

console.log(invetations)
   
const search=()=>{
    let terms=[]
    let ter=""
    if(selectedCategory.length>0){terms.push(`chaircategory=${selectedCategory}`)}

    if(selectedPersonCat.length>0){terms.push(`categoryId=${selectedPersonCat}`)}
    if(name.length>0){terms.push(`name=${name}`)}
    if(email.length>0){terms.push(`email=${email}`)}
    if(itype.length>0){terms.push(`itype=${itype}`)}
    if(selectedEvent.length>0){terms.push(`eventId=${selectedEvent}`)}

    if(Number(page)>0){ 
        //
        // alert('pagggge')
    terms.push(`page=${page}`)}
    // alert('search')
    if(Number(entriesPerPage)>0){terms.push(`entriesPerPage=${entriesPerPage}`)}

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
    return <div>
        <Container>
        {connectionError && auth&&(
           
<div className=" flex w-screen h-screen justify-center items-center">
    {/* <div className="flex justify-center items-center absolute top-[150px] bg-blue-900
     text-red-600 text-[30px] px-[40px] shadow-black shadow-md rounded">ممم حدث خطأ ما . تأكد من جودة الاتصال بالانترنت</div> */}
 <BadConnection/>
</div>
        )} 
      
        {/* {wt&&(<div className="flex justify-center items-center absolute top-[150px] bg-blue-900 w-[400px] h-[80px] left-[500px] text-white
      text-[30px] px-[40px] shadow-black shadow-md rounded">الرجاء الإنتظار</div>)} */}

{wt||wait&&(<Load/>)}

          {!wt && empty && invetations.length==0 && (
    <div className="flex absolute top-[300px] justify-center items-center w-full h-[40px]
     bg-blue-950 text-yellow-500 text-[30px]">! لا توجد  دعوات</div>
)}
        {!connectionError &&auth&& (    <div className='flex flex-col w-screen h-screen items-end relative mb-[70px]  '
    // onClick={()=>{if(!onButton)setShow(false)}}
    >
        <label htmlFor="" className='flex  text-blue-800 font-[900] text-[25px] mr-[100px]'>لوحة التحكم /إرسال الدعوات</label>
        <div className='flex h-[100px] mb-[30px]'>
        <button className='flex bg-orange-600 w-[80px] py-[5px] items-center justify-center rounded-md
         shadow-black shadow-sm hover:shadow-md hover:shadow-black hover:text-blue-400 text-white 
         font-[700] text-[20px] mr-[100px] mt-[60px]'
         onClick={()=>{setShow((prev=>{return !prev}))}}
        onMouseEnter={()=>{setOnButton(true)}}
        onMouseLeave={()=>{setOnButton(false)}}
       
       >إضافة</button></div>
<div className="flex w-full h-[3px] bg-yellow-500 mt-[10px]"></div>
{invId.length>0 && eShow&&(<EditInvetation  key={invId} id={invId} setShow={setEShow}  setMutate={setMutate}  inv={ invetations.filter(invi=>invi.id==invId)[0]}/>)}
{invId.length>0 && IEShow&&(<EditInternalInvetation key={invId} id={invId} setShow={setIEShow}  setMutate={setMutate} inv={ invetations.filter(invi=>invi.id==invId)[0]}/>)}

{invId.length>0 && book&&(<ChairBook id={invId} chairs={chairs} setBook={setBook} setMutate={setMutate}/>)}

{/* {invId.length>0 &&(<InvitForm />)} */}
<div className="flex w-[50%] justify-end mr-[90px] cursor-pointer hover:text-yellow-400"
            onClick={()=>{reset()}}
            >تفريغ حقول التصفية</div>
        {/* <div className="flex w-full h-[3px] bg-yellow-500 mt-[10px]"></div> */}
        {/* {invetations&&invetations.length>0&&( */}
            {(
        <div className='flex flex-col w-full justify-between  border-b-[1px] border-yellow-500 mt-[20px] py-[20px] ' >

        {/* <div className="flex  justify-evenly">
            
           
            <label className="flex w-[50%] justify-end mr-[100px]" htmlFor="">بحث</label>
        </div> */}




        <div className='flex flex-col w-full justify-between  border-b-[1px] border-yellow-500 mt-[20px] py-[20px] ' >

<div className="flex  justify-evenly">
    
   
    <label className="flex w-[50%] justify-end mr-[100px]" htmlFor="">بحث</label>
</div>
<div className="flex w-[100%]  justify-end mt-[30px]  mx-[10px]">


<div className="flex flex-col w-[100px]  sm:w-[24%] ml-[80px] items-end">
<label className=" text-right text-[11px] md:text-[20px]">الاسم</label>
<input 

value={name}
onChange={(e)=>{setName(e.target.value)}}
className="flex border-[1px] text-right w-[100px] sm:w-[90%] h-[30px]"/>

</div>
<div className="flex flex-col w-[25%] items-end">
<label className=" text-right text-[11px] md:text-[20px] ">البريد الالكتروني</label>
<input
value={email}
onChange={(e)=>{setEmail(e.target.value)}}
className="flex border-[1px] text-right w-[100px] sm:w-[90%] h-[30px]"/>

</div>
<div className="flex flex-col w-[25%] items-end  ">
<label className=" text-right text-[11px] md:text-[20px]">فئة الكرسي</label>
<select 
value={selectedCategory} onChange={(e)=>{setSelectedCatedgory(e.target.value)}}
className="flex border-[1px] w-[100px] sm:w-[90%] h-[30px] text-right text-[11px] md:text-[20px]">
<option value="" className="text-[11px] md:text-[20px]">اختر فئة الكرسي</option>
{categories.length>0 && categories.map(ctg=>{
return<option key={ctg.id} value={ctg.title}>{ctg.title}</option>
})}
</select>

</div>

<div className="flex flex-col mr-[30px] sm:mr-[80px] w-[25%] items-end ">
<label className=" text-right text-[11px] md:text-[20px]">نوع الدعوة</label>
<select className="flex border-[1px] w-[100px] sm:w-[90%] h-[30px] text-right"></select>

</div>
</div>


<div className="flex w-[100%]  justify-end mt-[30px]  mx-[10px]">


<div className="flex flex-col w-[100px]  sm:w-[24%] ml-[80px] items-end">
<label className=" text-right text-[11px] md:text-[20px]">الفعالية</label>
<select
value={selectedEvent} onChange={(e)=>{setSelectedEvent(e.target.value)}}
className="flex border-[1px] w-[100px] sm:w-[90%] h-[30px] text-right text-[11px] md:text-[20px]">
<option value="" className="text-[11px] md:text-[20px]"

>اختر فعالية</option>
{events.length>0 && events.map(ctg=>{
return<option key={ctg.id} value={ctg.title}>{ctg.title}</option>
})}
</select>
{/* onChange={(e)=>{setName(e.target.value)}}
className="flex border-[1px] text-right w-[100px] sm:w-[90%] h-[30px]"/> */}

</div>
<div className="flex flex-col w-[25%] items-end  ">
<label className=" text-right text-[11px] md:text-[20px]">داخلي/خارجي</label>
<select
value={itype}
onChange={(e)=>{setIType(e.target.value)}}
className="flex border-[1px] w-[100px]  sm:w-[90%] h-[30px] text-right text-[11px] md:text-[20px]">

<option value=""  className="text-[11px] md:text-[20px]">مصدر الدعوة</option>
<option value="داخلي">داخلي</option>
<option value="خارجي">خارجي</option>
</select>
{/* onChange={(e)=>{setName(e.target.value)}}
className="flex border-[1px] text-right w-[100px] sm:w-[90%] h-[30px]"/> */}

</div>

<div className="flex flex-col w-[25%] items-end  ">
<label className=" text-right text-[11px] md:text-[20px]">الفئة</label>
<select 
value={selectedPersonCat} onChange={(e)=>{setSelectedPersonCat(e.target.value)}}
className="flex border-[1px] w-[100px] sm:w-[90%] h-[30px] text-right text-[11px] md:text-[20px]">
<option value="" className="text-[11px] md:text-[20px]">اختر فئة المدعو</option>
{personCats.length>0 && personCats.map(ctg=>{
return<option key={ctg.id} value={ctg.title}>{ctg.title}</option>
})}
</select>

</div>

<div className="flex flex-col mr-[30px] sm:mr-[80px] w-[25%] items-end">
<label className="  text-right text-[11px] md:text-[20px]">رقم الجوال</label>
<input 
value={whatsapp} onChange={(e)=>{setWhatsapp(e.target.value)}}
className="flex border-[1px] text-right w-[100px] sm:w-[90%] h-[30px]"/>

</div>
</div>



{/* <div className="flex w-[100%]  justify-end mt-[30px] mx-[10px]  ">
<div className="flex flex-col mr-[30px] sm:mr-[80px] w-[25%] items-end" >
<label className=" text-right text-[11px] md:text-[20px]">الفعالية</label>
<select
value={selectedEvent} onChange={(e)=>{setSelectedEvent(e.target.value)}}
className="flex border-[1px] w-[100px] sm:w-[90%] h-[30px] text-right text-[11px] md:text-[20px]">
<option value="" className="text-[11px] md:text-[20px]">اختر فعالية</option>
{events.length>0 && events.map(ctg=>{
return<option key={ctg.id} value={ctg.title}>{ctg.title}</option>
})}
</select>

</div>
<div className="flex flex-col mr-[30px] sm:mr-[80px] w-[25%] items-end">
<label className=" text-right text-[11px] md:text-[20px]">داخلي/خارجي</label>
<select className="flex border-[1px] w-[100px] sm:w-[90%] h-[30px] text-right text-[11px] md:text-[20px]"
value={itype}
onChange={(e)=>{setIType(e.target.value)}}
>




<option value=""  className="text-[11px] md:text-[20px]">مصدر الدعوة</option>
<option value="داخلي">داخلي</option>
<option value="خارجي">خارجي</option>

</select>

</div>
<div className="flex flex-col mr-[30px] sm:mr-[80px] w-[25%] items-end">
<label className=" text-right text-[11px] md:text-[20px] ">الفئة</label>
<select 
value={selectedPersonCat} onChange={(e)=>{setSelectedPersonCat(e.target.value)}}

className="flex border-[1px] w-[100px] sm:w-[90%] h-[30px] text-right text-[11px] md:text-[20px]">
<option value="" className="text-[11px] md:text-[20px]">اختر فئة المدعو</option>
{personCats.length>0 && personCats.map(ctg=>{
return<option key={ctg.id} value={ctg.title}>{ctg.title}</option>
})}
</select>

</div>
<div className="flex flex-col mr-[30px] sm:mr-[80px] w-[25%] items-end">
<label className="  text-right text-[11px] md:text-[20px]">رقم الجوال</label>
<input 
value={whatsapp} onChange={(e)=>{setWhatsapp(e.target.value)}}
className="flex border-[1px] text-right w-[100px] sm:w-[90%] h-[30px]"/>

</div>
</div> */}



<div className="flex justify-between w-full flex-row-reverse">
<div className="flex justify-end w-[15%] mt-[20px] sm:w-[30%]  ">
<button className="flex sm:w-[70px] py-[5px] bg-orange-700 text-[12px] sm:text-[16px]
text-white sm:font-[700] mr-[20px] sm:mr-[100px] justify-center rounded px-[3px]
shadow-black shadow-md
"

onClick={()=>{search()

}}
>اذهب</button>

</div>

<div className=" flex justify-between  w-[80%] sm:w-[60%] ">
<div className=" flex justify-between items-end flex-row-reverse text-[12px] sm:text-[16px] ml-[60px]">
<label>عرض</label>
<input
className="flex w-[60px] mx-[10px] justify-center h-[30px] items-center outline-none border-b-[1px] border-yellow-500 text-center"
type="number" value={entriesPerPage} onChange={(e)=>{setEntriesPerPage(e.target.value)}}></input>
<label>سجلات</label>
</div>

<div className="flex justify-between items-center mt-[20px]">
<button className="glex text-[12px] sm:text-[16px] px-[12px] sm:w-[70px]  h-[30px] justify-center items-center bg-orange-700 text-white rounded-md shadow-black shadow-md"
onClick={()=>{
if(page-1>0){
setPage(prev=>prev-1)
// search()
}
}}
disabled={wt}>السابق</button>
<input type="text" disabled={true} value={page+"/"+Math.ceil(total/entriesPerPage)} className="flex w-[60px] mx-[10px] justify-center h-[30px] items-center outline-none border-b-[1px] border-yellow-500 text-center"/>
<button className="glex text-[12px] sm:text-[16px] px-[12px] sm:w-[70px]  h-[30px] justify-center items-center bg-orange-700 text-white rounded-md  shadow-black shadow-md"
onClick={()=>{
if((entriesPerPage*page)+1<=total){
setPage(prev=>prev+1)
// search()
}
}}
disabled={wt}

>التالي</button>
</div>
</div>
</div>
</div>



 

        </div>
        )}
{show && <InvitForm tog={setShow}/>}

        <table  className=" flex flex-col w-full border-[1px] border-black" align="ltr">
        <thead className="flex justify-evenly w-full h-[40px] bg-blue-950 text-white ">
    
   
    <th className="border-[1px]  flex-1 text-[9px] sm:text-[13px] lg:text-[16px]">هل حضر  الفعالية</th>
    <th className="border-[1px]  flex-1 text-[9px] sm:text-[13px] lg:text-[16px]">الفئة</th>
    <th className="border-[1px]  flex-1 text-[9px] sm:text-[13px] lg:text-[16px]">رمز المقعد</th>
    <th className="border-[1px]  flex-1 text-[9px] sm:text-[13px] lg:text-[16px]">نوع الدعوة</th>
    <th className="border-[1px]  flex-1 text-[9px] sm:text-[13px] lg:text-[16px]">البريد الالكتروني</th>
    <th className="border-[1px]  flex-1 text-[9px] sm:text-[13px] lg:text-[16px]">رقم الجوال</th>
    <th className="border-[1px]  flex-1 text-[9px] sm:text-[13px] lg:text-[16px]">الاسم</th>

    <th className="border-[1px]  flex-1 text-[9px] sm:text-[13px] lg:text-[16px]">المعرف</th>
    </thead>

    {/* {wt &&(<div className="flex absolute w-[500px] h-[100px] left-[500px] top-[100px] justify-center items-center 
text-[25px] text-white bg-blue-800 shadow-black rounded-md shadow-md">الرجاء الإنتظار</div>)} */}

{invetations.length>0 && invetations.map(inv=>{
    
    return<tr key={inv.id}>
   
    <InvitationsDayRow inv={inv} setInvId={setInvId} setEShow={setEShow} setIEShow={setIEShow} setBook={setBook} setChairs={setChairs} />
    </tr>})}
    {!wt &&  empty && invetations.length==0 && (
    <div className="flex justify-center items-center w-full h-[40px] bg-blue-950 text-yellow-500 text-[30px]">! لا توجد نتائج مطابقة</div>
)}
{/* book is {book?"true":"false"} */}
</table>

    </div>)}
    </Container>
    </div>
}
 
export default InvitationsDay;

/*

           <div className="flex justify-end mt-[30px] mx-[20px]">


            <div className="flex flex-col w-[25%] ml-[80px] items-end">
<label className=" text-right">الاسم</label>
    <input className="flex border-[1px] text-right"/>
    
</div>
<div className="flex flex-col w-[25%] items-end">
<label className=" text-right">البريد الالكتروني</label>
    <input className="flex border-[1px] text-right"/>
   
</div>
<div className="flex flex-col w-[25%] items-end mr-[100px]">
<label className=" text-right">فئة الكرسي</label>
<select 
value={selectedCategory} onChange={(e)=>{setSelectedCatedgory(e.target.value)}}
className="flex border-[1px] w-[210px] h-[30px] text-right">
    <option value="">اختر فئة الكرسي</option>
    {categories.length>0 && categories.map(ctg=>{
        return<option key={ctg.id} value={ctg.title}>{ctg.title}</option>
    })}
</select>

</div>

<div className="flex flex-col mr-[80px]">
<label className=" text-right">نوع الدعوة</label>
<select className="flex border-[1px] w-[210px] h-[30px] text-right"></select>

</div>
            </div>


            <div className="flex  mt-[10px] justify-end">
<div className="flex flex-col w-[25%] ml-[100px] items-end">
<label className=" text-right">الفعالية</label>
<select
value={selectedEvent} onChange={(e)=>{setSelectedEvent(e.target.value)}}
className="flex border-[1px] w-[210px] h-[30px] text-right">
    <option value="">اختر فعالية</option>
    {events.length>0 && events.map(ctg=>{
        return<option key={ctg.id} value={ctg.title}>{ctg.title}</option>
    })}
</select>

</div>
<div className="flex flex-col w-[25%] items-end">
<label className=" text-right">داخلي/خارجي</label>
<select className="flex border-[1px] w-[210px] h-[30px] text-right text-black"
value={itype}
onChange={(e)=>{setIType(e.target.value)}}
>
<option value="">مصدر الدعوة</option>
<option value="داخلي">داخلي</option>
<option value="خارجي">خارجي</option>

</select>
    
</div>
<div className="flex flex-col w-[25%] items-end mr-[100px]">
<label className=" text-right">الفئة</label>
<select 
value={selectedPersonCat} onChange={(e)=>{setSelectedPersonCat(e.target.value)}}

className="flex border-[1px] w-[210px] h-[30px] text-right">
    <option value={""}>اختر فئة المدعو</option>
   {personCats.length>0 && personCats.map(ctg=>{
        return<option key={ctg.id} value={ctg.title}>{ctg.title}</option>
    })}
</select>
   
</div>
<div className="flex flex-col mr-[100px]">
<label className=" text-right">رقم الجوال</label>
    <input className="flex border-[1px] text-right"/>
    
</div>
            </div>
            <div className="flex justify-between w-full flex-row-reverse">
<div className="flex justify-end mt-[20px] w-[30%]">
<button className="flex w-[70px] py-[5px] bg-orange-700
 text-white font-[700] mr-[100px] justify-center rounded
 shadow-black shadow-md
 "
 
 onClick={()=>{search()

}}
 >اذهب</button>

</div>

<div className=" flex justify-between w-[60%]">
<div className=" flex justify-between items-end flex-row-reverse ml-[60px]">
    <label>عرض</label>
    <input
    className="flex w-[60px] mx-[10px] justify-center h-[30px] items-center outline-none border-b-[1px] border-yellow-500 text-center"
    type="number" value={entriesPerPage} onChange={(e)=>{setEntriesPerPage(e.target.value)}}></input>
    <label>سجلات</label>
</div>

<div className="flex justify-between items-center mt-[20px]">
<button className="glex w-[70px] h-[30px] justify-center items-center bg-orange-700 text-white rounded-md shadow-black shadow-md"
onClick={()=>{
    if(page-1>0){setPage(prev=>prev-1)
        // search()
    }
    }}
disabled={wt}
>السابق</button>
<input type="text" disabled={true} value={page+"/"+Math.ceil(total/entriesPerPage)}  className="flex w-[60px] mx-[10px] justify-center h-[30px] items-center outline-none border-b-[1px] border-yellow-500 text-center"/>
<button className="glex w-[70px]  h-[30px] justify-center items-center bg-orange-700 text-white rounded-md  shadow-black shadow-md"
onClick={()=>{
    if((entriesPerPage*page)+1<=total){
    setPage(prev=>prev+1)
    // search()
}
}}

disabled={wt}
>التالي</button>
</div>
</div>
</div>
*/