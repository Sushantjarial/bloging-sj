import { useEffect, useState } from "react";
import {  Link } from "react-router-dom";

interface t {
  title: string;
  content: string;
  id:string
  author:{
    firstName:string,
    lastName:string
    id:string
  }
  side?:boolean
}
function calculateReadingTime(htmlContent:string): [number, string] {
  const plainText = htmlContent.replace(/<[^>]+>/g, "");
  const words = plainText.trim().split(/\s+/);
  const wordsPerMinute = 150;
  const readingTime = Math.ceil(words.length / wordsPerMinute);
  return [readingTime, plainText];
}


export default function Blogcard({side, title, content ,id ,author }: t) {
  const [readingTime, setReadingTime] = useState(0);
  const[text,setText]=useState(" ")

    useEffect(() => {
        const [time,textt] = calculateReadingTime(content);
        setReadingTime(time);
        setText(textt)
    }, [content]); 
  return (
    <div className="flex flex-col bg-black bg-opacity-100  rounded-full p-3   text-white  shadow-sm   shadow-black  border-b-2 border-r-2 border-green-500 hover:bg-opacity-80 ">
      <Link className="font-bold text-xl pb-1  px-2 hover:underline
            transition-all transform hover:translate-x-2 hover:shadow-xl  duration-300 cursor-pointer text-green-600" to={`/blog/?id=${id}`}>{title.length < 70 ? title : title.slice(0, 50) + "..."}</Link>
      {/* <div
        className=" font-bold text-xl pb-1  px-2 hover:underline
            transition-all transform hover:translate-x-2 hover:shadow-xl  duration-300 cursor-pointer text-green-600"
        onClick={()=>navigate(`/blog/?id=${id}`)}
      >
        {title.length < 70 ? title : title.slice(0, 50) + "..."}
      </div> */}
      <div className="opacity-65 lg:hidden text-start px-2"
       dangerouslySetInnerHTML={{__html:text.length < 200 ? text : text.slice(0, 80) + "..."}}
      >
        
      </div>
      <div className="opacity-65 hidden lg:block text-start px-2" 
      dangerouslySetInnerHTML={{ __html: (side)?text.length < 200 ? text : text.slice(0, 80) + "..." : text.length < 200 ? text : text.slice(0, 200) + "..." }}
      >
      
      </div>
      <div className="font-extralight  pt-3  opacity-40 flex flex-row gap-6 pl-10 items-center justify-end mr-16">

        <div className="flex   items-center">
        <div className="w-6 h-6 bg-white rounded-full text-black  font-bold  text-center opacity-70 ">
        {author.firstName.charAt(0).toUpperCase()}
        </div>
        <div className="font-light opacity-70 pl-2">{author.firstName} </div>
      </div>
        sep 8<div className="">{readingTime} min read </div>
        
      </div>
    </div>
  );
}
