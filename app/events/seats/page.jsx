


"use client"
import { useEffect, useState } from "react"
import InvitForm from "../../components/InviteFotm/InvitForn"
import EditInvetation from "../../components/EditInvitation/EditInvetation"
import ChairBook from '../../components/chairBook'
import InvitationsDayRow from '../../components/Invitations-dayRow'
import SeatsRow from '../../components/SeatsRow'
import { Checkbox } from "@mui/material"
import {useCntxt} from '../../context/context'
import EditChair from '../../components/EditChair'
import { toast } from "react-hot-toast";
import Load from "@/app/components/load"

const Seats = () => {
const[entriesPerPage,setEntriesPerPage]=useState(5)
const[page,setPage]=useState(1)
const[total,setTotal]=useState(10)
// import {useCntxt} from '../../context/context'
const {user,setUser,loaded,wait,setWait}=useCntxt()
console.log('the user is ',user)
    
  
    useEffect(()=>{
if(loaded){
  if(!user ){
      router.push('/')
        }
        
}
    },[loaded])
    
    const[show,setShow]=useState(false)
    const[eShow,setEShow]=useState(false)
   
    const[book,setBook]=useState("false")
// const[customer,setCustomer]=useState('')
    // const[onButton,setOnButton]=useState(false)
    const[invetations,setInvetations]=useState([])
    const[wt,setWt]=useState(true)
const[name,setName]=useState('')
const[chairId,setChairId]=useState('')
    // const[invId,setInvId]=useState('')
    const[chairs,setChairs]=useState([])
    const[selectedChair,setSelectedChair]=useState(null)
    // const[expand,setExpand]=useState(false)
    const [co,setCo]=useState("#555")
    // const[email,setEmail]=useState('')
    const [categories,setCategories]=useState([])
    const[selectedCategory,setSelectedCatedgory]=useState('')
    const [events,setEvents]=useState([])
    const[selectedEvent,setSelectedEvent]=useState('')
    //  const[personCats,setPersonCats]=useState([])
    const[selectedPersonCat,setSelectedPersonCat]=useState('')
    const[searchTerm,setSearchTerm]=useState('')
    const[mutate,setMutate]=useState(false)
    const[itype,setIType]=useState('')
    const[empty,setEmpty]=useState('')
    const[emptyResult,setEmptyResult]=useState(false)
    const[mCount,setMCount]=useState(0)
    useEffect(()=>{
       
        const pls=async()=>{
            setWt(true)
            console.log("search term is ",searchTerm)
            setEmptyResult(false)
            const {chrs:ps,count}=await fetch(`/api/hl${searchTerm}`).then(res=>res.json()).catch((error)=>{toast.error("خطأ")})
            if(ps){setChairs(ps)
            setMCount(count)
            }
            if(ps&& ps.length==0){ setEmptyResult(true)}
            setWt(false)
            setWait(false)
            setMutate(false)
            setChairId('')
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
useEffect(()=>{
    if (chairId){
        if(chairs && chairs.length>0){
            setSelectedChair(chairs.filter(chr => chr.id==chairId)[0])
        }
    }
},[chairId])
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
        const {events:cs,count}=await fetch('/api/event').then(res=>res.json()).catch(error=>{
            toast.error("aaa")
        })
        console.log('cs is     ----------------------',cs)
        if(cs){setEvents(cs)}
    }
    cts()
},[])

// useEffect(()=>{
//     const cts=async()=>{
//         const cs=await fetch('/api/personcat').then(res=>res.json())
//         if(cs){setPersonCats(cs)}
//     }
//     cts()
// },[])

console.log(invetations)
   
const search=()=>{
    let terms=[]
    let ter=""
    if(selectedCategory.length>0){terms.push(`chaircategory=${selectedCategory}`)}

    if(selectedPersonCat.length>0){terms.push(`categoryId=${selectedPersonCat}`)}
    if(name.length>0){terms.push(`name=${name}`)}
    if(empty.length>0){terms.push(`${empty}`)}
    if(Number(page)>0){ 
        //
        // alert('pagggge')
    terms.push(`page=${page}`)}
    // alert('search')
    if(Number(entriesPerPage)>0){terms.push(`entriesPerPage=${entriesPerPage}`)}
    if(selectedEvent.length>0){terms.push(`eventId=${selectedEvent}`)}
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
    
return   <div className='flex flex-col h-screen  items-end relative mb-[70px]  '
    // onClick={()=>{if(!onButton)setShow(false)}}
    >
       {eShow &&  <EditChair chairId={chairId} setMutate={setMutate} setEShow={setEShow} chair={selectedChair} />}
        <label htmlFor="" className='flex  text-blue-800 font-[900] text-[25px] mr-[100px]'>لوحة التحكم /الكراسي</label>
        <div className='flex h-[30px]'></div>
        <button className='flex bg-orange-600 w-[80px] py-[5px] items-center justify-center rounded-md
         shadow-black shadow-sm hover:shadow-md hover:shadow-black hover:text-blue-400 text-white font-[700] text-[20px] mr-[100px]'
        onClick={()=>{setShow((prev=>{return !prev}))}}
        onMouseEnter={()=>{setOnButton(true)}}
        onMouseLeave={()=>{setOnButton(false)}}
       
       >إضافة</button>
<div className="flex w-full h-[3px] bg-yellow-500 mt-[10px]"></div>
{/* {invId.length>0 && eShow&&(<EditInvetation id={invId} setShow={setEShow}  setMutate={setMutate}  inv={invetations.filter(invi=>invi.id==invId)[0]}/>)}
{invId.length>0 && IEShow&&(<EditInternalInvetation id={invId} setShow={setIEShow}  setMutate={setMutate}/>)}

{invId.length>0 && book&&(<ChairBook id={invId} chairs={chairs} setBook={setBook} customer={customer}/>)} */}

{/* {invId.length>0 &&(<InvitForm />)} */}
   
        {/* <div className="flex w-full h-[3px] bg-yellow-500 mt-[10px]"></div> */}

        <div className='flex flex-col w-full justify-between  border-b-[1px] border-yellow-500 mt-[20px] py-[20px] ' >

        <div className="flex  justify-evenly">
            
            <div 
            onClick={()=>{
                setSelectedCatedgory('')
                setName('')
                setEmpty('')
                setSelectedEvent('')
                setSearchTerm('')}}
            className="flex w-[50%] justify-end mr-[90px] cursor-pointer hover:text-yellow-400" >تفريغ حقول التصفية</div>
            <label className="flex w-[50%] justify-end mr-[100px]" htmlFor="">بحث</label>
        </div>
            <div className="flex justify-end mt-[30px] mx-[20px]">


  
            <div className="flex flex-col w-[20%] ml-[20px] items-end">
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


<div className="flex flex-col items-end ml-[80px] w-[20%]">
<label className=" text-right">حالة الكرسي</label>
<select
value={empty}
onChange={(e)=>{setEmpty(e.target.value)}}
className="flex border-[1px] w-[210px] h-[30px] text-right">
    
<option value="">اختر حالة</option>
    <option value="empty=true">فارغ</option>
    <option value="empty=false">محجوز</option>
</select>

</div>

<div className="flex flex-col w-[20%] items-end ml-[20px]">
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

<div className="flex flex-col w-[20%] ml-[80px] items-end">
<label className=" text-right">المدعو</label>
    <input 
    value={name}
    onChange={(e)=>{setName(e.target.value) }}
    className="flex border-[1px] text-right"/>
    
</div>
            </div>
            <div className="flex justify-end">
<div className=" flex justify-between w-[20%] mr-[20px]">
<label>سجلات</label>
    <input type="number" 
    value={entriesPerPage}
    onChange={(e)=>{setEntriesPerPage(e.target.value)}}
    className=" flex w-[50px] border-[1px]"/>
    <label>عرض</label>
   
</div>
</div>
<div className="flex justify-end mt-[20px]">
<div className=" flex justify-between w-[20%] mr-[20px]">
<label className=" flex justify-center items-center text-white bg-blue-950 rounded-md cursor-pointer w-[70px] py-[3px]"
onClick={()=>{
    if((entriesPerPage*page)+1<=mCount)
    {
        setPage(prev=>prev+1)
search()
    }
    // setMutate(true)
}}

>التالي</label>
    <label className=" flex bg-blue-950 px-[10px] text-white rounded-md">{page}</label>
    <label  className=" flex justify-center items-center text-white bg-blue-950 rounded-md cursor-pointer w-[70px] py-[3px]"
    onClick={()=>{
        if(page-1>0){
            setPage(prev=>prev-1)
           search()
        }
        // setMutate(true)
    }}
    >السابق</label>
   
</div>
</div>
           
            <div className="flex justify-end mt-[20px]">
            <button className="flex w-[70px] py-[5px] bg-orange-700
             text-white font-[700] mr-[100px] justify-center rounded
             shadow-black shadow-md
             "
             
             onClick={()=>{
                search()
                // alert(page)
           
            }}
             >اذهب</button>

            </div>
        </div>
{show && <InvitForm tog={setShow}/>}

        <table  className=" flex     flex-col  w-full border-[1px] border-black overflow-scroll h-[500px] justify-start" align="ltr">
        <thead className="flex justify-evenly  h-[40px] bg-blue-950 text-white  ">
    
   
    <th className="border-[1px]  flex-1"> حالة الكرسي</th>
    <th className="border-[1px]  flex-1">فئة الكرسي </th>
    <th className="border-[1px]  flex-1">المدعو </th>
    <th className="border-[1px]  flex-1">رمز الكرسي</th>

    <th className="border-[1px]  flex-1">المعرف</th>
    </thead>
{/* 
    {wt &&(<div className="flex absolute w-[500px] h-[100px] left-[500px] top-[100px] justify-center items-center 
text-[25px] text-white bg-blue-800 shadow-black rounded-md shadow-md">الرجاء الإنتظار</div>)} */}

{(wt||wait)&&(<Load)}
{/* {invetations.length>0 && invetations.map(inv=>{
    return <tr className="flex justify-evenly w-full h-[40px] border-[1px]">
         <td td className="border-[1px]  text-right flex-1 overflow-scroll"><button onClick={()=>{setInvId(inv.id)
        setEShow(true)
        }}>edit</button>
        
        <button onClick={()=>{setInvId(inv.id)
        setChairs(inv.event.place.chairs)
        // alert(inv.event.place.name)
        setBook(true)
        setCustomer(inv.name)
        }}>book</button>
        </td>
         <td td className="border-[1px]  text-right flex-1 overflow-scroll">{inv.eventId}</td>
    <td td className="border-[1px]  text-right flex-1 overflow-scroll">{inv.itype}</td>
        <td td className="border-[1px]  text-right flex-1 overflow-scroll">{inv.istate}</td>
        <td className="border-[1px] text-right flex-1 overflow-scroll">{inv.email}</td>
        <td td className="border-[1px]  text-right flex-1 overflow-scroll" >{inv.whatsapp}</td>
        <td td className="border-[1px]  text-right flex-1 overflow-scroll">{inv.name}</td>
        <td td className="border-[1px]  text-right flex-1 overflow-scroll" >{inv.createdDate}</td>
        <td td className="border-[1px]  text-right flex-1 overflow-scroll">{inv.id}</td>
    </tr>
    
})} */}

{chairs.length>0 && chairs.map(chr=>{
    
    return<tr key={chr.id} id={chr.id}>
    {/* <div className={`flex flex-col justify-between `}>
    <div className="flex justify-between flex-row-reverse h-[50px]">
    <div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-600 text-[20px]  whitespace-nowrap  overflow-hidden "><div className=" mr-[5px]  justify-end text-white hover:overflow-scroll">{inv.id}</div></div>
    <div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-600 text-[20px]  whitespace-nowrap overflow-hidden"><div className="flex mr-[5px] justify-end text-white overflow-hidden">
    <div className=" mr-[5px] w-[70%] justify-end overflow-hidden text-white hover:overflow-scroll">{inv.name}</div>
        <div className="flex w-[30px] h-[30px] rounded-full border-[1px] border-white justify-center items-center">
            <label htmlFor="" className=" cursor-pointer" onClick={()=>{setExpand(prev=>!prev)}}>+</label></div>
        </div></div>
    <div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-600 text-[20px]  whitespace-nowrap  overflow-hidden "><div className=" mr-[5px]  justify-end text-white hover:overflow-scroll">{inv.whatsapp}</div></div>
  <div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-600 text-[20px]  whitespace-nowrap  overflow-hidden "><div className=" mr-[5px]  justify-end text-white hover:overflow-scroll">{inv.email}</div></div>
  <div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-600 text-[20px]  whitespace-nowrap  overflow-hidden "><div className=" mr-[5px]  justify-end text-white hover:overflow-scroll">{inv.itype}</div></div>

  <div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-600 text-[20px]  whitespace-nowrap  overflow-hidden "><div style={{backgroundColor:`${inv?.chair?.category?.color}`}} className={`mr-[5px]  justify-end bg-[#555] text-white hover:overflow-scroll`}>{inv?.chair?.title}</div></div>
  <div className=" flex flex-1 border-[1px] justify-end items-center bg-blue-600 text-[20px]  whitespace-nowrap  overflow-hidden "><div className=" mr-[5px]  justify-end text-white hover:overflow-scroll">7</div></div>
    <div  className=" flex flex-1 border-[1px] justify-end items-center bg-blue-600 text-[20px]  whitespace-nowrap ">
        <Checkbox  checked={inv.affirm=="لا"} disabled ></Checkbox></div>
    </div>
    <div className={`   justify-evenly  ${expand?"flex":"hidden"}`}>
        <div  onClick={()=>{setInvId(inv.id)
       if(itype=="خارجي"){setEShow(true)}
       else {setIEShow(true)}
        }}>edit</div>
        <div onClick={()=>{setInvId(inv.id)
        setChairs(inv.event.place.chairs)
        // alert(inv.event.place.name)
        setBook(true)
        setCustomer(inv.name)
        }}>book 2</div>
        <div>action 3</div>
    </div>
    </div> */}

    <SeatsRow chair={chr} setChairId={setChairId} setEShow={setEShow} setMutate={setMutate} setWt={setWt}/>
{/* {chr.invetation &&chr.invetation.length>0 &&chr.invetation.map(invv=>{
return     <div className=" flex h-[20px]  "> {invv.name} {invv.chairId}</div>

})} */}
{/* {
    (chr.invetation && chr.invetation.length==0&&(<div>{chr.title} {chr.categoryId}</div> ))
       
    
} */}
    {/* <InvitationsDayRow inv={inv} setInvId={setInvId} setEShow={setEShow} setIEShow={setIEShow} setBook={setBook} setChairs={setChairs}/> */}
    </tr>})}
    {!wt &&  emptyResult && invetations.length==0 && (
    <div className="flex justify-center items-center w-full h-[40px] bg-blue-950 text-yellow-500 text-[30px]">! لا توجد نتائج مطابقة</div>
)}
{/* book is {book?"true":false} */}
</table>



    </div>
    
 
}
 
export default Seats;