import Auth from "../assets/components/auth";
import Quote from "../assets/components/quote";
import Signincard from "../assets/components/signincard";

export default function Signin(){
    return(
        <div className="grid grid-cols-1 lg:grid-cols-2 ">
            <Auth Card={<Signincard></Signincard>}></Auth>
          <div className="hidden lg:block"> <Quote></Quote></div> 

        </div>
    )
}