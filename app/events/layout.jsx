import PNav from "../components/PNav";
import NavBar from "../components/nav/Nav";
// import Footer from './components/footer/Footer'
// sfc
const BLayout = ({children}) => {
    
    return<div>
        <NavBar/>
        {children}
    </div>
}
 
export default BLayout;