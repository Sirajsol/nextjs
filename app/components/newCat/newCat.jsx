"use client"
import { useState ,useEffect} from "react";
import { SketchPicker } from "react-color";

const NewCat = () => {
    const pos=async()=>{
        console.log("pressed")
        const data=await fetch('/api/category',{
            method:'POST',
            body:JSON.stringify({currentColor,name})
    
        })
        console.log("waiting",data)
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

    useEffect(()=>{

console.log("img changed")
 if(img)dd()
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
    return <div className="flex flex-col w-[700px] h-[200px] border-[1px] bg-red-600 rounded-[10px]
    left-[600px] top-[100px]  justify-between items-center"
    onClick={()=>{if(!mouseIn){setShow(false)}
    if(!TmouseIn){setTShow(false)}
}}
    >

<div className={`flex justify-evenly w-full`}>
   

<div className="flex flex-col"
    
    >
    <label className="flex justify-center  text-white">image</label>
        <input type="file" id="img" onChange={(e)=>{setImg(e.target.files[0])
        setFileName(e.target.files[0].name)
        }} className="hidden w-[150px] h-[30px] bg-blue-950 text-white"/>
        <label  htmlFor="img" className="flex w-[150px] h-[30px] bg-blue-950 text-white cursor-pointer">{fileName}</label>
        </div>


<div className="flex flex-col items-end "
       
       >
       <label htmlFor="color" className="flex text-white font-[900]">choose a color</label> 
       
       <div id="color" style={{ backgroundColor: `${currentTextColor}` }}className={` flex  border-[1px] w-[180px] h-[30px] cursor-pointer` }
             onClick={()=>{setTShow((prev)=>{return !prev})
            setTMouseIn(true)
           }}
           onMouseEnter={()=>{setTMouseIn(true)}}
  ></div>
  
       {tshow&&<div className="flex absolute top-[50px] bg-black"
       onMouseEnter={()=>{setTMouseIn(true)}}
       onMouseLeave={()=>{setTMouseIn(false)}}
       > 
       <SketchPicker
       color={currentTextColor}
       onChangeComplete={thandlech}
       /></div>}


       
            </div>


        <div className="flex flex-col items-end "
       
        >
        <label htmlFor="color" className="flex text-white font-[900]">choose a color</label> 
        
        <div id="color" style={{ backgroundColor: `${currentColor}` }}className={` flex  border-[1px] w-[180px] h-[30px] cursor-pointer` }
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


        
             </div>


         <div className="flex flex-col"
    
    >
    <label className="flex justify-center  text-white">name</label>
        <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} className="flex w-[150px] h-[30px] bg-blue-950 text-white"/>
        
        </div>
        {/* <div style={{ backgroundColor: `${currentColor}` }}className={` flex  border-[1px] w-[100px] h-[200px]`}>hi</div> */}
    </div>
    <button className="flex   bg-orange-600 text-white font-[700] justify-center
         items-center py-[10px] rounded px-[5px]
          shadow-sm shadow-black hover:shadow-md hover:shadow-black
          
          "  
          disabled={(!name || !currentColor || !currentTextColor)}
         onClick={()=>{pos()}} >Add Category</button>
    </div>
    
}
 
export default NewCat;