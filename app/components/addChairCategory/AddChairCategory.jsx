"use client"
    import { useState ,useEffect} from "react";
    import { SketchPicker } from "react-color";
import { toast } from "react-hot-toast";
import{getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"
import { initializeApp } from "firebase/app";
// import firebaseApp from '../../../utils/fireBase'


const AddChairCategory = ({Showit,setMutate}) => {
    
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
   
        const pos=async()=>{
            console.log("pressed")
            const data=await fetch('/api/category',{
                method:'POST',
                body:JSON.stringify({currentColor,name,currentTextColor,imgdata})
        
            }).then(res=>{
                if(res.status=='200'){
                    toast.success('تمت إصافة فئة')
                    setMutate(true)
                }
            })
            console.log("waiting",data)
           if(data) setMutate(true)
            return data.json()
        }
        const [currentColor,setCurrentColor]=useState("#000")
        const [currentTextColor,setCurrentTextColor]=useState("#000")
        const[name,setName]=useState("")
        const[show,setShow]=useState(false)
        const[tshow,setTShow]=useState(false)
        const[st,setSt]=useState("flex w-[200px] h-[200px] bg-red-500")
        const[mouseIn,setMouseIn]=useState(true)
        const[TmouseIn,setTMouseIn]=useState(true)
    const[fileName,setFileName]=useState("")
    
    
        const[img,setImg]=useState(null)
        const[imgdata,setImgData]=useState("")
    const dd=()=>{
        const reader=new FileReader()
        // const data= reader.readAsDataURL(img)
        reader.addEventListener("load",(e)=>{
            // setImgData(reader.result.substring(reader.result.indexOf(",")+1))
            setImgData(reader.result)
            console.log(imgdata)
        })
        reader.readAsDataURL(img)
    }
    
    //     useEffect(()=>{
    
    // console.log("img changed")
    //  if(img)dd()
    //     },[img])
    
    
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


        const handlech=(color)=>{
            setCurrentColor(color.hex)
            // alert(color.hex)
            // setShow(false)
            // setSt("#21143a")
          
        //   setSt("bg-["+currentColor+"]")
        }
        const thandlech=(color)=>{
            setCurrentTextColor(color.hex)
            // alert(color.hex)
            // setShow(false)
            // setSt("#21143a")
          
        //   setSt("bg-["+currentColor+"]")
        }
        const appstyle={
            backgroundColor:currentColor,
            width:"40px",
            height:"40px"
        }
        return  <div  className=" flex w-screen h-screen ">
       
        <div className=" flex w-full h-full bg-black opacity-35 absolute top-[0px] left-[0px]"
        onClick={()=>{Showit(false)}}
        ></div>
        <div className="flex flex-col sm:w-[400px] sm:left-[20%] w-[90%] left-[5%] md:w-[450px] md:left-[25%] lg:w-[500px] lg:left-[35%] h-[400px] border-[1px] bg-blue-950 rounded-[10px] shadow-fuchsia-50 shadow-md
         top-[100px]  justify-between items-center absolute "
        onClick={()=>{if(!mouseIn){setShow(false)}
        if(!TmouseIn){setTShow(false)}
    }}
        >
    
    <div className={`flex flex-col justify-evenly w-full mt-[20px]`}>
       
    
    {/* <div className="flex flex-col"
        
        > */}
       
            <div className="flex  justify-end  items-end mt-[30px]"
        
        >
        
            <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} className="flex w-[150px] h-[30px] bg-blue-950 text-white border-[1px] text-right rounded-sm"/>
            <label className="flex  w-[150px]   text-white mr-[20px] justify-end items-end text-[25px] border-b-[1px] border-yellow-400 ml-[70px]">الاسم</label>
            </div>
    
    <div className="flex justify-end items-end mt-[30px]"
           
           >
     
           
           <div id="color" style={{ backgroundColor: `${currentTextColor}` }}className={` flex  border-[1px] w-[150px] h-[30px] cursor-pointer rounded-sm` }
                 onClick={()=>{setTShow((prev)=>{return !prev})
                setTMouseIn(true)
               }}
               onMouseEnter={()=>{setTMouseIn(true)}}
      ></div>

      
           {tshow&&<div className="flex absolute top-[50px] bg-black right-[300px] "
           onMouseEnter={()=>{setTMouseIn(true)}}
           onMouseLeave={()=>{setTMouseIn(false)}}
           > 
           <SketchPicker
           color={currentTextColor}
           onChangeComplete={thandlech}
           /></div>}
    
          <label htmlFor="color" className="flex w-[150px] mr-[20px] text-white  justify-end text-[25px] border-b-[1px] border-yellow-400 ml-[70px]">اللون</label> 
           
                </div>
    
    
            <div className="flex justify-end items-end mt-[30px]"
           
            >
            
            <div id="color" style={{ backgroundColor: `${currentColor}` }}className={` flex  border-[1px] w-[150px] h-[30px] cursor-pointer rounded-sm` }
                  onClick={()=>{setShow((prev)=>{return !prev})
                 setMouseIn(true)
                }}
                onMouseEnter={()=>{setMouseIn(true)}}
       ></div>
       
            {show&&<div className="flex absolute top-[50px] bg-black"
            onMouseEnter={()=>{setMouseIn(true)}}
            onMouseLeave={()=>{setMouseIn(false)}}
            > 
            <SketchPicker
            color={currentColor}
            onChangeComplete={handlech}
            /></div>}
    
    <label htmlFor="color" className="flex w-[150px] mr-[20px] text-white text-[25px] justify-end border-b-[1px] border-yellow-400 ml-[70px]">لون النص</label> 
           
            
                 </div>
    
    
                 <div className="flex w-full justify-end mt-[20px]"
        
        >
       
            <input type="file" id="img" onChange={(e)=>{setImg(e.target.files[0])
            setFileName(e.target.files[0].name)
            }} className="hidden w-[150px] h-[30px] bg-blue-950 text-white"/>
            <label  htmlFor="img" className="flex w-[150px] h-[30px] cursor-pointer justify-end border-[1px]  text-white rounded-sm">{fileName}</label>
            <label className="flex   w-[150px]   text-white mr-[20px] justify-end items-end text-[25px] border-b-[1px] border-yellow-400 ml-[70px]">الصورة</label>
            </div>
            {/* <div style={{ backgroundColor: `${currentColor}` }}className={` flex  border-[1px] w-[100px] h-[200px]`}>hi</div> */}
        </div>
        <button className="flex   bg-orange-600 text-white font-[700] justify-center
             items-center  rounded px-[15px] mb-[30px] disabled:cursor-not-allowed
              shadow-sm shadow-black hover:shadow-md hover:shadow-black text-[25px]
              
              "  
              disabled={(!name || !currentColor || !currentTextColor)}
             onClick={()=>{pos()}} >إضافة فئة</button>
        </div>
        </div>
    }
 
export default AddChairCategory;