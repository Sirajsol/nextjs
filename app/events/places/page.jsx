"use client"
import AddPlace from "../../components/addPlace/AddPlace";
import {useState,useEffect} from 'react'
import TableRow from "../../components/TabelRow";
import { toast } from "react-hot-toast";
import EditPlace from "../../components/EditPlace";
import PlaceTableRow from "../../components/PlaceTableRow";
import Container from "../../components/Contaner";
import Load from "@/app/components/load";
import { useCntxt } from "@/app/context/context";
import BadConnection from "@/app/components/badConnection";
import { useRouter } from 'next/navigation';
const Places = () => {
    const toggle=(s)=>{
        return !s
    }
    const router=useRouter()
    const {user,setUser,loaded,wait,setWait}=useCntxt()
    const[wt,setWt]=useState(false)
const[places,setPlaces]=useState(null)
const[eShow,setEShow]=useState(false)
const[place,setPlace]=useState(null)
const[mutate,setMutate]=useState(false)
const[isDeleteing,setIsDeleteing]=useState(false)
const[showDelete,setShowDelete]=useState(false)
const[badConnection,setBadConnection]=useState(false)
    useEffect(()=>{
       
        const pls=async()=>{
            setWt(true)
            setBadConnection(false)
            console.log('the response is --------------------------------')
                                                     //.then(res=>{ res.json() is fuckin wrong without return 
                                                     //or delete the fuckin {} while it is only 1 fuckin line
            const {plss}= await fetch('/api/place/').then(res=>{return res.json()
                
                })
                .catch((error)=>{toast.error("خطأ")
            setBadConnection(true)
            setWait(false)
            setWt(false)
            setMutate(false)
            })
            
            
            if(plss){
               
                // alert("ps is",plss)
                setPlaces(plss)
            console.log("in place page ps is ",plss)
            setWait(false)
            setWt(false)
            setMutate(false)
            }

            // setWait(false)
        }
        pls()
    },[mutate])
    

    // useEffect(()=>{
    //     setWait(true)
        
    //     const pls=async()=>{
    //         console.log('the response isss --------------------------------')
    //        const e=await fetch('/api/place')
    //        if(e)
    //       {
    //         const jj=await e.json()
    //         if(jj)setPlaces(jj.plss)
    //         console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',jj.plss)
    //       } 
    //       else {
    //         console.log('noooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo')
    // setBadConnection(true)
    //       }
    //       setWait(false)
    //       setWt(false)
    //     }
    //     pls()
    // },[])


    const[show,setShow]=useState(false)
    return <Container>

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
        
    <div className=" flex w-full flex-col h-full items-end relative">
    {/* {(!wait&&!wt) &&(!places|| (places==null)|| places.length==0)&&badConnection&&(  <div className='flex text-[10px] w-[60%] mr-[20%] bg-blue-900 h-[80px]
         rounded-[15px] text-center
          text-blue-300 justify-center items-center sm:text-[25px] shadow-black shadow-lg '>
           {places} ممممم يبدو انا هنالك مشكلة بالاتصال</div>)} */}
           {badConnection&&(  <div className='flex text-[10px] w-[60%] mr-[20%] bg-blue-900 h-[80px]
         rounded-[15px] text-center
          text-blue-300 justify-center items-center sm:text-[25px] shadow-black shadow-lg '>
           {places} ممممم يبدو انا هنالك مشكلة بالاتصال</div>)}
 
         <label htmlFor="" className='flex mr-[50px] text-blue-800 font-[900] text-[25px]'>الفعاليات/مكان الفعالية</label>
        <div className='flex h-[30px]'></div>
        <button className='flex bg-orange-600 w-[80px] py-[5px] items-center justify-center rounded-md
         shadow-black shadow-sm hover:shadow-md hover:shadow-black hover:text-blue-400 text-white font-[700] text-[20px] mr-[50px]'
        onClick={()=>{setShow(true)}}
       
        
        >إضافة</button>

        <div className={`${show?"flex":"hidden"} w-full h-screen absolute`}> <AddPlace setShow={setShow} setMutate={setMutate} setWt={setWt} /></div>

        {/* {wait&&(<div className="flex justify-center items-center absolute top-[150px] bg-blue-900 w-[400px] h-[80px] left-[500px] text-white
      text-[30px] px-[40px] shadow-black shadow-md rounded">الرجاء الإنتظار</div>)} */}

{(wait ||wt)&&(<Load/>)}


        {eShow &&(<EditPlace setEShow={setEShow} place={place} setMutate={setMutate}/>)}
        <table  className=" flex flex-col w-[94%] mx-auto border-[1px] border-black mt-[30px]" align="ltr">
{/* <thead className="flex  w-full h-[40px] bg-slate-500">
    
    <th className="border-[1px]  flex-1"></th>
    <th className="border-[1px]  flex-1">عددالدعوات العامة</th>
    <th className="border-[1px]  flex-1">عدد الدعوات المرسلة</th>
    <th className="border-[1px]  flex-1">الوقت</th>
   
    <th className="border-[1px]  flex-1">التاريخ</th>
    <th className="border-[1px]  flex-1">الاسم</th>
    <th className="border-[1px]  flex-1">المعرف</th>
    </thead> */}
    <thead className=" flex w-full bg-blue-300  h-[50px] border-b-[1px] border-yellow-500 mb-[2px] shadow-black shadow-sm">
    
    {/* <div className=" flex w-full bg-blue-700  h-[50px] border-[1px] mb-[2px]"> */}
   
    {/* <th className="flex flex-1 border-b-[1px] "></th> */}
        {/* <th className="flex flex-1 justify-center  border-b-[1px] text-[18px] font-[800] text-blue-800">عددالدعوات العامة</th>
        <th className="flex flex-1 justify-center  border-b-[1px] text-[18px] font-[800] text-blue-800">عددالدعوات المرسلة</th> */}
        <th className="flex flex-1 justify-center  border-b-[1px] text-[14px] sm:text-[18px] font-[800] text-blue-800">خطة التجليس</th>
        <th className="flex flex-1 justify-center  border-b-[1px] text-[14px] sm:text-[18px] font-[800] text-blue-800">الاسم الأجنبي</th>
        <th className="flex flex-1  flex-row justify-center border-b-[1px] text-[14px] sm:text-[18px] font-[800] text-blue-800">الاسم</th>
        <th className="flex flex-1  flex-row justify-center border-b-[1px] text-[14px] sm:text-[18px]  font-[800] text-blue-800">المعرف</th>
        {/* </div> */}

</thead>
{!wait && places&& places.length>0&& places.map(pls=>{
    return     (<tr key={pls.id}>
<PlaceTableRow place={pls} setEShow={setEShow} setPlace={setPlace} setMutate={setMutate} setIsDeleting={setIsDeleteing}/>
{/* <TableRow id={1} name={"data"} date={"12-2-2023"} time={"10:34"} sentNumer={5} generalNumber={8} /> */}
    </tr>)

})}
{/* {wait&& <div>wait</div>} */}
    {/* <tr>
    
    <TableRow id={1} name={"data"} date={"12-2-2023"} time={"10:34"} sentNumer={5} generalNumber={8} />
   
</tr>

<tr>
    
     <TableRow id={1} name={"data"} date={"12-2-2023"} time={"10:34"} sentNumer={5} generalNumber={8} />
    
</tr>

<tr>
    
     <TableRow id={1} name={"data"} date={"12-2-2023"} time={"10:34"} sentNumer={5} generalNumber={8} />
    
</tr> */}



</table>
        </div>
        </Container>
}
 
export default Places;