import { useEffect, useState } from "react";
import axios from "axios";
import Appbar from "../assets/components/appbar";
import BlogCard from "../assets/components/blogCard";
import { BACKEND_URL } from "../../config";
import { Blog } from "./oneBlog";
import BarLoader from "react-spinners/BarLoader";

export default function MyBlogs() {
    const [posts, setPosts] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        try {
            const fetch = async () => {
                const token = localStorage.getItem("token") || "";
                const res = await axios.get(`${BACKEND_URL}/api/v1/blog/myblogs`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        
            setPosts(res.data.authorBlogs);
            setLoading(false);
        };
        fetch();
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        loading ? <div className="overflow-hidden">
            <Appbar></Appbar>
            <BarLoader
                color="#16e612"
                width={1000}
            />
            <div className="min-h-screen bg-gradient-to-r from-black via-green-950 to-black"></div>
        </div> :
        <div>
            <Appbar writeIcon={true} />
            <div className="min-h-screen bg-gradient-to-r from-black via-green-950 to-black overflow-y-auto">
                {(posts.length > 0) ? posts.map((post: Blog, index: number) => {
                    return (
                        <div className="flex justify-center bg-transparent" key={post.id} style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="my-6 mx-2 max-w-2xl w-screen rounded-full flex bg-green-800 md:min-w-xl">
                                <BlogCard createdAt={post.createdAt} deleteIcon={true} title={post.title} content={post.content} id={post.id} author={post.author} />
                            </div>
                        </div>
                    )
                }): <div className="text-green-500 justify-center flex text-3xl h-96 font-serif items-center">You haven't published any blogs</div>}
            </div>
        </div>
    );
}