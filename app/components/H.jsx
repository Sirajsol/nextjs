import Image from "next/image"
import { im } from "./im"
const hh=async()=>{
    const d= await fetch("/api/event",
  {
    headers:{
        'Content-Type'  : 'application/json'
    },
    cache:"no-store"
  }
  )
  return d.json()
  }
const Ht = async() => {
    const d=await hh()
    
    return <div className="relative w-[200px] h-[200px]">
      {d[0].img.substring(0,150)}
    
    {/* <Image src={`data:image/jpeg;base64,${d[0].img}`}  fill className='w-[200px] h-[300px]' alt="wow" /> */}
    <Image src={`${d[0].img}`}  fill className='w-[200px] h-[300px]' alt="wow" />
    </div>
}
 
export default Ht;