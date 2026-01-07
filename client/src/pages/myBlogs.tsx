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
            Authorization: `Bearer ${token}`,
          },
        });

        setPosts(res.data.authorBlogs);
        setLoading(false);
      };
      fetch();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return loading ? (
    <div className="overflow-hidden">
      <Appbar></Appbar>
      <BarLoader color="#16e612" width={1000} />
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-green-950 to-slate-950"></div>
    </div>
  ) : (
    <div className="bg-gradient-to-b from-slate-950 via-green-950 to-slate-950 min-h-screen">
      <Appbar writeIcon={true} />
      <div className="min-h-screen pt-8 pb-16">
        {posts.length > 0 ? (
          <div className="space-y-6 px-4 sm:px-6 lg:px-8">
            {posts.map((post: Blog, index: number) => (
              <div
                className="flex justify-center"
                key={post.id}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-full max-w-3xl">
                  <BlogCard
                    createdAt={post.createdAt}
                    deleteIcon={true}
                    title={post.title}
                    content={post.content}
                    id={post.id}
                    author={post.author}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="text-green-500 text-xl md:text-3xl font-serif mb-4">
                You haven't published any blogs yet
              </div>
              <p className="text-green-400 text-sm md:text-base">
                Start sharing your thoughts with the world!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
