"use client"
import { useRouter } from "next/navigation"
import { useCntxt } from "../context/context"
import logo from '../../public/logosvg.png'
import Image from "next/image"
const PNave = ({children}) => {
    const router=useRouter()
    const{user,setUser,loaded,wait,setWait}=useCntxt()
    return <div className=" flex bg-blue-900 w-full h-[60px]   justify-between">
        <div className="flex w-[60%] sm:w-[30%] justify-evenly ">
       {user&&( <div className="flex w-[100%] justify-between">
            <div className="flex w-full  relative ml-[50px]  cursor-pointer font-[800] text-[18px] md:text-[25px] text-white "
            onClick={()=>{localStorage.removeItem('user')
            setUser(null)
            router.push('/')

            }}
            >تسجيل خروج</div>
            
            <div className="flex justify-center  text-yellow-400 font-[800] text-[18px] md:text-[25px]">
                {user?.name}</div></div>)}

{!user&&( <div className="flex w-full justify-evenly">
            <div className="flex w-full justify-center items-center relative ml-[50px] cursor-pointer  font-[800]text-[18px] sm:text-[25px] text-white "
            onClick={()=>{localStorage.removeItem('user')
            setUser(null)
            router.push('/login')
            setWait(true)

            }}
            >تسجيل دخول</div></div>)}

            
        
        </div>
        <div className="flex flex-col relative mr-[50px] cursor-pointer font-[800] text-[25px] text-white "> 
        <Image src={logo} width={50} height={50} className="object-contain" />
        </div>
        {children}
    </div>
}
 
export default PNave;