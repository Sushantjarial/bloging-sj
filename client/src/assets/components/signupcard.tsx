import Inputfield from "./inputfield"
import Bottomwarning from "./bottomWarning"
import { signupInput } from "@sushantjarial/blog-common"
import { useState } from "react"
import axios from "axios"
import {BACKEND_URL} from "./../../../config"
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';
export default function Signupcard(){

    const navigate=useNavigate()
   const [signInput,setSignupInput]=useState<signupInput>({
    firstName: "",
    lastName: "",
    email:"",
    password: ""
   })

   const   sendRequest=async()=>{
    try{
      if(!signInput.firstName ||!signInput.lastName || !signInput.email||!signInput.password){
         toast.error('All fields are required')
      }
      else{
   const res= await axios.post(`${BACKEND_URL}/api/v1/user/signup`, signInput);
   toast.success("Succesfully signed up")
   const {token} = res.data ;
   localStorage.setItem("token",token)
    navigate("/blogs")
   
    } }
    catch(e:any){
      //  alert(e.response.data.message)
       e.response.data.error.map((errorr:any)=>{toast.error(errorr.message)


       })       
    }
 }
    return(
        <div className="  flex flex-col my-auto py-6 px-2 w-80 bg-white  justify-center rounded-3xl shadow-xl shadow-black 
         ">
            <div className="text-green-600 text-4xl font-bold  flex justify-center p-2 ">Sign up</div>
           <div className="flex flex-col justify-center mt-3">
            <Inputfield  onChange={(e)=>setSignupInput ({...signInput ,firstName:e.target.value})} name="First Name"  placeholder="Tony"></Inputfield>
            <Inputfield onChange={(e)=>setSignupInput ({...signInput ,lastName:e.target.value})} name="Last Name"  placeholder="Stark"></Inputfield>
            <Inputfield onChange={(e)=>setSignupInput ({...signInput ,email:e.target.value})} name="Email" type="email" placeholder="EDITH@gmail.com"></Inputfield>
            <Inputfield onChange={(e)=>setSignupInput ({...signInput ,password:e.target.value})} name="Password" type="password" placeholder="IamIronMan$3000" ></Inputfield>
            <button onClick={sendRequest} className="bg-green-500 p-1 mt-2 mx-4 rounded-md hover:bg-green-600">Sign up</button>
            <Bottomwarning warning="Already have an account?" to="/signin" name="Sign in"></Bottomwarning>
            </div>
            </div>
    )
}

