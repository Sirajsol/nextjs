'use client'
import { useEffect, useState } from 'react';
import Style from '../editInternalInvetation/page.module.css'
import toast from 'react-hot-toast'
import { sendit } from "../send";
import { useParams } from 'next/navigation';
const EditInternalInvetation = ({id,setShow,setMutate,inv}) => {
    const[isEmail,setIsEmail]=useState()
    const[isWhatsapp,setIswhatsapp]=useState()
    const[lang,setLang]=useState("arabic")
    const[img,setImg]=useState(null)
    const[imgdata,setImgData]=useState("")
    const[hidden,setHidden]=useState(false)
// const id="659937f00398ac6da9298aaa"
const[events,setEvents]=useState([])
const[titles,setTitles]=useState([])
const[categories,setCategories]=useState([])
const[name,setName]=useState('')
    const[event,setEvent]=useState('')
    const[email,setEmail]=useState('')
    const[whatsapp,setWhatsapp]=useState('')
    const[title,setTitle]=useState('')
    const[position,setPosition]=useState('')
    const[category,setCategory]=useState('')
    const[orgnization,setOrgnization]=useState('')
    const[invet,setInvet]=useState(null)
   
const[wait,setWait]=useState(false)
// const {id}=useParams({inv})
    // useEffect(()=>{
    //     const inv=async()=>{
    //         console.log("id ",id)
    //         setWait(true)
    //         const inve=await fetch(`http://localhost:3000/api/invetation/${id}`).then(res=>res.json())
    //         if(inve){setInvet(inve)
    //         setWait(false)
    //         }
    //     }
    //     inv()
    // },[])

    useEffect(()=>{
        if(inv){
       setName(inv.name)
       setEmail(inv.email)
       setTitle(inv.title)
       setEvent(inv.eventId)
       setPosition(inv.position)
       setCategory(inv.categoryId)
       setOrgnization(inv.orgnization)
       
        }
    },[inv])


    useEffect(()=>{
        const pls=async()=>{
            setWait(true)
            const ctgrs=await fetch('/api/personcat').then(res=>res.json())
            if(ctgrs){setCategories(ctgrs)}
            setWait(false)
        }
        pls()
    },[])
    useEffect(()=>{
        const pls=async()=>{
            setWait(true)
            const ttls=await fetch('/api/titleone').then(res=>res.json())

            if(ttls){setTitles(ttls)}
            setWait(false)
        }
        pls()
    },[])

    useEffect(()=>{
        const pls=async()=>{
            setWait(true)
            const {events:evs}=await fetch('/api/event').then(res=>res.json())
            if(evs){setEvents(evs)}
            setWait(false)
        }
        pls()
    },[])



    const posinvite=async()=>{
      
        const ev=await fetch(`/api/invetation/${id}`,{
            method:'PUT',
            headers: { 
                'Content-type': 'application/json'
              }, 
            body:JSON.stringify({name,eventId:event,title,orgnization,position,email,whatsapp,categoryId:category})
        }).then((res)=>{
            if(res.status=='200')
       {toast.success("تم التعديل")
    setMutate(true)
    return res.json()
    }
       else{toast.error("لم يتم التعديل")}
    //    return res.json()
        })
        .then((d)=>{
            let msg=''
            if(lang=='arabic'){
                 msg=events.find(d=>d.title==event).arMessage
            }
            else if(lang=='english'){
                 msg=events.find(d=>d.title==event).enMessage
            }
            console.log("evt id is ",d.id)
            // alert(d.id)
            let img=events.find(d=>d.title==event).img
            console.log("evt id is ",d.id)
            // alert(d.id)
         if(isEmail) {sendit(email,msg,`https://rs4it-by-siraj.vercel.app/invitation-confirm/${d.id}`,name,title,img)}
        //  if(isEmail) {sendit(email,msg,`/invitation-confirm/${id}`)}
        }
           )
        .catch((error)=>{toast.error("لم يتم التعديل")
        console.log("error------------------------",error)
    })
        if(ev){toast.success("success")
        console.log(ev)}
    //   else  if(!ev){toast.error("error")
    
    // }
    
    
    }
   



    
    return <div className='flex w-full h-full '>
        {/* <div className='flex w-screen bg-slate-600 h-screen top-[-100px] left-[0px] absolute  opacity-35' */}
    <div className={`${!hidden? Style.wholep : "hidden"} `}
    
    onClick={()=>{
       setShow(false)
        // setHidden(true)
    }}
    > 
    </div>
    {wait &&(<div className='flex justify-center text-center items-center text-white border-[1px]
        border-yellow-400 shadow-md shadow-white bg-blue-800 z-20 w-[400px] h-[100px]  text-[35px] absolute top-[150px] left-[600px]'>الرجاء الانتظار</div>)}
   
   {!hidden && !wait&& inv&&( <div className={Style.maincontainer}>

<div className={Style.lineElement}>
        <div className={Style.songleelement}>
        <label htmlFor='email'>البريد الإلكتروني</label>
        <input type="text" id='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
        
        </div>
        <div className={Style.songleelement}>
        <label htmlFor='event'>الفعالية</label>
        <select  id='event' value={event}  onChange={(e)=>{setEvent(e.target.value)}}>
            {events.length>0&&(events.map(ev=>{
                return<option key={ev.id} value={ev.title}>{ev.title}</option>
            }))}
            {/* <option className={Style.optionn} >option 1</option>
            <option>option 2</option>
            <option>option 3</option>
            <option>option 4</option> */}
        </select>
        
        </div>
       </div>



       <div className={Style.lineElement}>
        <div className={Style.songleelement}>
        <label htmlFor='name'>الاسم</label>
        <input type="text" id='name' value={name} onChange={(e)=>{setName(e.target.value)}} />
        
        </div>
        <div className={Style.songleelement}>
        <label htmlFor='title'>اللقب</label>
        <select id='title' value={title} onChange={(e)=>{setTitle(e.target.value)}}>
            {titles.map(tit=>{
                return <option key={tit.id} value={tit.title}>{tit.title}</option>
            })}
        </select>
        
        </div>
       </div>


       <div className={Style.lineElement}>
        <div className={Style.songleelement}>
        <label htmlFor='position'>المنصب</label>
        <input type="text" id='position' value={position}  onChange={(e)=>{setPosition(e.target.value)}}/>
        
        </div>
        <div className={Style.songleelement}>
        <label htmlFor='Mobile'>رقم الموبايل</label>
        <input type="text" id='Mobile' value={whatsapp} onChange={(e)=>{setWhatsapp(e.target.value)}}/>
        
        </div>
       </div>


     <div className={Style.lineElement}>
        
        <div className={Style.songleelement}>
        <label htmlFor='category'>الفئة</label>
        <select id='category' value={category} onChange={(e)=>{setCategory(e.target.value)}}>
        <option className={Style.optionn} value='' >الرجاء الاختيار</option>
            {categories.map(cat=>{
                return <option key={cat.id} value={cat.title}>{cat.title}</option>
            })}
           
        </select>
        
        </div>
        <div className={Style.songleelement}>
        <label htmlFor='orgnization'>الجهة</label>
        <input type="text" id='orgnization' value={orgnization} onChange={(e)=>{setOrgnization(e.target.value)}} />
        
        </div>
       </div>

       <div className={Style.collection}>
        <div className={Style.songleelement}>
        <label>ارسال بريد الكتروني</label>
          
            <div className={`${isEmail?"bg-red-700 text-white":"bg-white text-black"} cursor-pointer my-[5px] w-[70px] h-[50px] rounded text-center`}
            onClick={()=>{setIsEmail(true)}}
            > نعم </div>
            <div className={`${isEmail?"bg-white text-black":"bg-red-600 text-white"}  cursor-pointer  my-[5px] w-[70px] h-[50px] rounded text-center`}
            onClick={()=>{setIsEmail(false)}}
            > لا</div>
            </div>
           
          
        </div>
        <button 
         disabled={(!event||!name||!email||!title||!position||!orgnization||!category)}
        className={Style.send}
        onClick={
            ()=>{
                // toast.success('hi')
    posinvite()
    }}
        >تعديل</button>
{/* <input type='file' onChange={(e)=>{

// const file=e.target.files[0]
// const reader=new FileReader()
// reader.addEventListener("load",()=>{
//     console.log(reader.result)
// })
// reader.readAsDataURL(file)
  //  setImg(e.target.files[0])
//     console.log("chanfe")

}}/> */}
    </div>
)}
    </div>
}
 
export default EditInternalInvetation;