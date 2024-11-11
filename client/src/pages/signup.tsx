import Quote from "../assets/components/quote";
import Auth from "../assets/components/auth";
import Signupcard from "../assets/components/signupcard";

export default function Signup(){
    return(
       < div className="grid grid-cols-1 lg:grid-cols-2 " >
      
      <Auth Card={<Signupcard></Signupcard>}></Auth>
        <div className=" hidden md:block">    
            <Quote></Quote>
            </div>
         

    </div> 
    )

}