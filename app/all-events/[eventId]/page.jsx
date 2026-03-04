import Register from '../../components/Register'
import Container from '../../components/Contaner'
import ShowRegister from '../../components/ShowRegister'
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import { error } from 'console'
export const BASE_API_URL=process.env.NEXT_PUBLIC_BASE_API_URL
export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    // const eventId = params.id
   
    // fetch data
    const{eventId}=params
    const event = await fetch(`${BASE_API_URL}/api/event/${eventId}`).then((res) => res.json())
   .catch(error=>{console.log('connectoin error in [eventid] page')})
    // optionally access and extend (rather than replace) parent metadata
    
   
   if(event) return {
      title: event.title,
      description:event.description
    }
  }


const getev=async(ln)=>{
    const d=await fetch(`${BASE_API_URL}/api/event/${ln}`,{
        // const d=await fetch(`${BASE_API_URL}/api/event/${ln}`,{
        headers:{
            'Content-Type'  : 'application/json'
        },
        cache:"no-store"
    }
    ).then(res=>res.json()).catch(error=>{return null})
    if(d)return d
}
const SingleEvent = async({params}) => {
    if(!BASE_API_URL){
        return null
    }
    const{eventId}=params
const evt=await getev(eventId)

    return <div>
       
    <Container>
    {evt&&(
    <div className="flex  w-full mx-auto sm:h-full justify-center items-center ">
    <div className=' flex absolute w-screen h-full top-[0px] left-[0px] bg-blue-950'>
    <div className='flex relative  w-screen mx-auto h-screen  opacity-30'>
        <Image src={evt.img} alt="image"  fill className=' object-fill ' />
    </div>
    </div>
<div className=' flex flex-col  backdrop-blur-lg justify-start bg-transparent
  my-[20px] sm:my-[50px] pb-[40px] w-[80%] mx-auto text-white rounded-md shadow-md shadow-yellow-400 '>
    <div className='flex text-[25px]  w-full justify-center'>{evt.title}</div>
    <div className='flex text-[25px]  w-[96%] justify-center mt-[30px] mx-auto pb-[30px]
     border-[1px] rounded-md shadow-white shadow-md flex-col sm:flex-row bg-transparent'>
    <div className='flex relative  w-[96%] mx-auto h-[200px] sm:w-[500px] sm:h-[300px] mt-[10px] '>
        <Image src={evt.img} alt="image" fill className=' object-cover rounded-sm shadow-yellow-400 shadow-md' />
    </div>
    <div className='flex flex-col w-[96%] mx-auto justify-start  mt-[20px] items-start bg-transparent  backdrop-blur-lg text-white text-[15px] sm:text-[18px] overflow-hidden ml-[5px]'>
       <div className='flex mb-[30px] min-h-[150px] w-[92%] mx-auto pb-[20px]   border-transparent outline-none flex-wrap overflow-hidden hover:overflow-scroll justify-end pr-[5px] text-right text-wrap'>{evt.description}</div> 
       <div className=' flex w-[92%] mx-auto justify-end'>
       <div className='flex w-full justify-end'>{evt.date}</div>
       <div className='flex w-full justify-end'>التاريخ</div>
       </div>
       <div className=' flex  w-[92%] mx-auto justify-end'>
       <div className='flex w-full justify-end'>{evt.time}</div>
       <div className='flex w-full justify-end'>الوقت</div>
       </div>
       <div className=' flex w-[92%] mx-auto justify-end'>
       <div className='flex w-full justify-end'>{evt.placeId}</div>
       <div className='flex w-full justify-end'>المكان</div>
       </div>
     
    </div>
    </div>
    <div className='flex w-full justify-end'>
       
         <ShowRegister id={evt.title}/>
    </div>
</div>
       
       </div>
       )}
       {!evt&&(
        <div className=" flex w-screen h-screen justify-center items-center">
        <div className="flex justify-center items-center absolute top-[150px] bg-blue-900
         text-red-600 text-[30px] px-[40px] shadow-black shadow-md rounded">ممم حدث خطأ ما . تأكد من جودة الاتصال بالانترنت</div>
    </div>
       )}
       </Container>
       </div>
}
 
export default SingleEvent;