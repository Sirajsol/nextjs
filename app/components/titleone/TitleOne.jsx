"use client"
import{ useState, useEffect} from 'react'
import toast from 'react-hot-toast'
const TitleN = ({setShow, setMutate,setWt}) => {
    const[title,setTitle]=useState('')
    const[lang,setLang]=useState('عربي')
    const[onBox,setOnBox]=useState(false)
    const postTl =async()=>{
        setWt(true)
const tt=await fetch("/api/titleone",{
    method:'POST',
    body:JSON.stringify({title,lang})
}).then(res=>{toast.success("تمت إضافة لقب أول")
setShow(false)
setMutate(true)
}).catch(error=>{alert("error in adding title on1")})
    }
    setWt(false)
    return <div className="flex w-screen h-screen justify-center items-center">
<div className=" flex w-full h-full opacity-40 bg-black absolute"
onClick={()=>{if(!onBox){setShow(false)}}}
>

</div>
<div className="flex flex-col justify-evenly w-[500px] h-[300px] absolute top-[10px] z-20
 bg-blue-900 opacity-100 rounded shadow-md shadow-white"
 onMouseEnter={()=>{setOnBox(true)}}
 onMouseLeave={()=>{setOnBox(false)}}
 >
    <div className='flex justify-between w-[80%] mx-auto'>    
    <input  className='flex w-[200px] h-[30px] rounded-sm bg-transparent border-b-[1px]
     border-yellow-400 text-[20px] text-white text-right' type='text' value={title} onChange={(e)=>{setTitle(e.target.value)}}></input>
<label className='flex justify-end items-end w-[110px] h-[30px] text-white font-thin  text-[25px]  border-b-[1px]
     border-yellow-400 '>اللقب الأول</label>
</div>
<div className='flex justify-between w-[80%] mx-auto'>    
    <div  className='flex w-[200px] h-[40px] rounded-sm justify-end border-b-[1px] border-yellow-400' >

<button 
onClick={()=>{setLang('إنكليزي')}}
className={`${lang=='إنكليزي'?'bg-blue-600 text-white':'bg-white text-blue-950'} w-[70px] h-[30px] rounded-sm mr-[20px]`}>إنكليزي</button>

<button className={`${lang=='عربي'?'bg-blue-600 text-white':'bg-white text-blue-950'} w-[70px] h-[30px] rounded-sm`}
onClick={()=>{setLang('عربي')}}
>عربي</button>
    </div>
<label className='flex justify-end items-end w-[110px] h-[40px] text-white font-thin  text-[25px]  border-b-[1px]
     border-yellow-400 '>اللغة</label>
</div>
<div className='flex justify-center items-center w-full h-[40px]'>
<button
    className='flex bg-orange-500 text-white w-[80px] h-[35px] justify-center mr-[60px] items-center rounded-sm text-[24px] shadow-sm shadow-black
    hover:shadow-black hover:shadow-md active:w-[65px] active:h-[25px] active:shadow-yellow-500 active:shadow-md active:text-[20px]
    '
    onClick={()=>{postTl()}}>إضافة</button>
</div>
   
</div>
    </div>

     
}
 
export default TitleN;