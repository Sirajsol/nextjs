"use server"
import { Resend } from 'resend';
import im from './im'
import Email from './Email'
const resend = new Resend(process.env.RESEND_EMAIL);
export const sendit=async(reciver,message,dest,name,title,img,)=>{
    console.log("try to send it...")
    try{
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: reciver,
            subject: 'دعوة',
            html: `
            <img src=${img}/>
            <p>${name} ${title}</strong>!</p><br/>
            <hr/>${message}<br/>
            <a href=${dest}>تأكيد</a>
            `,
            // react:<Email name={name} message={message} title={title} imgsr={img} lnk={dest}/>
          });

    }
    catch(error){
        console.log("error",error.code)
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: reciver,
           subject: 'دعوة',
            html: `
            <img src=${img}/>
            <p> ${title} ${name}</strong>!</p><br/>
            <hr/>${message}<br/>
            <a href=${dest}>تأكيد</a>
            `,
            // react:<Email name={name} message={message} title={title} imgsr={img} lnk={dest}/>

          })
    }
    
      console.log("success haha")
    }