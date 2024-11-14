import {  useNavigate } from "react-router-dom";

interface t {
  title: string;
  content: string;
  id:string
  author:{
    firstName:string,
    lastName:string

  }
}

export default function Blogcard({ title, content ,id ,author }: t) {
  const navigate=useNavigate();
  return (
    <div className="flex flex-col bg-black bg-opacity-100  rounded-xl p-3  text-white  shadow-2xl   shadow-black  border-b-2 border-r-2 border-green-500 hover:bg-opacity-85 min-w-60">
      <div className="flex   items-center mb-4">
        <div className="w-6 h-6 bg-white rounded-full text-black  font-bold  text-center opacity-70 ">
        {author.firstName.charAt(0).toUpperCase()}
        </div>
        <div className="font-thin opacity-40 px-2">{author.firstName} </div>
      </div>
      <div
        className=" font-bold text-xl pb-1 hover:underline
            transition-all transform hover:translate-x-2 hover:shadow-xl  duration-300 cursor-pointer text-green-600"
        onClick={()=>navigate(`/blog/?id=${id}&firstName=${author.firstName}&lastName=${author.lastName}`)}
      >
        {title.length < 70 ? title : title.slice(0, 50) + "..."}
      </div>
      <div className="opacity-65 ">
        {content.length < 200 ? content : content.slice(0, 200) + "..."}
      </div>
      <div className="font-extralight  pt-3  opacity-40 flex flex-row gap-6">
        sep 8<div className="">{Math.ceil(content.length / 100)} min read </div>
      </div>
    </div>
  );
}
