"use client"
import { MdModeEditOutline } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import AddUser from'../components/AddUser'
import { useState,useEffect ,useContext} from "react";
import { useSession } from 'next-auth/react';
import {useCntxt} from '../context/context'
import { useRouter } from 'next/navigation';
import {Mcotext} from '../context/context'
import Container from "../components/Contaner";
import EditUser from "../components/EditUser"
import {toast} from 'react-hot-toast'
import NavBar from "../components/nav/Nav";
import Load from "../components/load";
import { userdel } from "../actions/eventactions";
const AddUsers = () => {

    const[wt,setWt]=useState(false)
const[mutate,setMutate]=useState(false)
const[show,setShow]=useState(false)
const[eShow,setEShow]=useState(false)
    const[entriesPerPage,setEntriesPerPage]=useState(5)
    const[page,setPage]=useState(1)
    const[total,setTotal]=useState(1)
const[selectedUser,setSelectedUser]=useState(null)
    const[serchName,setSearchName]=useState('')
   const router=useRouter()
   const {user,setUser,loaded}=useCntxt()
    const[searchTerm,setSearchTerm]=useState('')
    const[users,setUsers]=useState([])
  const[connectionError,setConnectionError]=useState(false)

  const[confirm,setConfirm]=useState(false)
  const[showDelete,setShowDelete]=useState(false)
  const[idDelete,setIdDelete]=useState('')
  const[deleting,setDeleting]=useState(false)
  const[isDeleteing,setIsDeleteing]=useState(false)
      const del=async()=>{
        setDeleting(true)
          console.log("statrt deeting")
          const s=await fetch(`/api/user/?id=${idDelete}`,{
              method:'DELETE'
          }).then(res=>{
              if (res.ok){
                setDeleting(false)
                  toast.success('تم الحذف')
                  // setExpand(false)
                  setMutate(true)
              }
          })
      }



      const delet=async(id)=>{
        setIsDeleteing(true)
       const r=await userdel(id)
    //    alert(r)
    setIsDeleteing(false)
  
       toast.success('تم الحذف')
       setMutate(true)
    }

   useEffect(()=>{
    setWt(true)
    const pls=async()=>{
       
        const data=await fetch(`/api/users${searchTerm}`)
    //     .then(res=>{
    //         if(!res||!res.ok) {throw Error("no connection")
    //     return
    //     }
    //       return  res.json()
    //    })
    //     .catch((error)=>{
    //         setConnectionError(true)
    //         toast.error("خطأ")
    //         setWt(false)
    //     })
    if(!data || !data.ok){
        setConnectionError(true)
                toast.error("خطأ")
                 setWt(false)
    }
        const {uss:ps,count}=await data.json()
        setWt(false)
        if(ps){setUsers(ps)
        setTotal(count)
        }
       
    }
    pls()
},[searchTerm,mutate])








useEffect(()=>{
    search()
},[page])
   const search=()=>{
    let terms=[]
    let ter=""
    if(serchName.length>0){terms.push(`name=${serchName}`)}
    
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


    useEffect(()=>{
if(loaded){
  if(!user ||user?.role!="مدير"){
     router.push('/')
        }
        else{
            setAuth(true)
        }
        // setAuth(true)
}
    },[loaded])
    console.log('add users user is ',user)
    const[auth,setAuth]=useState(false)
    
//  useEffect(()=>{
//    const us=localStorage.getItem('user')
//     if(us){const user=JSON.parse(us)
      
//     if(!user ||user?.role!="مدير"){
//   router.push('/')
//     }
//     else{
//         setAuth(true)
//     }
// console.log('add users userrrrr is ',user)
//    }
//  },[])
   

    return <div>
<Container>
   

  {isDeleteing&&(<div className="flex w-full h-screen absolute">
        
        <div className="flex w-full h-screen absolute bg-black opacity-30 left-0 top-[-20px]"></div>
        <div className='flex w-[80%] left-[10%] md:w-[400px] h-[100px]  bg-blue-950 text-white shadow-md shadow-white rounded-md
 md:left-[600px] top-[100px] justify-center items-center absolute z-30' >جاري الحذف</div>
 </div>
 )}

{showDelete&&(<div className="flex justify-center flex-col absolute md:left-[600px] rounded-md p-[30px]sm:top-[200px]  bg-blue-950 z-20 ">
  <div className=" flex text-white text-[25px] mb-[30px] justify-center items-center">هل أنت متأكد انك تريد الحذف؟</div>
  <div className="flex justify-between items-center">
      <button className="flex w-[70px] bg-red-700 text-white rounded-sm m-[10px] justify-center items-center  hover:shadow-white hover:shadow-md"
      onClick={()=>{
          setShowDelete(false)
        //   del()
        delet(idDelete)
        }}
      >نعم</button>
      <button className="flex w-[70px] bg-green-600 text-white rounded-sm m-[10px] justify-center items-center  hover:shadow-white hover:shadow-md"
      onClick={()=>{setShowDelete(false)}}
      >لا</button>
  </div>
</div>)}

{connectionError && auth&&(
<div className=" flex w-screen h-screen justify-center items-center">
    <div className="flex justify-center items-center absolute top-[150px] bg-blue-900
     text-red-600 text-[30px] px-[40px] shadow-black shadow-md rounded">ممم حدث خطأ ما . تأكد من جودة الاتصال بالانترنت</div>
</div>
        )} 
        {wt&&<Load/>}

   
{!connectionError &&auth&& ( <div className=" flex flex-col h-screen w-screen mt-[150px] items-end relative">
<div><NavBar/></div> 
    {user && auth&&(<div  className='flex flex-col mt-[30px] w-full  '>
    <div  className='flex flex-col mt-[30px] w-full items-end pb-[10px]  border-b-[1px] border-yellow-400 '>
            <label htmlFor="" className='flex mr-[50px] text-blue-800 font-[900] text-[15px] sm:text-[25px]'>التحكم/ إضافة مستخدمين</label>
           <div className='flex h-[30px]'></div>
           <button className='flex bg-orange-600 w-[50px] text-[15px] sm:w-[80px] py-[5px]  items-center justify-center rounded-md
            shadow-black shadow-sm hover:shadow-md hover:shadow-black hover:text-blue-400 text-white font-[700] sm:text-[20px] mr-[50px]'
           onClick={()=>{setShow(true)}}
          
           
           >إضافة</button>
                {/* <div className=" flex justify-end "><button className=" flex w-[80px] py-[5px] rounded-sm
        shadow-sm shadow-white hover:shadow-md hover:shadow-white text-white bg-orange-600 justify-center items-center"
        onClick={()=>{setShow(true)}}
        
        >Add</button></div> */}
            
            {show && (<div><AddUser setShow={setShow} /></div> )} 
            {eShow && (<div><EditUser setShow={setEShow} userr={selectedUser} /></div> )} 
            </div>





            <div className='flex flex-col w-full'>
                <div className=' flex flex-col sm:flex-row justify-end w-full '>


                <div className=" flex  sm:justify-center ml-[5%] w-[95%] px-[20px] mr-[40px]  justify-end sm:w-[90%]  overflow-hidden  ">
<div className=" flex justify-between w-[50%] mr-[50px] sm:w[80%]  h-[30px] mt-[20px] sm:mt-[40px] items-end flex-row-reverse  ">
    <label className="flex w-[50px] ">عرض</label>
    <input
    className="flex w-[40px] sm:w-[60px] mx-[10px] justify-center h-[30px] items-center outline-none border-b-[1px]  text-center"
    type="number" value={entriesPerPage} onChange={(e)=>{
        setEntriesPerPage(e.target.value)
        setPage(1)
        }}></input>
    <label>سجلات</label>
</div>

<div className="flex w-[40%] justify-between items-center mt-[20px] br-[5px] ">
<button className="flex sm:w-[70px] h-[30px] justify-center items-center bg-orange-700 text-white rounded-md shadow-black shadow-md"
onClick={()=>{
    if(page-1>0){
        setPage(prev=>prev-1)
        search()
    }
    }}
    disabled={wt}
>السابق</button>
<input type="text" disabled={true} value={page+"/"+Math.ceil(total/entriesPerPage)}  className="flex w-[30px] sm:w-[60px] mx-[10px] justify-center h-[30px] items-center outline-none border-b-[1px] border-yellow-500 text-center"/>
<button className="flex sm:w-[70px]  h-[30px] justify-center items-center bg-orange-700 text-white rounded-md  shadow-black shadow-md"
onClick={()=>{
    if((entriesPerPage*page)+1<=total){
    setPage(prev=>prev+1)
    search()
}
}}

disabled={wt}
>التالي</button>
</div>
</div>
                    
                    
                    <div className="flex   items-center justify-end  sm:w-[30%] w-[70%] ml-[20%]
                    mt-[20px]  border-[1px]">
                    <div className=' flex  justify-evenly w-full  items-center mt-[20px] flex-row-reverse  '>
                        <label className="flex text-[10px] sm:text-[20px]  items-end text-blue-900 w-[70px] mt-[5px] ">بحث عن</label>
                        <input type='text'
                        value={serchName}
                        onChange={(e)=>{setSearchName(e.target.value)}}
                        className='flex justify-center w-[40%] items-center sm:w-[100px] text-right py-[1px] text-[24px] pr-[5px] rounded-sm bg-blue-950 text-white '
                        ></input>
                    </div>
                    
                    </div>

                    
                </div>
                <div className=" flex  justify-end">
                        <button 
                        onClick={()=>{search()}}
                        className=" flex justify-center items-center w-[80px] py-[5px] shadow-md shadow-blue-900 active:shadow-sm
                         bg-blue-950 text-yellow-500 rounded-md mr-[130px] mt-[30px]">ابحث</button>
                    </div>
                <div className=' flex w-full mt-[50px]'>
                <table  className=" flex flex-col w-full " align="ltr">
        <thead className="flex justify-evenly w-full h-[40px] bg-blue-950 text-white ">
    
   
    
    <th className="border-[1px]  flex-1"> </th>
    <th className="border-[1px]  flex-1">الصلاحية</th>
    <th className="border-[1px]  flex-1">اسم المستخدم</th>

    <th className="border-[1px]  flex-1">المعرف</th>
    </thead>
    {users.length>0 && users.map(us=>{
        return<tr key={us.id}>
            <div className=' flex justify-between items-end flex-row-reverse h-[40px] text-[18px] bg-blue-900 text-white border-b-[1px] border-blue-500'>
                <div className='flex flex-1 justify-center text-center'>{us.id}</div>
                <div  className='flex flex-1 justify-center text-center'>{us.name}</div>
                <div  className='flex flex-1 justify-center text-center'>{us.role}</div>
                <div  className='flex flex-1 justify-evenly text-center ml-[20px]'>
                    <div className=" flex border-[1px] border-white my-[5px] cursor-pointer"

><MdModeEditOutline size={20} color="white" onClick={()=>{
    setSelectedUser(us)
    setEShow(true)
    }}/></div>

<div className="flex cursor-pointer border-[1px] border-white my-[5px]" onClick={()=>{
// setShowDelete(true)


}}><TiDelete size={20} color="white"  onClick={()=>{
setIdDelete(us.id)
setShowDelete(true)
}}/></div>
                </div>
                
            </div>
        </tr>
    })}
                    </table>
                </div>
            </div>
            </div>
        )}
        {/* {loaded && !user  &&(<div>no user</div>)} */}
       </div>)}
       </Container>
       </div>
}
 
export default AddUsers;