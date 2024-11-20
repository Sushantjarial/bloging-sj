import { useSearchParams, useNavigate } from "react-router-dom";
import Appbar from "../assets/components/appbar";
import { useRecoilState } from "recoil";
import { BlogState, UserName } from "../state/atoms";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import OneBlogCard from "../assets/components/oneBlogCard";
import OneBlogSideCard from "../assets/components/oneBlogSideCard";

export interface Blog {
  id: string;
  title: string;
  content: string;
  author: {
    firstName: string;
    lastName: string;
  };
}

export default function OneBlog() {
  const navigate = useNavigate();
  const [urlSearchParams] = useSearchParams();
  const id = urlSearchParams.get("id");
  const [posts, setPosts] = useRecoilState(BlogState);
  const [name, setName] = useRecoilState(UserName);

  // Find the post in the Recoil state if it exists
  const [post, setPost] = useState<Blog | null>(
    posts.find((p) => p.id === id) || null
  );

  useEffect(() => {
    if (post) return;

    const fetchData = async () => {
      const token = localStorage.getItem("token") || "";
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const fetchedPosts: Blog[] = res.data.posts;
        setPosts(fetchedPosts);
        setName(res.data.name.firstName);

        const fetchedPost = fetchedPosts.find((p) => p.id === id);
        if (fetchedPost) setPost(fetchedPost);
      } catch (e: any) {
        toast.error("Not logged in");
        navigate("/signin");
      }
    };

    fetchData();
  }, [id, post, setPosts, setName, navigate]);

  if (!post) {
    return <div className="flex justify-center h-screen items-center"><PulseLoader
      color="#17e317"
      size={25}
    /></div>;
  }

  return (
    <div>
      <Appbar name={name.charAt(0).toUpperCase()} />
      <div className=" lg:grid grid-cols-12 ">
        <div className=" lg:grid col-span-8  shadow-lg lg:border-r">
          <OneBlogCard id={post.id} title={post.title} content={post.content} author={{
            firstName: post.author.firstName,
            lastName: post.author.lastName
          }}      ></OneBlogCard>
        </div>
        <div className=" hidden  lg:block  col-span-4 bg-black ">
        <OneBlogSideCard></OneBlogSideCard>
        </div>
      </div>
    </div>
  );
}
