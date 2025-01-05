import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import trash from "../images/trash.png"
import axios from "axios";
import { BACKEND_URL } from "../../../config";
import toast from "react-hot-toast";
import { format } from 'date-fns';

interface t {
  title: string;
  content: string;
  id: string
  createdAt:string
  author: {
    firstName: string,
    lastName: string
    id: string
  }
  side?: boolean
  deleteIcon?: boolean
}
function calculateReadingTime(htmlContent: string): [number, string] {


  const plainText = htmlContent.replace(/<[^>]+>/g, "");
  const words = plainText.trim().split(/\s+/);
  const wordsPerMinute = 150;
  const readingTime = Math.ceil(words.length / wordsPerMinute);
  return [readingTime, plainText];
}
export const formatDate = (date:any) => {
  return format(new Date(date), 'MMM d '); 
};

export default function BlogCard({ side, title, content, id, author, deleteIcon,createdAt }: t) {
  const [readingTime, setReadingTime] = useState(0);
  const [text, setText] = useState(" ")
  const [showWarning,setShowWarning]=useState(false)


  const handleDelete=async()=>{

    const token = localStorage.getItem("token") || "";
    try{
   await axios.delete(`${BACKEND_URL}/api/v1/blog/delete?blogId=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    toast.success(" post deleted")
    setShowWarning(false)
  }
  catch{
    toast.error("Cannot delete right now try again later")
  }
}

  useEffect(() => {
    const [time, textt] = calculateReadingTime(content);
    setReadingTime(time);
    setText(textt)
  }, [content]);
  return (
    <div className="relative flex flex-col bg-black bg-opacity-100  rounded-full p-3   text-white  shadow-sm   shadow-black  border-b-2 border-r-2 border-green-500 hover:bg-opacity-80 ">
    
      <Link className="font-bold text-xl pb-1  px-2 hover:underline
            transition-all transform hover:translate-x-2 hover:shadow-xl  duration-300 cursor-pointer text-green-600" to={`/blog/?id=${id}`}>{title.length < 80 ? title : title.slice(0, 50) + "..."}</Link>
            
            
   

      <div className="opacity-65 lg:hidden text-start px-2"
        dangerouslySetInnerHTML={{ __html:  text.slice(0, 80) + "..." }}
      >

      </div>
      <div className="opacity-65 hidden lg:block text-start px-2"
        dangerouslySetInnerHTML={{ __html: (side) ? text.slice(0, 80) + "..." :  text.slice(0, 200) + "..." }}
      >

      </div>
      <div className=" font-extralight  pt-3   flex flex-row gap-6 pl-10 items-center justify-end mr-16">

        <div className={` flex opacity-40 items-center ${deleteIcon?"sm: hidden":" "} `}  >
          <div className="w-6 h-6 bg-white rounded-full text-black  font-bold  text-center opacity-70 ">
            {author.firstName.charAt(0).toUpperCase()}
          </div>
          <div className="font-light  opacity-70 pl-2">{author.firstName} </div>
        </div>
        <div className="opacity-40">{formatDate(createdAt)}</div>

        <div className="opacity-40">{readingTime} min</div>
        <img src={trash} onClick={()=>setShowWarning(true)}  className={`w-5 h-5 ${deleteIcon?"":"hidden"} hover:opacity-40 cursor-pointer  ` }  ></img>


      </div>
      {showWarning && (
        <div className=" absolute  top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="rounded-xl bg-black p-4  shadow-md">
            <p>Are you sure you want to delete this post?</p>
            <div className="flex justify-between mt-4">
                <button
                className=" bg-green-400 ease-out hover:bg-green-800 text-black font-semibold px-4 py-2 rounded transition-all duration-300"
                onClick={() => { setShowWarning(false) }}
                >
                Cancel
                </button>
              <button
                className=" bg-red-500 hover:bg-red-800 duration-300 transition-all ease-in text-black px-4 py-2 font-semibold rounded"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
