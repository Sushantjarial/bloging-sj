import axios from "axios";
import  { useRef, useState } from "react";
import { BACKEND_URL } from "../../../config";
import JoditEditor from 'jodit-react';
import toast from "react-hot-toast";

const BlogCard = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const token = localStorage.getItem("token") || ""
  const editor = useRef(null);
  const [isPublishing,setIsPublishing]=useState(false)
  const config = {
    height: 500, // Set height in pixels
  };

  const handleSubmit = async (e:any) => {
    if(!title || !content){
      toast.error("All fields are required")
    }
    e.preventDefault();
    if (isPublishing) {
      toast.error("Please wait before publishing again.");
      return;
    }
    setIsPublishing(true);
    setTimeout(() => setIsPublishing(false), 5000);
    try{
     await axios.post(
      `${BACKEND_URL}/api/v1/blog/create`,
      { title, content },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    toast.success("published");
  }
  catch(e:any){
    toast.error("cannot publish right now try again after some time")
  }

  };

  return (
    <div className="flex justify-center items-center min-h-screen  bg-gray-100 ">
      <div className="bg-white shadow-lg shadow-green-500 rounded-lg p-8 w-full max-w-7xl sm:my-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">New Blog Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your blog title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Content
            </label>
            {/* <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter your blog content"
              rows={20}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            /> */}
          <JoditEditor
          ref={editor}
          value={content}
          config={config}
          onBlur={newContent => setContent(newContent)}
          />
          </div>
          <button disabled={isPublishing}
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
          >
            PUBLISH 
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogCard;
