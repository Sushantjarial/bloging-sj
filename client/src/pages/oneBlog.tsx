import { useSearchParams, useNavigate } from "react-router-dom";
import Appbar from "../assets/components/appbar";
import Avatar from "../assets/components/avatar";
import { useRecoilState } from "recoil";
import { BlogState, UserName } from "../state/atoms";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import toast from "react-hot-toast";

interface Blog {
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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Appbar name={name.charAt(0).toUpperCase()} />
      <div className="grid grid-cols-12   ">
        <div className="col-span-2 "></div>
        <div className="col-span-8 px-8 py-4 border-green-500 text-start ">
        <h1 className="text-6xl font-bold py-4 ">{post.title}</h1>
        <div className="flex items-center py-4">        <Avatar name="S" big={true} ></Avatar>
        <div className="flex-col items-center justify-start  px-2">
        <div className="text-xl  font-semibold ">{post.author.firstName +" "+post.author.lastName}</div>
        <div className="text-xs -my-1">published on 8 sep 2003</div>
        </div>
        </div>

        <p className="text-2xl ">{post.content}</p>
        </div>



      
      </div>
    </div>
  );
}
