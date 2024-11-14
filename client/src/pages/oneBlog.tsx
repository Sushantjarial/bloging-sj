import { useSearchParams } from "react-router-dom";
import Appbar from "../assets/components/appbar";
import Avatar from "../assets/components/avatar";
import { useRecoilState, useRecoilValue } from "recoil";
import {  UserName } from "../state/atoms";
import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
export default function OneBlog() {
    const [urlSearchParms ,setUrl] = useSearchParams();
    const id = urlSearchParms.get("id");
    const firstName= urlSearchParms.get("firstName");
    const lastName = urlSearchParms.get("lastName");
    const [name ,setName]=useRecoilState(UserName)
    console.log(id)
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/load/?id=${id}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res)=>{
            setName(res.data.name.firstName)
        })
    },[])
    return (
        <div>
            <Appbar name={name.charAt(0).toUpperCase()}></Appbar>
            <div className="grid grid-cols-12 ">
                <div className="col-span-8 border-r-2 border-green-500 text-blue-600"></div>
                <div className="col-span-4 w-screen h-screen ">
                    <div className="flex">
                        <Avatar name={firstName ? firstName.charAt(0).toUpperCase() : ""} color="" big={false}></Avatar>
                        <div>{firstName +" " + lastName} </div>

                    </div>

                </div>
            </div>
        </div>
    );
}