"use client"
    import { useState ,useEffect} from "react";
    import { SketchPicker } from "react-color";


const AddPersonCat = ({Showit}) => {

    
    const pos=async()=>{
        console.log("pressed")
        const data=await fetch('/api/personcat',{
            method:'POST',
            body:JSON.stringify({currentColor,name})
    
        })
        console.log("waiting",data)
        return data.json()
    }
    const [currentColor,setCurrentColor]=useState("#000")
   
    const[name,setName]=useState("")
    const[show,setShow]=useState(false)
   
   
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
    return  <div  className=" flex w-screen h-[1000px] absolute left-[-10px] top-[-250px] z-40">
       
    <div className=" flex w-full h-full bg-black opacity-35 absolute top-[0px] left-[0px]"
    onClick={()=>{Showit(false)}}
    ></div>
    <div className="flex flex-col w-[90%] h-[300px] border-[1px] bg-blue-950 rounded-[10px] shadow-fuchsia-50 shadow-md
    left-[5%] top-[100px]  justify-between items-center absolute "
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
   
        {show&&<div className="flex absolute top-[50px] bg-black"
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
         onClick={()=>{pos()}} >إضافة فئة</button>
    </div>
    </div>
}
 
export default AddPersonCat;