import axios from "axios"
import { BACKEND_URL } from "../../config";
import { useEffect,useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Blogcard from "../assets/components/blogCard";
import Appbar from "../assets/components/appbar";



export default function Blogs() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");

            try {
                let res = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setPosts(res.data.posts);
            } catch (e: any) {
                toast.error("Not logged in");
                navigate("/signin");
            }
        };
        fetchData();
      },[navigate])
    return ( 
        <div > 
             <Appbar></Appbar>
       { posts.map((post:{title:string,content:string,id:string})=>{
        return(  
        
          
        <div className="flex justify-center">    
            <div className=" my-6 mx-2 max-w-2xl w-screen   bg-green-500 md:min-w-xl   ">
          <Blogcard key={post.id} title={post.title} content={post.content} id={post.id}></Blogcard>
              </div>
              </div>
             
            )
    })}
       </div>
    )
    
}