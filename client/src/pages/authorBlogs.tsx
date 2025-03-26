import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Blogcard from "../assets/components/blogCard";
import Appbar from "../assets/components/appbar";
import { BarLoader } from "react-spinners";
import { Blog } from "./oneBlog";

export default function AuthorBlogs() {
    const [loader, setLoader] = useState(true);
    const {id} = useParams();
    const [posts, setPosts] = useState<Blog[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await axios.get(`${BACKEND_URL}/api/v1/user/authorBlogs/?id=${id}`);
                  setPosts(res.data.posts);

                setLoader(false);
            } catch (e: any) {
                toast.error("Something went wrong");
            }
        };

        fetchData();
    }, [ setPosts]);

    return (
        <div className="scroll-smooth">
            {loader ? (
                <div className="overflow-hidden">
                    <Appbar auth="signup"></Appbar>
                    <BarLoader
                        color="#22c55e"
                        width={1000}
                    />
                    <div className="min-h-screen bg-gradient-to-r from-black via-green-950 to-black"></div>
                </div>
            ) : (
                <div>
                    <div className="fixed z-50 w-full bg-black">
                        <Appbar auth="Signup"></Appbar>
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
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}