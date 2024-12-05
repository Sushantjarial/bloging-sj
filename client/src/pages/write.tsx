import Appbar from "../assets/components/appbar";
import WriteBlogCard from "../assets/components/writeBlogCard";

export default function Write(){
    return(
        <div className="">
            <Appbar  writeIcon={true}></Appbar>

            <WriteBlogCard></WriteBlogCard>
        </div>
    )
}