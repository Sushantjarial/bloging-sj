import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../config";
import { Blog } from "../../pages/oneBlog";
import Blogcard from "./blogCard";
import { useSearchParams } from "react-router-dom";
import hidden from "./../images/hidden.png"

export default function OneBlogSideCard({ id , hideSide }: { id: string , hideSide:()=>void }) {
const [userPosts,setUserPosts]=useState<Blog[]>([])
const[searchParms]=useSearchParams()
const blogId=searchParms.get("id");



  useEffect(() => {
    try {
      const token = localStorage.getItem("token")||"";
      const fetchData = async () => {
        const res = await axios.get(
          `${BACKEND_URL}/api/v1/blog/userblogs?authorId=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }

        );
        if((res.data.authorBlogs && res.data.authorBlogs.length<2)){
          hideSide();
          return;
        }
        setUserPosts(res.data.authorBlogs)

      };
      fetchData();

    } catch(e) {
        console.log(e)
    }
  },[]);

  return (
    <div className="font-semibold  text-white ">
      <div className="font-semibold text-green- mx-8 mt-8  text-center text-xl flex items-center">More from Author
        <img title="Hide" src={hidden} onClick={hideSide}  className="h-8 w-12 pl-3 hover:cursor-pointer " ></img>
         </div>
      <div className="flex items-center flex-col font-bold ">
        {userPosts.slice(0, 4).map((p: any) => {
             if(p.id==blogId){
              return <div></div>  
             }

            return (
          <div className="my-6 mx-2 rounded-3xl  " key={p.id}>
              <Blogcard side={true} title={p.title} content={p.content} id={p.id} author={p.author} />
          </div>
            );
        })}
        
      </div>
    </div>
  );
}
