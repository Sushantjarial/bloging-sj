import { useSearchParams, useNavigate } from "react-router-dom";
import Appbar from "../assets/components/appbar";
import { useRecoilState } from "recoil";
import { BlogState } from "../state/atoms";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import toast from "react-hot-toast";
import OneBlogCard from "../assets/components/oneBlogCard";
import OneBlogSideCard from "../assets/components/oneBlogSideCard";

export interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    firstName: string;
    lastName: string;
  };
  authorId: string;
}

export default function OneBlog() {
  const navigate = useNavigate();
  const [urlSearchParams] = useSearchParams();
  const id = urlSearchParams.get("id");
  const [posts, setPosts] = useRecoilState(BlogState);
  const [sideCard, setSideCard] = useState(false);

  const hideSide = () => {
    setSideCard(!sideCard);
  };

  const [post, setPost] = useState<Blog | null>(
    posts.find((p) => p.id === id) || null
  );
  const token = localStorage.getItem("token") || null;
  useEffect(() => {
    if (post && post.id === id) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/api/v1/user/load/?id=${id}`
        );

        const fetchedPost = res.data.post;
        console.log(fetchedPost);
        setPost(fetchedPost);
      } catch (e: any) {
        toast.error("Not logged in");
        navigate("/signin");
      }
    };

    fetchData();
  }, [id, post, setPosts, navigate]);

  if (!(post && post.id == id)) {
    return (
      <div className="min-h-screen bg-black">
        <div className="fixed inset-0 bg-gradient-to-b from-green-500/10 via-green-500/5 to-transparent pointer-events-none"></div>
        {token ? <Appbar /> : <Appbar auth="Signup" />}

        <div className="lg:grid grid-cols-12 gap-0 max-w-8xl mx-auto relative">
          <div className="col-span-12">
            <div className="px-4 lg:px-24 py-8 text-slate-100 max-w-5xl mx-auto">
              {/* Title skeleton */}
              <div className="space-y-3 mb-6">
                <div className="h-10 bg-gray-800/50 rounded-lg w-3/4 animate-pulse"></div>
                <div className="h-6 bg-gray-800/50 rounded-lg w-1/2 animate-pulse"></div>
              </div>

              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-800/50 rounded-full animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-800/50 rounded w-32 animate-pulse"></div>
                    <div className="h-3 bg-gray-800/50 rounded w-24 animate-pulse"></div>
                  </div>
                </div>
              </div>

              <div className="w-full h-64 bg-gray-800/50 rounded-lg mb-8 animate-pulse"></div>

              <div className="space-y-4">
                <div className="space-y-2 mb-6">
                  <div className="h-4 bg-gray-800/50 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-800/50 rounded w-5/6 animate-pulse"></div>
                  <div className="h-4 bg-gray-800/50 rounded w-full animate-pulse"></div>
                </div>

                <div className="border-l-4 border-green-500/30 pl-4 py-1 my-6">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-800/50 rounded w-5/6 animate-pulse"></div>
                    <div className="h-4 bg-gray-800/50 rounded w-4/6 animate-pulse"></div>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="h-4 bg-gray-800/50 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-800/50 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-gray-800/50 rounded w-5/6 animate-pulse"></div>
                </div>

                <div className="bg-gray-800/30 rounded-lg p-4 my-6">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-800/50 rounded w-4/6 animate-pulse"></div>
                    <div className="h-4 bg-gray-800/50 rounded w-5/6 animate-pulse"></div>
                    <div className="h-4 bg-gray-800/50 rounded w-3/6 animate-pulse"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="h-4 bg-gray-800/50 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-800/50 rounded w-5/6 animate-pulse"></div>
                  <div className="h-4 bg-gray-800/50 rounded w-4/6 animate-pulse"></div>
                </div>
              </div>

              <div className="flex gap-2 mt-8">
                <div className="h-8 w-16 bg-gray-800/50 rounded-full animate-pulse"></div>
                <div className="h-8 w-24 bg-gray-800/50 rounded-full animate-pulse"></div>
                <div className="h-8 w-20 bg-gray-800/50 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="fixed inset-0 bg-gradient-to-b from-green-500/10 via-green-500/5 to-transparent pointer-events-none"></div>
      {token ? <Appbar writeIcon={true} /> : <Appbar auth="Signup" />}

      <div className="lg:grid grid-cols-12 gap-0 max-w-8xl mx-auto relative">
        <div className={`lg:grid ${sideCard ? "col-span-8" : "col-span-12"} `}>
          <OneBlogCard post={post} hideSide={hideSide} />
        </div>

        <div
          className={`hidden lg:block col-span-4 relative ${
            sideCard ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
        >
          <div className="sticky top-0">
            <div className="absolute left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-green-500/40 to-transparent" />
            <div className="pl-4">
              <OneBlogSideCard id={post.authorId} />
            </div>
          </div>
        </div>

        <div className="lg:hidden w-full">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-green-500/40 to-transparent my-4" />
          <OneBlogSideCard id={post.authorId} />
        </div>
      </div>
    </div>
  );
}
