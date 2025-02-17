import Appbar from "../assets/components/appbar";
import Signincard from "../assets/components/signincard";

export default function Signin(){
    return(
        <div>
            <Appbar auth="Signin" ></Appbar>
        <div className="bg-black h-screen w-full flex justify-center items-center " >
            <Signincard></Signincard>
        </div>
        </div>
    )
}