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
    <div className="font-semibold  text-white ">
      <div className=" text-green- mx-8 mt-8  text-center text-xl flex items-center font-extrabold w-max">
        More from Author
        <div className="flex items-center justify-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="60"
            height="30"
            x="0"
            y="0"
            viewBox="0 0 512.009 512.009"
            xmlSpace="preserve"
            className=""
          >
            <g>
              <path
                d="M508.625 247.801 392.262 131.437c-4.18-4.881-11.526-5.45-16.407-1.269-4.881 4.18-5.45 11.526-1.269 16.407.39.455.814.88 1.269 1.269l96.465 96.582H11.636C5.21 244.426 0 249.636 0 256.063s5.21 11.636 11.636 11.636H472.32l-96.465 96.465c-4.881 4.18-5.45 11.526-1.269 16.407s11.526 5.45 16.407 1.269c.455-.39.88-.814 1.269-1.269l116.364-116.364c4.511-4.537 4.511-11.867-.001-16.406z"
                fill="#03f100"
                opacity="1"
                data-original="#000000"
              ></path>
            </g>
          </svg>
        </div>
      </div>
      <div className="flex items-center flex-col font-bold ">
        {userPosts.slice(0, 4).map((p: Blog) => {
          if (userPosts.length <= 1) {
            return (
              <div className="text-green-500  font-thin  flex   ">
                {p.author.firstName} haven't published any more blogs
              </div>
            );
          }

          if (p.id == blogId) {
            return <div></div>;
          }

          return (
            <div className="my-6 mx-2 rounded-3xl  " key={p.id}>
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
    <div className="text-green-500 font-thin   p-4 text-lg  lg:block ">
      {userPosts.map((p: Blog) => (
        <div>{p.author.firstName + " haven't published any more blogs"}</div>
      ))}
    </div>
  );
}
