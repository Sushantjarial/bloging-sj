import Avatar from "./avatar";
import {  useNavigate } from "react-router-dom";

export default function Appbar(){
    const navigate=useNavigate()
    return(
        <div className="w-screen flex justify-between border-b-2 px-8 py-4">
            <div className=" text-green-500 text-xl font-serif font-semibold cursor-pointer hover:text-green-700" onClick={()=>navigate("/blogs")}>TECH TALES</div>
            <Avatar></Avatar>
             </div>
    )
}