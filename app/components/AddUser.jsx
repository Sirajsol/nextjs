"use client"
import { useState,useEffect } from "react";
import { toast } from "react-hot-toast";
const AddUser = ({setShow}) => {
const[name,setName]=useState('')
const[password,setPassword]=useState('')
const[confirmPassword,setConfirmPassword]=useState('')
const[role,setRole]=useState('')

const addUser=async()=>{
    if(password==confirmPassword){
    const res=await fetch('/api/user',{
        method:'POST',
        body:JSON.stringify({name,password,role})
    })
    if(res){
        toast.success('تم إضافة مستخدم')
    }
    if(!res){
        toast.error('لم تتم الإضافة')
    }
}
else{
    toast.error('كلمة السر غير متتطابقة مع تأكيد كلمة السر')
}
}

    return <div className="flex justify-center items-start
    w-full h-full bg-slate-500 ">
        <div className="flex justify-center items-start top-[0px] left-[0px] z-20
    w-full h-screen bg-black opacity-35 absolute border-[2px] "
    onClick={()=>{setShow(false)}}
    ></div>
    <div className=" flex w-[80%] mx-auto flex-col top-[40px] border-[1px] left-[10%]
     bg-blue-950 border-yellow-500 p-[40px] rounded shadow-white shadow-lg 
     absolute z-40">
<div className="flex  justify-between my-[30px]">
   
    <input type="text" id="name"
    value={name}
    onChange={(e)=>{setName(e.target.value)}}
    className="flex w-[60%] outline-none border-b-[1px] border-yellow-500 text-[20px]
     text-white rounded-sm bg-transparent text-right px-[5px] "
    />
    <label 
    htmlFor="name"
    className=" text-right w-[30%] text-[10px] sm:text-[15px] md:text-[20px] border-b-[1px] md:w-[170px] border-yellow-100 text-white ">اسم المستخدم</label>
</div>

<div className="flex justify-between my-[30px]">
    
    <input type="text" id="pass"
        // className="flex outline-none border-b-[1px] border-yellow-500 text-[20px] text-white rounded-sm bg-transparent text-right px-[5px] "
        value={password}
        onChange={(e)=>{setPassword(e.target.value)}}
    
        className="flex w-[60%] outline-none border-b-[1px] border-yellow-500 text-[20px]
        text-white rounded-sm bg-transparent text-right px-[5px] "
       />
       <label 
       htmlFor="name"
       className=" text-right w-[30%] text-[10px] sm:text-[15px] md:text-[20px] border-b-[1px] md:w-[170px] border-yellow-100 text-white ">كلمة المرور</label>
</div>
<div className="flex justify-between my-[30px] flex-row-reverse focus:shadow-sm focus:shadow-white">
<label 
htmlFor="conf"
className=" text-right w-[30%] text-[10px] sm:text-[15px] md:text-[20px] border-b-[1px] md:w-[170px] border-yellow-100 text-white ">تأكيد كلمة المرور</label>
    <input type="text"  id="conf"
        // className="flex outline-none border-b-[1px] border-yellow-500 text-[20px] text-white rounded-sm bg-transparent text-right px-[5px]  "
        className="flex w-[60%] outline-none border-b-[1px] border-yellow-500 text-[20px]
        text-white rounded-sm bg-transparent text-right px-[5px] "
        value={confirmPassword}
        onChange={(e)=>{setConfirmPassword(e.target.value)}}
    
    />
</div>
<div className="flex justify-between my-[30px] flex-row-reverse focus:shadow-sm focus:shadow-white">
<label 
htmlFor="conf"
className=" text-right w-[30%] text-[10px] sm:text-[15px] md:text-[20px] border-b-[1px] md:w-[170px] border-yellow-100 text-white ">التفويض</label>
    <select type="text"  id="conf"
        // className="flex outline-none  border-b-[1px] border-yellow-500 text-[20px] w-[52%] text-white rounded-sm bg-blue-950 text-right px-[5px]  "
        className="flex w-[60%]  outline-none border-b-[1px] border-yellow-500 text-[10px] sm:text-[15px] md:text-[20px]
        text-white rounded-sm bg-blue-950 text-right px-[5px] "
        value={role}
        onChange={(e)=>{setRole(e.target.value)}}
    
    >
         <option value="">اختر صلاحية</option>
        <option value="مدير">مدير</option>
        <option value="موظف">موظف</option>
        </select>
</div>
<div className=" flex justify-end ">
    <button className=" flex w-[100px] py-[10px] text-[10px] sm:text-[15px]  rounded-sm disabled:cursor-not-allowed cursor-pointer
shadow-sm shadow-white hover:shadow-md hover:shadow-white text-white bg-orange-600 justify-center items-center"
onClick={()=>{addUser()}}
disabled={(!password || !confirmPassword ||!name || !role ||(password!=confirmPassword))}
>إضافة مستخدم</button></div>
    </div>
    </div>
}
 
export default AddUser;