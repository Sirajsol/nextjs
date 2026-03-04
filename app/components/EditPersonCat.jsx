"use client"
    import { useState ,useEffect} from "react";
    import { SketchPicker } from "react-color";
import { toast } from "react-hot-toast";


const EditPersonCat = ({setEShow, cat,setMutate}) => {

    
    const pos=async()=>{
        console.log("pressed")
        setEditing(true)
        const data=await fetch(`/api/personcat?id=${cat.id}`,{
            method:'PUT',
            body:JSON.stringify({color:currentColor,title:name})
    
        }).then(res=>{
            if(res.status=='200'){
                toast.success('تم التعديل')
                setEShow(false)
                setMutate(true)
            }
            else{
                toast.error('! لم يتم التعديل')
            }
            setEditing(false)

        })
        console.log("waiting",data)
        return data.json()
    }
    const [currentColor,setCurrentColor]=useState("#000")
   
    const[name,setName]=useState("")
    const[show,setShow]=useState(false)
    const[editing,setEditing]=useState(false)
   useEffect(()=>{
    if(cat){
        setName(cat.title)
        setCurrentColor(cat.color)
    }
   },[])
    const[mouseIn,setMouseIn]=useState(true)
   


    const[img,setImg]=useState(null)
    const[imgdata,setImgData]=useState("")




    const handlech=(color)=>{
        setCurrentColor(color.hex)
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
    onClick={()=>{setEShow(false)}}
    ></div>
    {editing&&(<div className='flex w-[400px] h-[100px]  bg-blue-950 text-white shadow-md shadow-white rounded-md
 left-[600px] top-[100px] justify-center items-center absolute z-30' >جاري التعديل</div>)}
    
    {!editing&&(  <div className="flex flex-col w-[500px] h-[300px] border-[1px] bg-blue-950 rounded-[10px] shadow-fuchsia-50 shadow-md
    left-[600px] top-[100px]  justify-between items-center absolute "
    onClick={()=>{if(!mouseIn){setShow(false)}
    
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
        
        <div id="color" style={{ backgroundColor: `${currentColor}` }}className={` flex  border-[1px] w-[150px] h-[30px] cursor-pointer rounded-sm` }
              onClick={()=>{setShow((prev)=>{return !prev})
             setMouseIn(true)
            }}
            onMouseEnter={()=>{setMouseIn(true)}}
   ></div>
   
        {show&&<div className="flex absolute top-[50px] bg-black border-[1px]" 
        onMouseEnter={()=>{setMouseIn(true)}}
        onMouseLeave={()=>{setMouseIn(false)}}
        > 
        <SketchPicker
        color={currentColor}
        onChangeComplete={handlech}
        /></div>}

<label htmlFor="color" className="flex w-[150px] mr-[20px] text-white text-[25px] justify-end border-b-[1px] border-yellow-400 ml-[70px]">اللون</label> 
       
        
             </div>


            
        {/* <div style={{ backgroundColor: `${currentColor}` }}className={` flex  border-[1px] w-[100px] h-[200px]`}>hi</div> */}
    </div>
    <button className="flex   bg-orange-600 text-white font-[700] justify-center
         items-center  rounded px-[15px] mb-[30px] disabled:cursor-not-allowed
          shadow-sm shadow-black hover:shadow-md hover:shadow-black text-[25px]
          
          "  
          disabled={(!name || !currentColor )}
         onClick={()=>{pos()}} >تعديل فئة</button>
    </div>)}
    </div>
}
 
export default EditPersonCat;