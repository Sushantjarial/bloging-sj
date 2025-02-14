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
                <div className=" overflow-hidden">
                    <Appbar ></Appbar>
                    <BarLoader
                        color="#16e612"
                        width={1000}
                    />
                       <div className="bg-[url('https://img.freepik.com/free-photo/abstract-optical-laser-horizontal-background_23-2149116253.jpg?t=st=1733420522~exp=1733424122~hmac=cae12269225f7efff23ca9709a968079291a752cad23166ca81281a31596c19b&w=900')] lg:bg-fixed min-h-screen  "></div>

                </div>
            ) : (
                <div>      <div className=" fixed z-50 w-full   bg-black">
                    <Appbar ></Appbar> </div>
                    <div className="pb-16 "></div>
                    <div className="bg-[url('https://img.freepik.com/free-photo/abstract-optical-laser-horizontal-background_23-2149116253.jpg?t=st=1733420522~exp=1733424122~hmac=cae12269225f7efff23ca9709a968079291a752cad23166ca81281a31596c19b&w=900')] lg:bg-fixed min-h-screen  ">
                    {posts.map((post: Blog) => {
                        return (
                           
                            <div className="flex  justify-center  " key={post.id}>
                                <div className=" my-6 mx-2 max-w-2xl w-screen rounded-full  bg-green-900 md:min-w-xl  ">
                                    <Blogcard createdAt={post.createdAt} title={post.title} content={post.content} id={post.id} author={post.author} ></Blogcard>
                                </div>
                            </div>
                            
                        )
                       
                    })} </div>
                </div>
            )}
        </div>
    )
}