import Signupcard from "../assets/components/signupcard";
import Appbar from "../assets/components/appbar";

export default function Signup(){
    return(
     
    <div>
    <Appbar auth="Signup" ></Appbar>
<div className="bg-black h-screen w-full flex justify-center items-center " >
<Signupcard></Signupcard>
</div>
</div>
    )

}