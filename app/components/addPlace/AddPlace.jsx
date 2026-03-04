"use client"
import { Hidden } from "@mui/material";
import { useState,useEffect } from "react";
import { toast } from "react-hot-toast";
import{getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"
import { initializeApp } from "firebase/app";
// import firebaseApp from '../../../utils/fireBase'

const AddPlace = ({setShow,setMutate,setWt}) => {

    const firebaseConfig = {
        apiKey: "AIzaSyDYkMNoQJm0L_AbLzz6h5qklpXuJ7oQRd0",
        authDomain: "ecomm-4f1f2.firebaseapp.com",
        projectId: "ecomm-4f1f2",
        storageBucket: "ecomm-4f1f2.appspot.com",
        messagingSenderId: "1056472236370",
        appId: "1:1056472236370:web:44af783c0d1c683d14fa8b"
      };
      
      // Initialize Firebase
      const firebaseApp = initializeApp(firebaseConfig);

    const[inbox,setInBox]=useState(false)
    const [name,setName]=useState('')
    const [enName,setEnName]=useState('')
    const[img,setImg]=useState(null)
    const[seatPlan,setSeatPlan]=useState('')
    const[imgData,setImgData]=useState('')
    const dd=()=>{
      const reader=new FileReader()
      // const data= reader.readAsDataURL(img)
      reader.addEventListener("load",(e)=>{
          // setImgData(reader.result.substring(reader.result.indexOf(",")+1))
          setImgData(reader.result)
          console.log(imgData)
      })
      reader.readAsDataURL(img)
  }
  
  const postit=async()=>{
    setShow(false)
    setWt(true)
    const {placce}= await fetch('/api/place',{
      method:'POST',
      body:JSON.stringify({name,enName,seatPlan,imgData})
    }).then(rs =>{
      
      console.log("yes")
      toast.success('تمت إضافة مكان')
    return rs.json()
    }).catch(error=>console.log(error))
    // if(dat.ok){console.log("it is ok from inside add place")}
    if(placce){
     
      return dat.json()
    }
    setMutate(true)
    
  }
  //     useEffect(()=>{
  
  // console.log("img changed")
  //  if(img)dd()
  //     },[img])
      useEffect(()=>{
      const handleImageUploads=async()=>{
       
        try{

    if (img){ //item has color and colorcode and image
      toast("...جاري تحميل الصورة,يرجى الانتظار")
const fileName=new Date().getTime()+'-'+img.name
const storage=getStorage(firebaseApp)
const storageRef=ref(storage,`products/${fileName}`)//the path to store images in firebase
const uploadTask=uploadBytesResumable(storageRef,img)
await new Promise((resolve,reject)=>{/* creating a promise ,anything else will wait
                                                      until  the promise complete*/ 
    uploadTask.on(
        'state_changed',
        (snapshot)=>{

            const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
            console.log('upload is '+progress+'% done')

switch(snapshot.state){
    case 'paused':
        console.log('upload is paused');
        break;
        case 'running':
        console.log('upload is running')
        break;
}

        },
       ( error)=>{
        console.log('Error uploading image',error)
        reject(error)
       }
       ,()=>{
           // handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURl)=>{
           setImgData(downloadURl)
            console.log('file available at ',downloadURl)
            resolve()
        }).catch((error)=>{
            console.log('error gwtting the downloadable url ',error)
            reject(error)
        }
        );
       }
    )
})

    }

        }
        catch(error){
            setIsLoading(false)
            console.log('Error handling image upload ',error)
            return toast.error('Error handling image upload')
        }
    }
    handleImageUploads()
},[img])



    return <div  className=" flex w-full h-full">
       
        <div className=" flex w-full h-full bg-black opacity-35 absolute top-[0px] left-[0px] pb-[20px]"
        onClick={()=>{setShow(false)}}
        ></div>
        <div className=" flex flex-col justify-evenly w-full left-[0px] h-[400px] sm:w-[500px] sm:h-[500px] bg-blue-950 z-20 
        absolute top-[100px] sm:left-[15%] md:left-[30%]  items-center
        border-[2px] border-yellow-600 rounded-[10px] shadow-white shadow-md"
        onMouseEnter={()=>{setInBox(true)}}
        onMouseLeave={()=>{setInBox(false)}}
        >
            <div className="flex w-[90%] mx-auto justify-between ">
               
                <input type=" text"
                value={name} onChange={(e)=>{setName(e.target.value)}}
                className="flex  w-[60%] h-[30px] p-[5px]  rounded-sm text-[20px] text-right"/>
                <label className=" flex w-[35%]  text-white text-[20px] justify-end  border-b-[1px] border-yellow-500">الاسم</label>
            </div>
            <div className="flex w-[90%] mx-auto justify-between ">
               
              <input type=" text" 
                value={enName} onChange={(e)=>{setEnName(e.target.value)}}
              className="flex  w-[60%] h-[30px] p-[5px]  rounded-sm text-[20px] text-right"/>
                      <label className=" flex w-[35%]  text-white text-[20px] justify-end  border-b-[1px] border-yellow-500">الاسم الأجنبي</label>
           </div>
           <div className="flex flex-col w-[100%] mx-auto justify-between ">
               <div className=" flex w-[90%]  mx-auto " >
              <select 
              value={seatPlan}   onChange={(e)=>{setSeatPlan(e.target.value)}}
              className="flex   w-[60%] h-[40px] p-[5px]  rounded-sm text-[20px] mr-[20px] text-right">
