"use client"
import { useState ,useEffect} from 'react';
import AddChairCategory from '../../components/addChairCategory/AddChairCategory'
import{useCntxt} from '../../context/context'
import { useRouter } from 'next/navigation';
import EditChairCategory from '../../components/EditChairCategory'
import ChairCategoryRow from '../../components/ChairCategoryRow'
import Container from '../../components/Contaner';
import { toast } from 'react-hot-toast';
import Load from '@/app/components/load';
const ChairCategories = () => {

    // import{useCntxt} from '../../context/context'
    const {user,setUser,loaded}=useCntxt()
    const {wait,setWait}=useCntxt()
    const[auth,setAuth]=useState(false)
    const[connectionError,setConnectionError]=useState(false)

    const[empty,setEmpty]=useState(false)
    const[categories,setCategories]=useState([])
    const[mutate,setMutate]=useState(false)
    const[wt,setWt]=useState([])
    const [eShow,setEShow]=useState(false)
    const[catId,setCatId]=useState('')
    console.log('the user is ',user)
        const router=useRouter()
      
        useEffect(()=>{
            console.log("chair categories user ",user)
            console.log("chair categories loaded ",loaded)
    if(loaded){
      
            {
                if(!user || user.role!='مدير'){
                    router.push('/')
                    return
                }
                else if(user && user.name){
                    setAuth(true)
                }
            }
    }
        },[loaded])

        useEffect(()=>{
        const pls=async()=>{
            setWt(true)
           setEmpty(false)
             const ps=await fetch(`/api/category`).then(
                res=>res.json()
                
                ).catch((error)=>{
                    setConnectionError(true)
                    toast.error("خطأ")})
                
                if(ps&&ps.length==0){setEmpty(true)}
            if(ps){setCategories(ps)}
            setWt(false)
            setWait(false)
            setMutate(false)
        }
        pls()
      
    },[mutate])

    const[show,setShow]=useState(false)

    if(connectionError && auth){console.log("noooooooooooooooooo dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    return<div className=" flex w-screen h-screen justify-center items-center">
        <div className="flex justify-center items-center absolute top-[150px] bg-blue-900
         text-red-300 text-[15px] sm:text-[20px] md:text-[30px] px-[40px] shadow-black shadow-md rounded">ممم حدث خطأ ما . تأكد من جودة الاتصال بالانترنت</div>
    </div>
    }  
    return   <div className="  h-screen w-screen">
        <Container>
        {/* {(wait||wt)&&(<div className="flex absolute z-10">
        <div className=" flex w-screen h-screen bg-black opacity-30"></div>
        <div className="flex w-[500px] h-[100px] justify-center items-center left-[550px] top-[150px]
         bg-blue-950 text-white absolute rounded-md shadow-md shadow-white">الرجاء الانتظار , جاري تحميل البيانات</div>
    </div>)} */}
    {(wait||wt)&&(<Load/>)}
        {/* {!connectionError && auth &&( */}
      {(  <div className=" flex flex-col  w-screen h-screen items-end relative mt-[150px]">
    <label htmlFor="" className='flex mr-[50px] text-blue-800 font-[900] text-[25px]'>الفعاليات/فئات الكراسي </label>
   <div className='flex h-[30px]'></div>
   <button className='flex bg-orange-600 w-[80px] py-[5px] items-center justify-center rounded-md
    shadow-black shadow-sm hover:shadow-md hover:shadow-black hover:text-blue-400 text-white font-[700] text-[20px] mr-[50px]'
   onClick={()=>{setShow(true)}}
  
   
   >إضافة</button>
       {show&&(<div className='flex absolute'><AddChairCategory Showit={setShow} setMutate={setMutate}/></div>)} 
       {eShow&&(<div className='flex absolute'><EditChairCategory id={catId} Showit={setEShow} setMutate={setMutate} cat={categories.length>0 &&  catId.length>0 &&categories.filter(cat=>cat.id==catId)[0]}/></div>)} 

        
        <table  className=" flex flex-col w-full border-[1px] border-black mt-[50px]" align="ltr">
    <thead className="flex justify-evenly w-full h-[40px] bg-blue-950 text-white ">
      
        <th className="flex-1">الصورة</th>
        <th className="flex-1">لون النص</th>
        <th className="flex-1">اللون</th>
        <th className="flex-1">الاسم</th>
        <th className="flex-1">المعرف</th>
        </thead>
        {categories.length>0 &&(categories.map(ct=>{
            return<tr key={ct.id}> <ChairCategoryRow  chair={ct} setCatId={setCatId} setEShow={setEShow} setMutate={setMutate}/></tr>
        }))}
    {/* <tr className="flex justify-evenly">
        <td className="border-[1px] text-right flex-1">1</td>
        <td td className="border-[1px]  text-right flex-1" >2</td>
        <td td className="border-[1px]  text-right flex-1">3</td>
        <td className="border-[1px] text-right flex-1">1</td>
        <td td className="border-[1px]  text-right flex-1" >2</td>
        <td td className="border-[1px]  text-right flex-1">3</td>
    </tr> */}

   

  
</table>
    </div>)}
    </Container>
    </div>
}
 
export default ChairCategories;