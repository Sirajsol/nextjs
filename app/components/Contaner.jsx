const Container = ({children}) => {
    return <div className="flex justify-center w-screen items-center h-[600px] min-h-[400px] 
    overflow-scroll">{children}</div>
}
 
export default Container;