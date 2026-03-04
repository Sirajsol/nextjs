"use client"
import{UseSession, useSession} from 'next-auth/react'
const Use = () => {
    const {data:session}=useSession()
    return <div>
        {JSON.stringify(session)}
    </div>
}
 
export default Use;