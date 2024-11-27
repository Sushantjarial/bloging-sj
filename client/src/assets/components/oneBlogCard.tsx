import { Blog } from "../../pages/oneBlog"
import Avatar from "./avatar"




export default function OneBlogCard(post:Blog){
    return(
    <div className=" bg-black ">
        <div className="px-2 pl-4  lg:px-20 py-4 place-items-start text-slate-100  ">
        <h1 className="text-4xl font-extrabold py-4  ">{post.title}</h1>
        <div className="flex items-center py-4">        <Avatar name="S" big={true} ></Avatar>
        <div className="flex-col items-center justify-start px-3">
        <div className="text-xl  font-semibold ">{post.author.firstName +" "+post.author.lastName}</div>
        <div className="text-xs -my-1">published on 8 sep 2003</div>
        </div>
        </div>

        <p   className="text-2xl leading-relaxed text-slate-300 text-start">{post.content}</p>
        </div>
        </div>
        )
}