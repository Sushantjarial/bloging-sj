import { useEffect, useState } from "react";
import axios from "axios";
import Appbar from "../assets/components/appbar";
import BlogCard from "../assets/components/blogCard";
import grid from "./../assets/images/grid.png";
import { BACKEND_URL } from "../../config";
import { Blog } from "./oneBlog";

export default function MyBlogs() {
    const [posts, setPosts] = useState<Blog[]>();

    useEffect(() => {
        const fetch = async () => {
            const token = localStorage.getItem("token") || "";
            const res = await axios.get(`${BACKEND_URL}/api/v1/blog/myblogs`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPosts(res.data.authorBlogs);
        };
        fetch();
    }, []);

    return (
        <div>
            <Appbar />
            <div className="min-h-screen bg-cover bg-black bg-center" style={{ backgroundImage: `url(${grid})` }}>
                {posts?.map((post: Blog) => {
                    return (
                        <div className="flex justify-center bg-transparent" key={post.id}>
                            <div className="my-6 mx-2 max-w-2xl w-screen rounded-full flex bg-green-800 md:min-w-xl">
                                <BlogCard createdAt={post.createdAt} deleteIcon={true} title={post.title} content={post.content} id={post.id} author={post.author} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}