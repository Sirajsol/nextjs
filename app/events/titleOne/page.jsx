"use client"
import { useState,useEffect } from "react"
import TitleN from "../../components/titleone/TitleOne"
import { TiDelete } from "react-icons/ti";
import { MdModeEditOutline } from "react-icons/md";
import TitleNEdit from "../../components/TitleNEdit";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation"
import {useCntxt} from '../../context/context'
import Container from "../../components/Contaner";
import TitleOnePagr from "../../components/pagges/titleonePage";
const TitleOne = () => {

   return <div>
      <TitleOnePagr />
   </div>
}
 
export default TitleOne;