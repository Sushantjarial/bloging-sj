import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../config";
import { Blog } from "../../pages/oneBlog";
import BlogCard from "./blogCard";
import { useSearchParams } from "react-router-dom";

export default function OneBlogSideCard({ id }: { id: string }) {
  const [userPosts, setUserPosts] = useState<Blog[]>([]);
  const [searchParms] = useSearchParams();
  const blogId = searchParms.get("id");

  useEffect(() => {
    try {
      console.log(id);
      const token = localStorage.getItem("token") || "";
      const fetchData = async () => {
        const res = await axios.get(
          `${BACKEND_URL}/api/v1/blog/userblogs?authorId=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserPosts(res.data.authorBlogs);
      };
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return userPosts.length > 1 ? (
    <div className="text-white">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-green-500/20">
        <h3 className="text-lg font-bold text-green-400">More from Author</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </div>
      <div className="space-y-4">
        {userPosts.slice(0, 4).map((p: Blog) => {
          if (p.id == blogId) {
            return null;
          }

          return (
            <div
              key={p.id}
              className="rounded-lg transition-all duration-200 hover:bg-green-500/5"
            >
              <BlogCard
                createdAt={p.createdAt}
                side={true}
                title={p.title}
                content={p.content}
                id={p.id}
                author={p.author}
                authorId={p.authorId}
              />
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div className="text-center py-6">
      <p className="text-gray-400 text-sm">
        {userPosts[0]?.author.firstName || "Author"} hasn't published any more
        blogs yet.
      </p>
    </div>
  );
}
