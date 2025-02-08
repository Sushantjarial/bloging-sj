import { format } from "date-fns";
import { Blog } from "../../pages/oneBlog"
import Avatar from "./avatar"
import arrow from "../images/arrow.png"

export const formatDate = (date:any) => {
    return format(new Date(date), ' MMM d yyyy'); 
  };
  interface t{
    post:Blog,
    hideSide:()=>void
  }


export default function OneBlogCard({post,hideSide}:t){
    return(
    <div className=" bg-black min-h-screen ">
        <div className="px-2 pl-4  lg:px-20 py-4 place-items-start text-slate-100  ">
        <h1 className="text-4xl font-extrabold py-4  ">{post.title}</h1>
       
        <div onClick={hideSide} className="flex items-center py-4 hover:cursor-pointer  transition-all transform hover:translate-x-2  ">        <Avatar name={post.author.firstName.charAt(0).toUpperCase()} big={true} ></Avatar>
        <div className="flex-col items-center justify-start px-3">
        <div className="text-xl  font-semibold ">{post.author.firstName +" "+post.author.lastName}</div>
        <div className="text-sm -my-1">{formatDate(post.createdAt)}</div>

        </div>
        <img src={arrow} className="w-12 h-12 hover:cursor-pointer  " ></img>

        </div>
        <div   className="text-2xl leading-relaxed text-slate-300 text-start   max-w-full overflow-x-auto" 
         dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
        </div>
        </div>
        )
}