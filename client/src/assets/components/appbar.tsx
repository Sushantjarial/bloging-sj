import Avatar from "./avatar";
import {  useNavigate } from "react-router-dom";
import tech from "./../images/TECH (2).png"
import tale from "./../images/TALES (2).png"
interface Appbarprops{
    name: string
}
export default function Appbar({name}:Appbarprops){
    const navigate=useNavigate()
    return(
        <div className="  flex justify-between bg-black border-green-500 border-b px-4 py-3 items-center shadow-sm shadow-green-500">
            <div className=" cursor-pointer  flex text-green-500 text-xl " onClick={()=>navigate("/blogs")}>
           KEYNOTES
            
            </div>
            <Avatar name={name} color="green" big={true}></Avatar>
           
          
             </div>
    )
}