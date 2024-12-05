import { format } from "date-fns";
import { Blog } from "../../pages/oneBlog"
import Avatar from "./avatar"

export const formatDate = (date:any) => {
    return format(new Date(date), 'd MMM yyyy'); // Formats to "2 Sep 2003"
  };


export default function OneBlogCard(post:Blog){
    return(
    <div className=" bg-black ">
        <div className="px-2 pl-4  lg:px-20 py-4 place-items-start text-slate-100  ">
        <h1 className="text-4xl font-extrabold py-4  ">{post.title}</h1>
        <div className="flex items-center py-4">        <Avatar name={post.author.firstName.charAt(0).toUpperCase()} big={true} ></Avatar>
        <div className="flex-col items-center justify-start px-3">
        <div className="text-xl  font-semibold ">{post.author.firstName +" "+post.author.lastName}</div>
        <div className="text-sm -my-1">{formatDate(post.createdAt)}</div>
        </div>
        </div>
        <div   className="text-2xl leading-relaxed text-slate-300 text-start" 
         dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
        </div>
        </div>
        )
}