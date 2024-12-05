import { useSearchParams, useNavigate } from "react-router-dom";
import Appbar from "../assets/components/appbar";
import { useRecoilState } from "recoil";
import { BlogState } from "../state/atoms";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import toast from "react-hot-toast";
import { BarLoader } from "react-spinners";
import OneBlogCard from "../assets/components/oneBlogCard";
import OneBlogSideCard from "../assets/components/oneBlogSideCard";

export interface Blog {
  id: string;
  title: string;
  content: string;
  author: {
    firstName: string;
    lastName: string;
    id: string
  };
}

export default function OneBlog() {
  const navigate = useNavigate();
  const [urlSearchParams] = useSearchParams();
  const id = urlSearchParams.get("id");
  const [posts, setPosts] = useRecoilState(BlogState);
  const[sideCard,setSideCard]=useState(true)

  const hideSide=()=>{
    setSideCard(false)
  }

  // Find the post in the Recoil state if it exists
  const [post, setPost] = useState<Blog | null>(
    posts.find((p) => p.id === id) || null
  );

  useEffect(() => {
    if (post && post.id === id) return;

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

        const fetchedPost = fetchedPosts.find((p) => p.id === id);
        if (fetchedPost) setPost(fetchedPost);
      } catch (e: any) {
        toast.error("Not logged in");
        navigate("/signin");
      }
    };

    fetchData();
  }, [id, post, setPosts, navigate]);

  if (!(post && post.id==id)) {
    return(
    <div>
    <Appbar></Appbar>
    <BarLoader
color="#16e612"
width={1000}
/>
<div></div>

</div>
    )

  }

  return (
    <div className="">
      <div className=" ">
      <Appbar  />
      </div>
      <div className=" lg:grid grid-cols-12  bg-black h-screen ">
        <div className= {`lg:grid ${sideCard ? 'col-span-8 border-r ' : 'col-span-12 '}  shadow-lg lg:`} >
          <OneBlogCard id={post.id} title={post.title} content={post.content} author={{
            firstName: post.author.firstName,
            lastName: post.author.lastName,
            id:post.author.id
          }}      ></OneBlogCard>
        </div>
        <div className={`hidden lg:${sideCard ? 'block' : 'hidden'} col-span-4 bg-black overflow-hidden`} >
          <div>
            
        <OneBlogSideCard id={post.author.id} hideSide ={hideSide} ></OneBlogSideCard>
        </div>
        </div>
      </div>
    </div>
  );
}
