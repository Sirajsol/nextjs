"use client"
import { useState ,createContext,useContext,useEffect } from "react"


// const { createContext, useState } = require("react")
export const Mcotext=createContext();

export const MProvider=({children})=>{
    const[user,setUser]=useState(null)
    const [loaded,setLoaded]=useState(false)
    const[wait,setWait]=useState(false)
useEffect(()=>{
    const u=localStorage.getItem('user')
    if(u){
        const uu=JSON.parse(u)
        if( uu &&uu.name){
            console.log('but u os ',u)
            setUser(uu)
     
          //  alert('hah')
        }
       

     
    }
    console.log("context  user ---------------------------------------",u)
    setLoaded(true)
},[])
useEffect(()=>{
//  alert('up user') 
//  if(user && user.name)  
// localStorage.setItem('user',JSON.stringify(user))
    
    
},[user])
   
    return <Mcotext.Provider value={{user,setUser,loaded,wait,setWait}}>
      
{children}

        </Mcotext.Provider>
};

export const useCntxt=()=>useContext(Mcotext)