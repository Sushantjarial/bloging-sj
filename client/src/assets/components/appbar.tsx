import Avatar from "./avatar";
import { Link, useNavigate } from "react-router-dom";
import write from "./../images/write.svg"
interface Appbarprops{
    name: string
}
export default function Appbar({name}:Appbarprops){
    const navigate=useNavigate()
    return(
        <div className="pb w-full  flex justify-between bg-black border-green-500 border-b px-4 py-3 items-center shadow-sm shadow-green-500">
            <div className=" cursor-pointer  flex text-green-500 text-xl   " onClick={()=>navigate("/blogs")}>
           OPENVERSE
            </div>
            <div className="flex items-center justify-stretch">
            <Link className="   flex items-center  mr-6  " to={"/write"} > 
            <div className="hidden lg:block text-green-500 mr-2 hover:text-green-200 text-xl ">Write</div>
            <img src={write} className="w-6  mr-4" alt="write" />
             </Link>
            <Avatar name={name} color="green" big={true}></Avatar>
            </div>
          
             </div>
    )
}