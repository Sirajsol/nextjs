'use client'
import { MProvider } from "../app/context/context";

const MYProvider = ({children}) => {
    return <MProvider>{children}</MProvider>
    
}
 
export default MYProvider;