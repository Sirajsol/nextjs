"use client"
import { useState,useEffect } from "react";
import { useRouter } from "next/dist/client/components/navigation";
const SerchChair = ({setSearchTerm,count}) => {

    const[places,setPlaces]=useState([])
    const[entriesPerPage,setEntriesPerPage]=useState(5)
    const[page,setPage]=useState(1)
    const[total,setTotal]=useState(10)
    const[title,setTitle]=useState('')
    const[place,setPlace]=useState('')
    const router=useRouter()


    const search=()=>{
        let terms=[]
        let ter=""
        if(place.length>0){terms.push(`placeId=${place}`)}
        if(title.length>0){terms.push(`title=${title}`)}
       
       
        if(Number(page)>0){ 
            //
            // alert('pagggge')
        terms.push(`page=${page}`)}
        // alert('search')
        if(Number(entriesPerPage)>0){terms.push(`entriesPerPage=${entriesPerPage}`)}
       
        if(terms.length>0){
            for(var i=0;i<terms.length-1;i++){
                 ter=ter+terms[i]+"&"
            }
            ter="?"+ter+terms[terms.length-1]
          
        }
        setSearchTerm(ter)
    }

    useEffect(()=>{
        const pls=async()=>{
//WARNING : const plss=await .... is wrong cause there is no {} around plss
            const {plss}=await fetch('/api/place').then(res=>res.json())
            if(plss){setPlaces(plss)}
        }
        pls()
    },[])
//WARNING : the following is wrong cause there is no {} around plss
    // useEffect(()=>{
    //     const pls=async()=>{
    //         const plss=await fetch('/api/place').then(res=>res.json())
    //         if(plss){setPlaces(plss)}
    //     }
    //     pls()
    // },[])

    // useEffect(()=>{
    //     // setWait(true)
    //     const pls=async()=>{
    //         console.log('inside chairSearch the response isss --------------------------------')
    //        const e=await fetch('/api/place')
    //        if(e)
    //       {
    //         const jj=await e.json()
    //         if(jj)setPlaces(jj.plss)
    //         console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',jj.plss)
    //       } 
    //       else {
    //         console.log('noooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo')
    
    //       }
    //     }
    //     pls()
    // },[])

    return   <div className="flex flex-col   w-full justify-start border-b-[1px]">
    <div className="flex flex-col md:flex-row my-[10px] justify-evenly border-b-[1px] sm:border-none
     bg-blue-950 mx-auto w-[90%] px-[10px] border-[1px] border-orange-500 shadow-md shadow-white rounded-md">
   
    
        <div className="flex flex-col px-[20px] h-[100px] items-end justify-end border-b-[1px] sm:border-none mt-[50px] w-[100%] md:w-[40%]">
           
        <label htmlFor="" className="flex  justify-end w-[40%] md:w-[70px] items-center
             mb-[5px] h-[30px] text-right rounded-sm  sm:text-[12px] md:text-[14px]  text-yellow-200 ">ابحث عن</label>
    

            <input type="text" 
            value={title}
            onChange={(e)=>{setTitle(e.target.value)}}
            className="ml-[10px] mb-[10px] w-[50%]" />
                </div>
        
    <div className="flex flex-col border-b-[1px] sm:border-none h-[150px] justify-evenly items-end px-[20px] my-[10px] w-full md:w-[40%] ">
        <label className=" flex  lg:mr-[30px]  text-yellow-200 sm:text-[15px] md:text-[20px] lg:text-[25px]">مكان الفعالية</label>
        <select value={place}
         className="flex  w-[90%] lg:w-[180px] bg-blue-950 h-[30px] text-yellow-200 text-right rounded-sm lg:mr-[10px] border-[1px]"
        onChange={(e)=>{
            // router.push(`?placeId=${e.target.value}`)
        setPlace(e.target.value)
        }}
        > 
        <option value="" >اختر مكان</option>
             {places && places.length>0&& places.map(cat=> {
                return(<option key={cat.id} value={cat.name} >{cat.name}</option>)
                })}
        </select>
        <div className="flex">
        <label htmlFor="" className="flex justify-end items-end w-[40px] h-[30px] text-right rounded-sm text-[14] md:text-[17px] text-yellow-200 ">سجلات</label>
            <input  type="number" value={entriesPerPage}
            onChange={(e)=>setEntriesPerPage(e.target.value)}
            min={2} className="flex w-[50px] bg-blue-950 h-[30px] text-yellow-200 text-right rounded-sm mx-[2px] lg:mx-[10px]"/>
      
            <label htmlFor="" className="flex justify-end items-end w-[40px] h-[30px] text-right text-[14] md:text-[17px] rounded-sm lg:mr-[40px]  text-yellow-200 ">اعرض</label>
        </div>
        <div className=" flex justify-around w-full  mx-auto ">
            <button className=" flex border-[1px] text-yellow-200 justify-center items-center
             lg:px-[20px] py-[5px] rounded-md text-[12px] md:text-[15px]"
             onClick={()=>{
                if(entriesPerPage*(page)<count)
                setPage(prev=>prev+1)
            }}
            >التالي</button>
            <label className="flex w-[50px] text-yellow-200 justify-center items-center">{page}</label>
            <button className=" flex border-[1px] text-yellow-200 justify-center items-center text-[12px]
             md:text-[15px] lg:px-[15px] py-[5px] rounded-md lg:mr-[25px]"
            onClick={()=>{
                if(page-1>0)
                setPage(prev=>prev-1)
            }}
          >السابق</button>
        </div>
    </div>
   
    </div>
    <div className="flex w-full justify-end px-[10%]">
        <button 
        onClick={()=>{search()}}
        className="flex lg:mr-[40px] w-[80px] py-[5px] justify-center items-center 
         bg-orange-600 text-white rounded-md mb-[10px] shadow-black shadow-md ">ابحث</button>
    </div>
    </div>
        
}
 
export default SerchChair;