import Appbar from "../assets/components/appbar";
import WriteBlogCard from "../assets/components/writeBlogCard";

export default function Write(){
    const token = localStorage.getItem("token") || ""
    return(
        <div className="">
            {token? <Appbar></Appbar>:<Appbar auth="Signin"></Appbar>}

            <WriteBlogCard></WriteBlogCard>
        </div>
    )
}