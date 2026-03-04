"use client"
import { useState,useEffect,useContext } from "react";
import { toast } from "react-hot-toast";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {getCurrentUser} from '../../actions/getUser'
import {Mcotext} from '../context/context'
import { useCntxt } from "../context/context";
import Load from "./load";

const Login = () => {
    
const[name,setName]=useState('')
const[password,setPassword]=useState('')
const[wt,setWt]=useState(false)
const[badConnection,setBadConnection]=useState(false)
const router=useRouter()
// const {user}=useCntxt()
// if(user){router.push("/add-users")}
const {user,setUser,loaded,setWait,wait}=useCntxt()
console.log('the user is ',user)
    
  
    useEffect(()=>{
      
if(loaded){
    
  if(user && user?.role!="مدير"){
      router.push('/events')
        }
        else{
            if(user && user?.role=="مدير"){
                router.push('/add-users')
            }
        }
}
    },[loaded,user])


const onSubmittt=async()=>{
const data={name:name,password:password}
    // setIsLoading(true)
   signIn('credentials',{
       ...data,
        redirect:false
    })
     .then((callback)=>{
        // setIsLoading(false)

        if(callback?.ok){   // if we successfully log in the user
            localStorage.setItem('use','siraj')
            // router.push('/events')
            // router.refresh()
            toast.success('loged in')
                            }
                            if(callback?.error){
                                toast.error(callback.error) //will be the message from autorize function in [...nextauth]
                            }

    }).catch(Error=>{
        console.log('fuck')
    })
}




const log=async()=>{
setWt(true)
setBadConnection(false)
  toast('الرجاء الانتظار')
   console.log("try  log")
    // const res=await fetch(`/api/user?name=${name}&password=${password}`,{
        
    //     // body:JSON.stringify({name,password})
    // })
    const ps=await fetch(`/api/user?name=${name}&password=${password}`).then(res=>{
        if(!res.ok){  toast.error(" خطأ اتصال")}
        setWt(false)
        //if you say  console.log("res is ",res.json()) this will break the code cause res is not fullfill yet!!!
    //  
        return res.json()}).catch(Error=>{
            setBadConnection(true)
            setWt(false)
            // alert('errrrrrrr')
            toast.error(" خطأ اتصال")
        })
            console.log("res is ",ps)
        if(ps==""){
            console.log("fuck  log")
                toast.error("خطأ")
            }
        
        if(ps&&ps.length>0){console.log("many users",ps)
            // toast.success("yeh")
            setUser(ps[0])
            localStorage.setItem('user',JSON.stringify(ps[0]))
if(ps[0]?.role=='مدير'){ router.push('/add-users')}
           else if(ps[0]?.role=='موظف'){ router.push('/add-users')}
            console.log('done sitting ',ps[0].role)
        }
    if(ps&&ps.length==0){
        console.log("no users")
        toast.error('مستخدم عير موجود  ')
    }
    if(ps){
setUser(ps[0])
    }
// setUser('ali')
}
const j=async()=>{
    console.log("m")
    const m= await getCurrentUser(name,password)
    if(m){console.log(m)}
}

    return <div className="flex justify-center items-start
  sm:w-full h-full bg-slate-500  ">
        <div className="flex justify-center items-start top-[60px] left-[0px] h-screen 
     w-full  bg-black opacity-35 absolute border-[2px] "
    // onClick={()=>{setShow(false)}}
    ></div>
    <div className=" flex   w-[46%] max-sm:min-w-[240px] left-[10%]    sm:w-[45%] lg:w-[30%] mx-auto flex-col top-[80px] border-[1px] sm:left-[35%] 
     bg-blue-950 border-yellow-500 p-[40px] rounded shadow-white shadow-lg 
     absolute z-40">
<div className="flex justify-between my-[30px]">
   
    <input type="text" id="name"
    value={name}
    onChange={(e)=>{setName(e.target.value)}}
    className="w-[55%] text-[10px] sm:text-[20px] flex outline-none border-b-[1px] border-yellow-500  text-white rounded-sm bg-transparent text-right px-[5px] "
    />
    <label 
    htmlFor="name"
    className="  text-[10px] w-[40%] text-right sm:text-[20px] border-b-[1px] sm:w-[170px] border-yellow-500 text-white ">اسم المستخدم</label>
</div>
{/* {wt&&<div className="flex  justify-center items-center absolute top-[150px] bg-blue-900 w-[400px] h-[80px] left-[200px] text-white
    text-[30px] px-[40px] shadow-black shadow-md rounded z-10">الرجاء الإنتظار</div>} */}
    {wt&&<Load/>}
{badConnection&&<div className=" flex absolute h-[50px] w-[100%] left-[20%]
 justify-center  bg-blue-900 text-white text-[20px]">bad connection...</div>}
<div className="flex justify-between my-[30px]">
    
    <input type="password" id="pass"
        className="text-[10px] sm:text-[20px] w-[55%] flex outline-none border-b-[1px] border-yellow-500  text-white rounded-sm bg-transparent text-right px-[5px] "
        value={password}
        onChange={(e)=>{setPassword(e.target.value)}}
    
    />
   <label 
   htmlFor="pass"
   className="text-[10px] w-[40%] text-right sm:text-[20px] sm:w-[170px] border-b-[1px] border-yellow-500 text-white ">كلمة المرور</label>
</div>


<div className=" flex justify-end "><button className="text-[10px] sm:text-[20px] flex w-[80px] py-[5px] rounded-sm
shadow-sm shadow-white hover:shadow-md hover:shadow-white text-white bg-orange-600 justify-center items-center"
onClick={()=>{
   log()
   setWait(true)
//    j()
    }}
>دخول</button></div>
    </div>
    </div>
}
 
export default Login;