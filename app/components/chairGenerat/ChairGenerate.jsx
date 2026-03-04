"use client"
import { useState ,useEffect} from "react";
import { useRouter } from "next/dist/client/components/navigation";

const ChairGenerate = ({setShow}) => {
    // const g=JSON.parse(localStorage.getItem("gg"))
    // const router=useRouter()
    
    // if(g=='gggg'){router.push('/events')}
    const[pre,setPre]=useState("")
    const[start,setStart]=useState(0)
    const[num,setNum]=useState(0)
    const[place,setPlace]=useState("")
    const[category,setCategory]=useState("")
    const[places,setPlaces]=useState([])
    const[categories,setCategories]=useState([])
    
    
useEffect(()=>{
    const pls=async()=>{
        const {plss}=await fetch('/api/place').then(res=>res.json())
        if(plss){setPlaces(plss)}
    }
    pls()
},[])
useEffect(()=>{
    const cts=async()=>{
        const cs=await fetch('/api/category').then(res=>res.json())
        if(cs){setCategories(cs)}
    }
    cts()
},[])

    const generate=(a,b,c)=>{
        const ar=[]
        for(var i=a;i<a+b;i++){
            console.log(c+""+i)
ar.push({title:c+""+i,placeId:place,catId:category})

        }
        console.log("ar: ",ar)
        return ar
    }
   

const postcha=async()=>{
    const y=generate(start,num,pre)
const c=await fetch("/api/chair",{
method:"POST",
body:JSON.stringify(y)

}).then(res=>alert("ys"))
.catch(error=> alert(no))

}
        // if(g=='gggg'){
        //     return<div className="flex w-[500px] absolute bg-blue-950 text-white left-[400px]">redirecting, please wait...</div>
        // }
   
   return <div className="flex w-screen h-screen   absolute z-10 left-0 top-0">
   
   <div className="flex  flex-col w-[70%] mx-auto sm:w-[300px]  lg:w-[30%] lg:left-[35%] md:w-[40%] md:left-[30%] pt-[10px] h-[400px] border-[1px] absolute z-20 left-[20%]
    bg-blue-950 top-[200px]  ml-[20px] rounded-md shadow-md shadow-black ">
        <button className=" flex  w-[25px] h-[25px] justify-center bg-red-600 font-[700] shadow-white shadow-sm
        ml-[20px] hover:text-yellow-400 text-white rounded-full"
        onClick={()=>{setShow(false)}}
        >X</button>
<div className="flex flex-col w-full ">
<div className="flex flex-col  mx-[30px] ">
    <label htmlFor="" className="flex justify-end text-[20px] font-[700] text-white">مكان الفعالية</label>
    <select 
    onChange={(e)=>{setPlace(e.target.value)}}
    className="flex justify-end text-[20px] font-[700] bg-blue-950 text-white h-[30px] rounded-md text-right border-b-[1px] border-yellow-400">
        <option value="" >select</option>
         {places.length>0&& places.map(cat=> {
            return(<option key={cat.id} value={cat.name} >{cat.name}</option>)
            })}
    </select>
</div>

<div className="flex flex-col  mx-[30px] ">
    <label htmlFor="" className="flex justify-end text-[20px] font-[700] text-white">فئة الكراسي </label>
    <select 
        onChange={(e)=>{setCategory(e.target.value)}}
    className="flex justify-end text-[20px] font-[700] bg-blue-950 text-white h-[30px] rounded-md text-right border-b-[1px] border-yellow-400">
         <option value="" >select</option>
        {categories.length>0&& categories.map(cat=> {
            return(<option key={cat.id} value={cat.title}>{cat.title}</option>)
            })}
        {/* <option className="flex flex-row text-right">1</option>
        <option>2</option> */}
    </select>
</div>
<div className="flex flex-col  mx-[30px] ">
    <label htmlFor="" className="flex justify-end text-[20px] font-[700] text-white">البادئة</label>
    <select 
    onChange={(e)=>{setPre(e.target.value)}}
    className="flex justify-end text-[20px] font-[700] bg-blue-950 text-white h-[30px] rounded-md text-right border-b-[1px] border-yellow-400">
        <option>A</option>
        <option>B</option>
        <option>C</option>
        <option>D</option>
        <option>E</option>
        <option>F</option>
        <option>G</option>
        <option>H</option>
        <option>I</option>
        <option>J</option>
        <option>K</option>
        <option>L</option>
        <option>M</option>
        <option>N</option>
        <option>O</option>
        <option>P</option>
        <option>K</option>
        <option>R</option>
        <option>S</option>
        <option>T</option>
        <option>U</option>
        <option>V</option>
        <option>W</option>
        <option>X</option>
        <option>Y</option>
        <option>Z</option>
    </select>
</div>
<div className="flex flex-col  mx-[30px] ">
    <label htmlFor="" className="flex justify-end text-[20px] font-[700] text-white">رقم البداية</label>
   <input type='number' min={1}  
   onChange={(e)=>{setStart(parseInt(e.target.value))}}
   className="flex justify-end text-[20px] font-[700] bg-blue-950 text-white h-[30px] rounded-md text-right border-b-[1px] border-yellow-400" />
</div>

<div className="flex flex-col  mx-[30px] ">
    <label htmlFor="" className="flex justify-end text-[20px] font-[700] text-white">عدد الكراسي</label>
   <input type='number'min={1} 
    onChange={(e)=>{setNum(parseInt(e.target.value))}}
   className="flex justify-end text-[20px] font-[700] bg-blue-950 text-white h-[30px] rounded-md text-right border-b-[1px] border-yellow-400" />
</div>
<div className="flex justify-end mx-[30px] mt-[20px]">
<button 
disabled={(!start || !pre || !num ||!place || !category)}
onClick={(e)=>{
    postcha()
    console.log(start,num,pre,category,place)
    generate(start,num,pre)
}}
className="flex bg-orange-600 text-white  py-[10px] disabled:cursor-not-allowed px-[20px] rounded-sm shadow-sm shadow-white hover:text-yellow-300">توليد الكراسي</button>
</div>

</div>
    </div>
    <div className="flex bg-black w-screen h-screen  opacity-30 absolute z-10 left-0 top-0"
    onClick={()=>{setShow(false)}}
    ></div>
    </div>
}
 
export default ChairGenerate;