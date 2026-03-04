"use client"
import { useState ,useEffect} from 'react'
import Style from './page.module.css'
import NewCat from '../newCat/newCat'
import DatePicker from 'react-datepicker'
import DateTime from 'react-datetime'
import "react-datetime/css/react-datetime.css"
import { toast } from 'react-hot-toast'
import{getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"
import { initializeApp } from "firebase/app";
// import firebaseApp from '../../../utils/fireBase'
// import 'react-datepicker/dist/react-datepicker.module.css'
const EditEvent = ({id,setShow,evvt,setMutate}) => {
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

    // alert('again')
   const[wt,setWt]=useState(false)
    const[name,setName]=useState('')
    const[startTime,setStartTime]=useState('')
    const[endTime,setEndTime]=useState('')
    const[description,setDescription]=useState('')
    const[startHour,setStartHour]=useState(0)
    const[startMinute,setStartMinute]=useState(0)
    const[endHour,setEndHour]=useState(0)
    const[endminute,setEndMinute]=useState(0)
    const [selectedDate,setSelectedDate]=useState('d')
const [places,setPlaces]=useState([])
const [selectedPlace,setSelectedPlace]=useState('')
const[img,setImg]=useState(null)
const[imgData,setImgData]=useState('')
const[timeTerm,setTimeTerm]=useState('')
const[arMessage,setArMessage]=useState('')
const[enMessage,setEnMessage]=useState('')
const[evt,setEvt]=useState(null)
const[wait,setWait]=useState(false)
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
// useEffect(()=>{
  
//     console.log("img changed")
//      if(img)dd()
//         },[img])

        // useEffect(()=>{
        //     const even=async()=>{
        //         console.log("id ",id)
        //         setWait(true)
        //         const evvt=await fetch(`/api/event/${id}`).then(res=>res.json())
        //         if(evvt){setEvt(evvt)
        //         setWait(false)
        //         }
        //     }
        //     even()
        // },[id])
    
        useEffect(()=>{
            setWait(true)
            if(evvt){
           setName(evvt.title)
           setSelectedPlace(evvt.placeId)
          setArMessage(evvt.arMessage)
          setEnMessage(evvt.enMessage)
          setDescription(evvt.description)
          setImgData(evvt.img)
          setTimeTerm(evvt.time)
          setSelectedDate(evvt.date)
         setStartTime(evvt.time.substring(0,5))
         setEndTime(evvt.time.substring(6))
            }
            setWait(false)
        },[evvt,img])


useEffect(()=>{
setTimeTerm(startTime+"-"+endTime)
},[startTime,endTime])
    useEffect(()=>{
        const pls=async()=>{
            const {plss}=await fetch('/api/place').then(res=>res.json())
            if(plss){setPlaces(plss)}
        }
        pls()
    },[])
    const posevent=async()=>{
        setWait(true)
        const ev=await fetch(`/api/event/${id}`,{
            method:'PUT',
            body:JSON.stringify({title:name,placeId:selectedPlace,date:selectedDate,time:timeTerm,description,img:imgData,enMessage,arMessage})
        }).then(rs =>{
            if(rs.status=='200')
            toast.success("تم التعديل")
            // return res.json()
        }
            ).catch(error=>toast.error("لم يتم التعديل"))
        // if(ev)
        {
            setShow(false)
            setWait(false)
            setMutate(true)
        //   return ev.json()
        }
  
    
    }


    useEffect(()=>{


        const handleImageUploads=async()=>{
            toast("...جاري تحميل الصورة,يرجى الانتظار")
            try{
    
        if (img){ //item has color and colorcode and image
    
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
                toast("تم تحميل الصورة")
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
       if(img) handleImageUploads()
    },[img])

    return <div className={`${Style.container} `}
    >
        <div className='flex absolute w-full h-[750px] top-[0px] bg-black opacity-30 '
        onClick={()=>{setShow(false)}}
        ></div>
        {wait &&(<div className='flex w-[400px] h-[100px]  bg-blue-950 text-white shadow-md shadow-white rounded-md
 left-[600px] top-[100px] justify-center items-center absolute z-30' >جاري التعديل</div>)}
    
    {/* { !evt&&(<div className="flex bg-blue-950 text-white text-[30px] py-[10px] border-1[px] shadow-white shadow-md absolute left-[400px]
    top-[200px] w-[600px] rounded-sm justify-center items-center
    ">الرجاء الانتظار</div>)}
  */}
   {!wait && evvt&& (<div className={Style.actContainer}>
   
 <div className={Style.deualElement}>
    
    
    <div className={Style.element}>
    <select value={selectedPlace} onChange={(e)=>{setSelectedPlace(e.target.value)}}>
{places.length>0&& places.map(place=>{return (
    <option key={place.id} value={place.name}>{place.name}</option>
)})}
        {/* <option className={Style.optionn}>1</option>
        <option >2</option>
        <option>3</option>
        <option>4</option> */}
    </select>
        {/* <label htmlFor="" className='text-black'>المكان</label> */}
        
        < label htmlFor="" className={Style.llb}>المكان</label>
    </div>

    <div className={Style.element}>
        
        <input type='text' value={name}  onChange={(e)=>{setName(e.target.value)}} className={Style.innput}/>
        <label htmlFor="" className={Style.llb}>الاسم</label>
    </div>
    </div>

    <div className={Style.deualElement}>
    <div className={Style.element}>
    {/* <input type='text' className={Style.innput}/ > */}
    <div className='flex'>
   <input
    type='date'
    value={selectedDate}
    onChange={(e)=>{
        
        // e.preventDefault()
        setSelectedDate(e.target.value)}}
    className='flex w-[200px] bg-blue-950 text-white'
    id='date'
    aria-activedescendant='true'
    />
       
    </div>
 
        <label htmlFor="date" className={Style.llb}>التاريخ</label>
    </div>

    <div className={`${Style.element} `}>

        {/* <div className={Style.deualElement}>
            <div className={`${Style.deualElement}  border-[1px] mx-[5px] border-black py-[5px]`}>
        
    <input type='text' max={23} min={0} className={Style.timee}
   value={endHour}
   onChange={(e)=>{
    if(parseInt(e.target.value).toString()!="NaN"){

        if(e.target.value>23){
            setEndHour(e.target.value%24)
        }
        else {setEndHour(e.target.value)}
    }
       
   }}

    />
    <h5>:</h5>
    <input type='text' max={59} min={0} className={Style.timee} unselectable=''
    
    value={endminute}
    onChange={(e)=>{
        if(parseInt(e.target.value).toString()!="NaN"){
        if(e.target.value>59){
            setEndMinute(e.target.value%60)
        }
        else {setEndMinute(e.target.value)}
    }
    }}
    />

    </div>
    

    <div className={`${Style.deualElement} border-[1px] mx-[5px] border-black py-[5px]`}>
    
    <input type='text' max={23} min={0} className={Style.timee}
     value={startHour}
     onChange={(e)=>{
        if(parseInt(e.target.value).toString()!="NaN"){
         if(e.target.value>23){
             setStartHour(e.target.value%24)
         }
         else {setStartHour(e.target.value)}
     }}
    }
    />
    <h5>:</h5>
    <input type='text' max={59} min={0} className={Style.timee} unselectable=''
    
    value={startMinute}
    onChange={(e)=>{
        if(parseInt(e.target.value).toString()!="NaN"){
        if(e.target.value>59){
            setStartMinute(e.target.value%60)
        }
        else {setStartMinute(e.target.value)}
    }}
}
    />
    
    </div>
    </div> */}
    <div className=' flex justify-center'>
        <input type='time'  value={startTime} onChange={(e)=>{setStartTime(e.target.value)}} className='flex w-[75px]  bg-blue-950 text-white'/>
    <label htmlFor="" >إلى</label>
    <input type='time' value={endTime} onChange={(e)=>{setEndTime(e.target.value)}}  className='flex w-[75px]  bg-blue-950 text-white'/>
    {/* <label htmlFor="">من</label> */}
    </div>
    
        <label htmlFor="" className={Style.llb}>الوقت</label>
    </div>
    </div>
    <div className={Style.deualElement}>
    <div className={`${Style.element}`}>
        <input type='text' 
        value={description}
        onChange={(e)=>{setDescription(e.target.value)}}
        className='flex bg-blue-950 text-white text-[20px]
            rounded w-[200px] text-right'/>
        <label htmlFor="pic"className={Style.llb}>وصف</label>
        </div>
    <input type='file' 
     onChange={(e)=>{setImg(e.target.files[0])}}
    //  onChange={(e)=>{setImgData(e.target.files[0].name)}}
      id='pic' className=' hidden'/  >
    <div className={Style.element}>
    
        
        <div className={Style.fl}>       
         <label htmlFor="pic"
         
         className='flex bg-blue-950 text-white w-[200px] justify-center rounded border-b-[2px] border-yellow-400 cursor-pointer h-[30px]' >اختر صورة</label>
</div>
        <label htmlFor="pic" className={Style.llb} >صورة</label>
    </div>
    </div>

    <div className={Style.deualElement}>
    
    
    <div className={Style.element}>
    <textarea  
     value={enMessage}
     onChange={(e)=>{setEnMessage(e.target.value)}}
    
    className='flex bg-blue-950 text-white text-right rounded-sm w-[200px] px-[5px]'>

    </textarea>
        {/* <label htmlFor="" className='text-black'>المكان</label> */}
        <label htmlFor="" className={Style.llb}>الرسالة الإنكليزية</label>
        
    </div>

    <div className={Style.element}>
        
    <textarea 
    value={arMessage}
    onChange={(e)=>{setArMessage(e.target.value)}}
    className='flex bg-blue-950 text-white text-right rounded-sm w-[200px] px-[5px] ml-[10px]'>

</textarea>
<label htmlFor="" className={Style.llb}>الرسالة العربية</label>
    </div>
    </div>

    <div className='flex w-full justify-end items-center h-[120px]'>
        <button className='flex w-[90px]  py-[10px] bg-orange-700 text-[20px]
     shadow-black shadow-md active:shadow-yellow-500 active:text-[18px] active:w-[80px]
      text-white rounded-sm justify-center mr-[180px] mb-[10px] mt-[50px] items-center
      hover:border-yellow-300 hover:border-[1px] 
      '
      onClick={()=>{posevent()}}>
        تعديل</button></div>
 
    
</div>
)}
{/* <NewCat/> */}
    </div>
}
 
export default EditEvent;