import axios from "axios"
import { BACKEND_URL } from "../../config";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Blogcard from "../assets/components/blogCard";
import Appbar from "../assets/components/appbar";
import { useRecoilState } from "recoil";
import { BlogState } from "../state/atoms";
import { BarLoader } from "react-spinners";
import { Blog } from "./oneBlog";

export default function Blogs() {
    const navigate = useNavigate();
    const [posts, setBlogState] = useRecoilState(BlogState)
    const [loader, setloader] = useState(true)
    

    useEffect(() => {

        if (Array.isArray(posts) && posts.length > 0) {
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
                localStorage.setItem("username", res.data.name.firstName)
                localStorage.setItem("userId", res.data.id)
                setloader(false)
            }
            catch (e: any) {
                toast.error("Not logged in");
                navigate("/signin");
            }

        };
        fetchData();


    }, [])



    return (
        <div className="scroll-smooth">
            {loader ? (
                <div className="overflow-hidden">
                    <Appbar writeIcon={true}></Appbar>
                    <BarLoader
                        color="#22c55e"
                        width={1000}
                    />
                    <div className="min-h-screen bg-gradient-to-r from-black via-green-950 to-black"></div>
                </div>
            ) : (
                <div>
                    <div className="fixed z-50 w-full bg-black">
                        <Appbar writeIcon={true}></Appbar>
                    </div>
                    <div className="pb-16"></div>
                    <div className="min-h-screen bg-gradient-to-r from-black via-green-950 to-black">
                        {posts.map((post: Blog) => {
                            return (
                                <div className="flex justify-center" key={post.id}>
                                    <div className="my-6 mx-2 max-w-2xl w-screen rounded-full bg-green-900 md:min-w-xl">
                                        <Blogcard createdAt={post.createdAt} title={post.title} content={post.content} id={post.id} author={post.author}></Blogcard>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}