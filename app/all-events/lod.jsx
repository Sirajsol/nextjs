"use client"
import React from 'react'
import { useCntxt } from '../context/context'
import Load from '../components/load';

export default function Loadd() {
    const{wait,setWait}=useCntxt();
  return (
    wait?(<Load/>):<></>
  )
}
