import axios from "axios"
import { BACKEND_URL } from "../../config";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Blogcard from "../assets/components/blogCard";
import Appbar from "../assets/components/appbar";
import { useRecoilState } from "recoil";
import { BlogState, UserName } from "../state/atoms";
import { BarLoader } from "react-spinners";

export default function Blogs() {
    const navigate = useNavigate();
    const [name, setName] = useRecoilState(UserName)
    const [posts, setBlogState] = useRecoilState(BlogState)
    const [loader, setloader] = useState(true)


    useEffect(() => {
            if(Array.isArray(posts) && posts.length > 0){
                setloader(false)
                return;
            } 
            const fetchData = async () => {
                const token = localStorage.getItem("token") || ""
                try {

                    let res = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    setBlogState(res.data.posts)
                     setName(res.data.name.firstName)
                    localStorage.setItem("username",name)
                    setloader(false)
                }
                catch (e: any) {
                    toast.error("Not logged in");
                    navigate("/signin");
                }
               
            };
            fetchData();

        
    }, [name])
    
    

    return (
        <div>
            {loader ? (
                <div>
                    <Appbar name={name.charAt(0).toUpperCase()}></Appbar>
                    <BarLoader
  color="#16e612"
  width={1000}
/>
<div className="w-screen h-screen bg-black"></div>
                
                </div>
            ) : (
                <div>      <div className=" fixed z-50 w-full   bg-black">
                              <Appbar name={name.charAt(0).toUpperCase()}></Appbar> </div>
                              <div className="pb-16 bg-black"></div>
  
                    {posts.map((post: { title: string, content: string, id: string, author: { firstName: string, lastName: string, id: string } }) => {
                        return (
                            <div className="flex  justify-center bg-black " key={post.id}>
                                <div className=" my-6 mx-2 max-w-2xl w-screen rounded-full  bg-green-800 md:min-w-xl  ">
                                    <Blogcard title={post.title} content={post.content} id={post.id} author={post.author} ></Blogcard>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}