<option></option>
                <option value="صفوف و أعمدة">صفوف و أعمدة</option>
                <option value="دائري">دائري</option>
              </select>
                      <label className=" flex w-[35%]  text-white text-[20px] justify-end items-end border-b-[1px] border-yellow-500">خطة التجليس</label>
                      </div>
                      <div className="flex max-w-[62%] mr-[30%] overflow-hidden ">
                        <div className=" flex flex-col mt-[15px] ml-[25px] w-[50%]">
                       
                        <label className="flex text-white text-[18px] font[700] justify-end mr-[15px]">عدد الأعمدة</label>
                        <input type="number" className="flex rounded-sm w-[90%] h-[30px] border-b-[1px] border-yellow-400" min={1}/>
                        </div>

                        <div className="flex flex-col mt-[15px] w-[50%]">
                        
                        <label className="flex text-white text-[18px] font[700] justify-end mr-[15px] ">عدد الصفوف</label>
                        <input type="number" className="flex rounded-sm w-[90%] h-[30px] border-b-[1px] border-yellow-400" min={1}/>
                        </div>
                       
                      </div>
           </div>
           <div className="flex w-[90%] mx-auto justify-between ">
               
              <input type="file" id="img" className="hidden"
              onChange={(e)=>{setImg(e.target.files[0])}}
              // onChange={(e)=>{setImgData(e.target.files[0].name)}}
              />
              <label htmlFor="img" className=" flex text-[18px] w-[60%] justify-center cursor-pointer bg-white rounded-sm border-b-[2px]  border-yellow-400">اختر صورة</label>
                      <label  htmlFor="img" className=" flex w-[35%]  text-white text-[20px] justify-end cursor-pointer  border-b-[1px] border-yellow-500">مخطط الكراسي</label>
           </div>
           <div className="flex w-[90%] mx-auto justify-center ">
               
              <button 
              onClick={()=>{postit()}}
              disabled={(!name || !enName || !seatPlan)}
              className="bg-orange-600 text-white font-[700] border-sm py-[5px] px-[30px] text-[18px]
               shadow-white shadow-sm hover:shadow-md hover:shadow-white rounded-sm mr-[25px] disabled:cursor-not-allowed">إضافة</button>
           </div>
           
        </div>
        </div>
  
}
 
export default AddPlace;