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
        <div className="w-screen flex justify-between border-b-2 px-8 py-4 items-center">
            <div className=" cursor-pointer  flex " onClick={()=>navigate("/blogs")}>
            <img src={tech} className="  h-8   bg-white"></img>
            <img src={tale} className="  h-8   bg-white"></img>
            
            </div>
            <Avatar name={name} color="green" big={true}></Avatar>
           
          
             </div>
    )
}