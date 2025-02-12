import Avatar from "./avatar";
import { Link } from "react-router-dom";
import write from "./../images/write.svg"

interface Appbarprops{
    writeIcon? : boolean
}
export default function Appbar({writeIcon}:Appbarprops){
  const name=localStorage.getItem("username")
    return(
        <div className="pb w-full  flex justify-between bg-black border-green-500 border-b px-4 py-3 items-center shadow-sm shadow-green-500">
            <Link className=" cursor-pointer  flex text-green-500 text-3xl   " to="/blogs">
           OPENVERSE
            </Link>
                
            <div className="flex items-center justify-stretch">
            <Link className={` ${(writeIcon)?`hidden`:`block`}  flex items-center  mr-6  `} to={"/write"} > 
            <div className="hidden lg:block text-green-500 mr-2 hover:text-green-200 text-xl ">Write</div>
            <img src={write} className="w-6  mr-4" alt="write" />
             </Link>
            <Avatar name={name?.charAt(0).toUpperCase()}  color="green" big={true} appBar={true}></Avatar>
            </div>
          
             </div>
    )
}