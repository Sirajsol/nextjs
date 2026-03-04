"use client"
    import { useState ,useEffect} from "react";
   
import { toast } from "react-hot-toast";
const EditChair = ({chairId,setMutate,setEShow ,chair}) => {
    const [categories,setCategories]=useState([])
    const [selectedCategory,setSelectedCategory]=useState('')
    const [wt,setWt]=useState(false)
    const[title,setTitle]=useState('')
    const[editing,setEditing]=useState(false)
    useEffect(()=>{
        const cts=async()=>{
            const cs=await fetch('/api/category').then(res=>res.json())
            if(cs){setCategories(cs)}
        }
        cts()
    },[])
    const edt=async()=>{
      
        const ch=await fetch(`/api/chair/${chairId}`,{
            method:'PUT',
            body:JSON.stringify({selectedCategory,title})
        }).then(res=>{
            if(res.status=='200'){
                toast.success('تم التعدبل')
               
            }
            else{
                toast.error('! لم يتم التعديل')
            }
            setEditing(false)
            setMutate(true)
            setEShow(false)
           
        })
    }
    useEffect(()=>{
        if(chair){
            console.log("chair is ",chair)
            setSelectedCategory(chair.catId)
            setTitle(chair.title)
        }
    },[chair])

    return <div className="flex w-screen h-screen flex-col  ">
        {(<div className="flex w-screen h-screen absolute">
        <div 
      onClick={()=>{setEShow(false)}}
        className="flex w-screen h-full bg-black opacity-25">

        </div>
      {editing&&(<div className=" flex w-[400px] h-[100px] absolute bg-blue-950 text-white
        rounded-md shadow-sm shadow-white top-[200px] left-[600px]
        justify-center items-center">جاري التعديل يَرجى الإنتظار</div>
      ) }  
        </div>
        )}
      {!editing &&(  <div className="flex w-[400px] top-[250px] left-[600px] flex-col absolute bg-blue-950 px-[60px] z-40 rounded-md ">
        <div className="flex justify-between flex-row-reverse my-[30px]"> 
<label className="text-white border-b-[1px] border-yellow-300">فئة الكرسي</label>
<select
className="flex w-[60%] bg-blue-950 text-white  text-right border-b-[1px] border-yellow-300"
value={selectedCategory} onChange={(e)=>{setSelectedCategory(e.target.value)}}>
    <option>اختر فئة</option>
    {categories&&categories.length>0&&categories.map(cat=>{
        return<option key={cat.id} value={cat.title}>{cat.title}</option>
    })}
</select>
        </div>
        <div className="flex justify-between flex-row-reverse my-[20px]  "> 
<label className="text-white border-b-[1px] border-yellow-300">رمز الكرسي</label>
<input className="flex w-[60%] border-b-[1px] border-yellow-300 outline-none bg-blue-950 text-white text-right"
type="text"  value={title}onChange={(e)=>{setTitle(e.target.value)}}/>
        </div>
<div className="flex justify-end mt-[30px] py-[10px] ">
    <button
    onClick={()=>{
        // setEShow(false)
        setEditing(true)
    edt()
    }}
    className=" flex w-[70px] bg-orange-600 text-white justify-center items-center py-[10px]  rounded-md">تعديل</button>
</div>
</div>
)} 
    </div>
}
 
export default EditChair;