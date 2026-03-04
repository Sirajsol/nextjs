"use client"
import { useState,useEffect } from "react";
import { toast } from "react-hot-toast";
const EditUser = ({setShow,userr}) => {
const[name,setName]=useState('')
const[password,setPassword]=useState('')
const[confirmPassword,setConfirmPassword]=useState('')
const[role,setRole]=useState('')
const[editing,setEditing]=useState(false)
const addUser=async()=>{
    setEditing(true)
    if(password==confirmPassword){
    const res=await fetch(`/api/users?id=${userr.id}`,{
        method:'PUT',
        body:JSON.stringify({name,password,role})
    })
    if(res.ok){
        console.log(res.json())
        toast.success('تم تعديل مستخدم')
        setShow(false)
    }
    if(!res){
        toast.error('لم يتم التعديل')
    }
}
else{
    toast.error('كلمة السر غير متتطابقة مع تأكيد كلمة السر')
}
setEditing(false)
}

useEffect(()=>{
    if(userr){
        setName(userr.name)
        setPassword(userr.password)
        setConfirmPassword(userr.password)
        setRole(userr.role)
    }
},[userr])

    return <div className="flex justify-center items-start
    w-full h-full bg-slate-500 ">
        {editing&&(<div className=" flex w-[300px] left-[600px] h-[50px] rounded-sm top-[200px] z-40
        absolute  justify-center items-center bg-blue-700 text-white shadow-md shadow-white">...جاري التعديل</div>)}
        <div className="flex justify-center items-start top-[0px] left-[0px]
    w-full h-screen bg-black opacity-35 absolute border-[2px] "
    onClick={()=>{setShow(false)}}
    ></div>
    <div className=" flex w-[80%] left-[10%] sm:w-[40%] mx-auto flex-col top-[40px] border-[1px]  md:left-[450px]
     bg-blue-950 border-yellow-500 p-[40px] rounded shadow-white shadow-lg 
     absolute z-20">
<div className="flex justify-between my-[30px]">
   
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
   htmlFor="pass"
   className=" text-right w-[30%] text-[10px] sm:text-[15px] md:text-[20px] border-b-[1px] md:w-[170px] border-yellow-100 text-white ">كلمة المرور</label>
</div>
<div className="flex justify-between my-[30px] flex-row-reverse focus:shadow-sm focus:shadow-white">
<label 
htmlFor="conf"
className=" text-right w-[30%] text-[10px] sm:text-[15px] md:text-[20px] border-b-[1px] md:w-[170px] border-yellow-100 text-white ">تأكيد كلمة المرور</label>
    <input type="text"  id="conf"
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
    <button className=" flex w-[100px] py-[10px] rounded-sm disabled:cursor-not-allowed cursor-pointer
shadow-sm shadow-white hover:shadow-md hover:shadow-white text-[10px] sm:text-[15px] text-white bg-orange-600 justify-center items-center"
onClick={()=>{addUser()}}
disabled={(!password || !confirmPassword ||!name || !role ||(password!=confirmPassword))}
>تعديل مستخدم</button></div>
    </div>
    </div>
}
 
export default EditUser;