"use client"
import { sendit } from "./send";
const  EmailSend= () => {
    


    return <div>
        <button 
        onClick={async()=>{await sendit('healthtartus@gmail.com','haha')}}
        >send</button>
    </div>
}
 
export default EmailSend;
