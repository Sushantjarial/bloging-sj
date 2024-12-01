import { useRecoilValue } from "recoil";
import Appbar from "../assets/components/appbar";
import { UserName } from "../state/atoms";
import WriteBlogCard from "../assets/components/writeBlogCard";

export default function Write(){
    const name=localStorage.getItem("username")||"?"
    return(
        <div className="">
            <Appbar name={name} writeIcon={true}></Appbar>

            <WriteBlogCard></WriteBlogCard>
        </div>
    )
}