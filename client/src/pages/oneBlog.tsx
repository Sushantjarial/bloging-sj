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
    id: string | undefined;
    firstName: string;
    lastName: string;
  };
  authorId: string;
}

export default function OneBlog() {
  const navigate = useNavigate();
  const [urlSearchParams] = useSearchParams();
  const id = urlSearchParams.get("id");
  const authorId = urlSearchParams.get("authorId");
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

        <div className="w-full">
          <div className="px-4 sm:px-6 lg:px-24 py-6 sm:py-8 text-slate-100 max-w-5xl mx-auto">
            {/* Title skeleton */}
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div className="h-8 sm:h-10 bg-gray-800/50 rounded-lg w-full sm:w-3/4 animate-pulse"></div>
              <div className="h-5 sm:h-6 bg-gray-800/50 rounded-lg w-3/4 sm:w-1/2 animate-pulse"></div>
            </div>

            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800/50 rounded-full animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-3 sm:h-4 bg-gray-800/50 rounded w-24 sm:w-32 animate-pulse"></div>
                  <div className="h-2 sm:h-3 bg-gray-800/50 rounded w-20 sm:w-24 animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="w-full h-48 sm:h-64 bg-gray-800/50 rounded-lg mb-6 sm:mb-8 animate-pulse"></div>

            <div className="space-y-3 sm:space-y-4">
              <div className="space-y-2 mb-4 sm:mb-6">
                <div className="h-3 sm:h-4 bg-gray-800/50 rounded w-full animate-pulse"></div>
                <div className="h-3 sm:h-4 bg-gray-800/50 rounded w-5/6 animate-pulse"></div>
                <div className="h-3 sm:h-4 bg-gray-800/50 rounded w-full animate-pulse"></div>
              </div>

              <div className="border-l-4 border-green-500/30 pl-3 sm:pl-4 py-1 my-4 sm:my-6">
                <div className="space-y-2">
                  <div className="h-3 sm:h-4 bg-gray-800/50 rounded w-5/6 animate-pulse"></div>
                  <div className="h-3 sm:h-4 bg-gray-800/50 rounded w-4/6 animate-pulse"></div>
                </div>
              </div>

              <div className="space-y-2 mb-4 sm:mb-6">
                <div className="h-3 sm:h-4 bg-gray-800/50 rounded w-full animate-pulse"></div>
                <div className="h-3 sm:h-4 bg-gray-800/50 rounded w-3/4 animate-pulse"></div>
                <div className="h-3 sm:h-4 bg-gray-800/50 rounded w-5/6 animate-pulse"></div>
              </div>

              <div className="bg-gray-800/30 rounded-lg p-3 sm:p-4 my-4 sm:my-6">
                <div className="space-y-2">
                  <div className="h-3 sm:h-4 bg-gray-800/50 rounded w-4/6 animate-pulse"></div>
                  <div className="h-3 sm:h-4 bg-gray-800/50 rounded w-5/6 animate-pulse"></div>
                  <div className="h-3 sm:h-4 bg-gray-800/50 rounded w-3/6 animate-pulse"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="h-3 sm:h-4 bg-gray-800/50 rounded w-full animate-pulse"></div>
                <div className="h-3 sm:h-4 bg-gray-800/50 rounded w-5/6 animate-pulse"></div>
                <div className="h-3 sm:h-4 bg-gray-800/50 rounded w-4/6 animate-pulse"></div>
              </div>
            </div>

            <div className="flex gap-2 mt-6 sm:mt-8">
              <div className="h-7 sm:h-8 w-14 sm:w-16 bg-gray-800/50 rounded-full animate-pulse"></div>
              <div className="h-7 sm:h-8 w-20 sm:w-24 bg-gray-800/50 rounded-full animate-pulse"></div>
              <div className="h-7 sm:h-8 w-16 sm:w-20 bg-gray-800/50 rounded-full animate-pulse"></div>
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

      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-6 xl:gap-8">
          <div
            className={`transition-all duration-300 ${
              sideCard ? "lg:col-span-8" : "lg:col-span-12"
            }`}
          >
            <OneBlogCard post={post} hideSide={hideSide} />
          </div>

          <div
            className={`hidden lg:block lg:col-span-4 transition-all duration-300 ${
              sideCard ? "hidden" : "opacity-0 "
            }`}
          >
            <div className="sticky top-16 max-h-[calc(100vh-5rem)] overflow-hidden">
              <div className="relative h-full">
                <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-green-500/40 to-transparent" />
                <div className="bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-xl p-5 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-green-500/30 scrollbar-track-transparent">
                  <OneBlogSideCard id={authorId || post.authorId} />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:hidden mt-6 sm:mt-8">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-green-500/40 to-transparent mb-6 sm:mb-8" />
            <div className="bg-black bg-opacity-50 border border-green-500 border-opacity-30 rounded-lg p-4 sm:p-6">
              <OneBlogSideCard id={authorId || post.authorId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
