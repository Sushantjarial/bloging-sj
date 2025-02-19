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
         <div className="hidden lg:block pr-2">OPENVERSE</div>  
         <svg xmlns="http://www.w3.org/2000/svg" className=" lg:ml-2  -m-4 " width="60" height="60" viewBox="0 0 512 512"><g fill="#28ef0c"><path d="M496.242 275.176 265.493 345.5h-18.987L15.758 275.176 0 322.449l227.255 69.259c2.828 13.271 14.642 23.257 28.744 23.257s25.916-9.986 28.744-23.257l227.255-69.259-15.756-47.273zM269.358 379.639v5.937c0 7.366-5.992 13.358-13.358 13.358s-13.358-5.992-13.358-13.358v-5.937L20.41 311.911l5.616-16.848 216.952 66.118h23.761l218.094-66.466 5.616 16.848-222.233 67.728z"/><path d="M477.467 228.51l-183.904 72.941 128.144-135.195-11.634-11.027L284.2 288.027l64.765-166.717-14.942-5.805-70.008 180.211V97.034h-16.03v198.682l-70.008-180.211-14.942 5.805L227.8 288.027 101.927 155.229l-11.635 11.027 128.145 135.195L34.532 228.51l-5.909 14.902 206.748 82 3.071-7.743 7.197-6.821 5.706-2.217h9.31l5.706 2.217 7.197 6.821 3.071 7.743 206.747-82z"/></g></svg>
            
            
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