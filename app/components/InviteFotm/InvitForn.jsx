'use client'
import { useEffect, useState } from 'react';
import Style from './page.module.css'
import toast from 'react-hot-toast'
import { sendit } from "../send";
const InvitForm = ({tog}) => {
    const[isEmail,setIsEmail]=useState()
    const[isWhatsapp,setIswhatsapp]=useState()
    const[lang,setLang]=useState("arabic")
    const[img,setImg]=useState(null)
    const[imgdata,setImgData]=useState("")
    const[hidden,setHidden]=useState(false)

const[events,setEvents]=useState([])
const[titles,setTitles]=useState([])
const[wait,setWait]=useState(false)

const[secTitles,setSecTitles]=useState([])
const[categories,setCategories]=useState([])
const[name,setName]=useState('')
    const[event,setEvent]=useState('')
    const[email,setEmail]=useState('')
    const[whatsapp,setWhatsapp]=useState('')
    const[title,setTitle]=useState('')
    const[secTitle,setSecTitle]=useState('')
    const[position,setPosition]=useState('')
    const[category,setCategory]=useState('')
    const[orgnization,setOrgnization]=useState('')


    useEffect(()=>{
        const evs=async()=>{
            setWait(true)
            const {events:evs}=await fetch('/api/event').then(res=>res.json())
            if(evs){setEvents(evs)}
            setWait(false)
        }
        evs()
    },[])
    useEffect(()=>{
        const pls=async()=>{
            setWait(true)
            const ctgrs=await fetch('/api/category').then(res=>res.json())
            if(ctgrs){setCategories(pls)}
               setWait(false)
        }
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
            const ttls=await fetch('/api/titletwo').then(res=>res.json())
            if(ttls){setSecTitles(ttls)}
               setWait(false)
        }
pls()
    },[])
    
    useEffect(()=>{
        const pls=async()=>{
             setWait(true)
            const cats=await fetch('/api/personcat').then(res=>res.json())
            if(cats){setCategories(cats)}
               setWait(false)
        }
pls()
    },[])

    const posinvite=async()=>{
        const ev=await fetch('/api/invetation',{
            method:'POST',
            body:JSON.stringify({name,eventId:event,title, orgnization,position,email,whatsapp,categoryId:category,itype:"داخلي",affirm:"لا",istate:""})
        }).then(res=>{
            if(res.ok)
          {
            toast.success("تم ارسال الدعوة")
            return res.json()} 
        }
            ).then((d)=>{
            let msg=''
            if(lang=='arabic'){
                 msg=events.find(d=>d.title==event).arMessage
            }
            else if(lang=='english'){
                 msg=events.find(d=>d.title==event).enMessage
            }
            let img=events.find(d=>d.title==event).img
            console.log("evt id is ",d.id)
            // alert(d.id)
         if(isEmail) {sendit(email,msg,`https://rs4itbysiraj.vercel.app/invitation-confirm/${d.id}`,name,title+" "+secTitle,img)}
        }
           )
        .catch((error)=>{toast.error("error")
        console.log("error------------------------",error)
    })
    if(ev){
        // toast.success("success")
        if(isEmail) {sendit(email,msg,`/invitation-confirm/${ev.id}`)}
        console.log(ev)}
    //   else  if(!ev){toast.error("error")
    
    // }
    
    
    }
   



    return <div className='flex w-full h-screen absolute z-40 pb-[20px]'>
        {wait &&(<div className='flex justify-center text-center items-center text-white border-[1px]
        border-yellow-400 shadow-md shadow-white bg-blue-800 z-20 w-[40%] h-[50px] md:h-[100px] text-[20px] md:text-[35px] absolute top-[150px] left-[30%]'>الرجاء الانتظار</div>)}
        {/* <div className='flex w-screen bg-slate-600 h-screen top-[-100px] left-[0px] absolute  opacity-35' */}
    <div className={`${!hidden? Style.wholep : "hidden"} `}
    
    onClick={()=>{
        tog()
        setHidden(true)}}
    > 
    </div>
    
   {!hidden && !wait &&( <div className={Style.maincontainer}>
    <div className="flex w-[95%] mx-auto justify-between  mt-[10px]  py-[10px] border-b-[1px] border-yellow-400 my-[10px]">
        
        <select  className='flex  w-[85%]  rounded-sm h-[30px] text-right text-white bg-blue-950' id='event' value={event} onChange={(e)=>{setEvent(e.target.value)}}>
        <option value="">اختر فعالية</option>
            {events.length>0&&(events.map(ev=>{
                return<option key={ev.id} value={ev.title}>{ev.title}</option>
            }))}
            {/* <option className={Style.optionn} >option 1</option>
            <option>option 2</option>
            <option>option 3</option>
            <option>option 4</option> */}
        </select>
        <label className='flex  text-yellow-200' htmlFor='event'>الفعالية</label>
        </div>
<div className={Style.lineElement}>

        
        <div className={Style.songleelement}>
        <label htmlFor='st'>اللقب2</label>
        <select  id='st' value={secTitle} onChange={(e)=>{setSecTitle(e.target.value)}}>
        <option   >الرجاء اختيار لقب2</option>
            {events.length>0&&(secTitles.map(sc=>{
                return<option key={sc.id} value={sc.title}>{sc.title}</option>
            }))}
            {/* <option className={Style.optionn} >option 1</option>
            <option>option 2</option>
            <option>option 3</option>
            <option>option 4</option> */}
        </select>
        
        </div>

        <div className={Style.songleelement}>
        <label htmlFor='title'>1اللقب</label>
        <select id='title' value={title} onChange={(e)=>{setTitle(e.target.value)}}>
            <option   >الرجاء اختيار لقب</option>
            {titles.length>0 &&titles.map(ttl=>{
                return <option key={ttl.id} value={ttl.title}>{ttl.title}</option>
                })}
            
        </select>
        
        </div>
       </div>


      
       <div className={Style.lineElement}>
       <div className={Style.songleelement}>
        <label htmlFor='email'>البريد الإلكتروني</label>
        <input type="text" id='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
        
        </div>

        <div className={Style.songleelement}>
        <label htmlFor='name'>الاسم</label>
        <input type="text" id='name' value={name} onChange={(e)=>{setName(e.target.value)}} />
        
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
            <option className={Style.optionn}  >الرجاء اختيار فئة</option>
            {categories.length>0 && categories.map(ct=>{
                return <option key={ct.id} value={ct.title}>{ct.title}</option>
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

       <div className='flex w-[80%] justify-end '>

        <div className='flex w-[70%] ml-[0%]  md:ml-[10%] justify-evenly  sm:w-[100%] sm:justify-start'>
            <div className={`${isEmail?"bg-red-700 text-white":"bg-white text-black"} cursor-pointer my-[5px] w-[70px] h-[30px] sm:h-[50px] rounded text-center`}
            onClick={()=>{setIsEmail(true)}}
            > نعم </div>
            <div className={`${isEmail?"bg-white text-black":"bg-red-600 text-white"}  cursor-pointer  my-[5px] w-[70px] h-[30px] sm:h-[50px] rounded text-center`}
            onClick={()=>{setIsEmail(false)}}
            > لا</div>
            </div>
            </div>
            </div>
            <div className={Style.songleelement}>
        <label>ارسال واتساب</label>
        <div className='flex w-[80%] justify-end '>

        <div className='flex w-[70%] ml-[0%]  md:ml-[10%] justify-evenly  sm:w-[100%] sm:justify-start'>
        <div className={`${isWhatsapp?"bg-red-700 text-white":"bg-white text-black"} cursor-pointer my-[5px] w-[70px] h-[30px] sm:h-[50px] rounded text-center`}
            onClick={()=>{setIswhatsapp(true)}}
            > نعم </div>
            <div className={`${isWhatsapp?"bg-white text-black":"bg-red-600 text-white"}  cursor-pointer my-[5px] w-[70px] h-[30px] sm:h-[50px] rounded text-center`}
            onClick={()=>{setIswhatsapp(false)}}
            > لا</div></div>
</div>
</div>
            <div className={Style.songleelement}>
        <label>اللغة</label>
        <div className='flex w-[80%] justify-end '>
        <div className='flex w-[70%] justify-evenly  sm:w-[100%] sm:justify-end'>
        <div className={`${lang=="arabic"?"bg-red-700 text-white":"bg-white text-black"} cursor-pointer my-[5px] w-[70px] h-[30px] sm:h-[50px] rounded text-center`}
            onClick={()=>{setLang("arabic")}}
            > عربي </div>
            <div className={`${lang=="english"?"bg-red-600 text-white":"bg-white text-black"}  cursor-pointer my-[5px] w-[70px] h-[30px] sm:h-[50px] rounded text-center`}
            onClick={()=>{setLang("english")}}
            > English</div></div>
            </div>
            </div>
        </div>
        <button className={Style.send}
        disabled={(!event||!name||!email||!secTitle||!position||!orgnization||!category)}
        onClick={
            ()=>{
                // toast.success('hi')
    posinvite()
    }}
        >إضافة</button>
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
 
export default InvitForm;