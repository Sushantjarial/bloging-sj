import { Link } from "react-router-dom";
interface BottomWarningProps {
    warning: string;
    to:string;
    name:string;
}

export default function Bottomwarning(props: BottomWarningProps){
    return(
        <div className="flex pt-3 ">
        <div className="text-white pl-4  ">{props.warning}</div>
        <Link to={props.to} className="text-blue-500 underline hover:cursor-pointer px-2">{props.name}</Link>
        </div>
    )
}