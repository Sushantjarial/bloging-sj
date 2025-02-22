import Avatar from "./avatar";
import { Link } from "react-router-dom";
import write from "./../images/write.svg"

interface Appbarprops{
    writeIcon? : boolean
    auth? : String
}
export default function Appbar({writeIcon,auth}:Appbarprops){
  const name=localStorage.getItem("username")
    return(
        <div className="w-full  flex justify-between bg-black border-green-500 border-b px-4 py-3 items-center  shadow-green-500">
            <Link className=" cursor-pointer font-serif flex text-green-500 text-3xl px-3 " to="/">
             <div className=" font-serif font-extrabold  pr-2">openverse</div>  
            
            
            </Link>
                
            <div className="flex items-center justify-stretch">
            <Link className={` ${(writeIcon)?`block`:`hidden`}  flex items-center mr-11 lg:mr-20 `} to={"/write"} > 
            
            <div className="hidden lg:block text-green-500  hover:text-green-200 text-xl ">Write</div>
            <img src={write} className=" w-8 lg:w-6    mb-1 ml-2   " alt="write" />
             </Link>
            
             {auth?
             <Link to={`/${auth==="Signin"?"signup":"signin"}`} className={`${(auth)?`block`:`hidden`}  flex items-center    `}>
             <div className=" text-green-500  hover:text-green-200 text-xl px-3  ">{auth==="Signin"?"Signup":"Signin"}</div>
             </Link>
            :
            <Avatar name={name?.charAt(0).toUpperCase()}  color="green" big={true} appBar={true}></Avatar>
            }
            </div>
          
             </div>
    )
}