import Inputfield from "./inputfield";
import Bottomwarning from "./bottomWarning";
import { signinInput } from "@sushantjarial/blog-common";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../config";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signincard() {
  const navigate = useNavigate();
  const [signInput, SetsigninInput] = useState<signinInput>({
    email: "",
    password: "",
  });
  const id = useRef<number | null>(null);
  useEffect(() => {
    if (id.current) {
      clearTimeout(id.current);
    }
    id.current = window.setTimeout(
      () => toast.success("use default credentials to checkout the website"),
      100
    );
    return () => {
      if (id.current) {
        clearTimeout(id.current);
      }
    };
  }, []);

  const sendRequest = async () => {
    try {
      if (!(signInput.email || signInput.password)) {
        toast.error("All fields are required");
      } else {
        const res = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin` ,
          signInput
        );
        const { token } = res.data;
        localStorage.setItem("token", token);
        navigate("/blogs");
        toast.success("signed in");
      }
    } catch (e: any) {
      if (e.response) {
        e.response.data.error
          ? e.response.data.error.map((errorr: any) => {
              toast.error(errorr.message);
            })
          : toast.error(e.response.data.message);
      } else {
        toast.error(e.message);
      }
    }
  };

  return (
    <div
      className="  flex flex-col my-auto py-6 px-2 w-80 bg-white  justify-center rounded-3xl shadow-xl shadow-black 
         "
    >
      <div className="text-green-600 text-4xl font-bold  flex justify-center p-2 ">
        Sign in
      </div>
      <div className="flex flex-col justify-center mt-3">
        <Inputfield
          onChange={(e) =>
            SetsigninInput({ ...signInput, email: e.target.value })
          }
          name="Email"
          type="email"
          placeholder="EDITH@gmail.com"
        ></Inputfield>
        <Inputfield
          onChange={(e) =>
            SetsigninInput({ ...signInput, password: e.target.value })
          }
          name="Password"
          type="password"
          placeholder="Iamironman$3000"
        ></Inputfield>
        <button
          onClick={sendRequest}
          className="bg-green-500 p-1 mt-4 mx-4 rounded-md hover:bg-green-600"
        >
          Sign in
        </button>
        <Bottomwarning
          warning="Create an account?"
          to="/signup"
          name="Sign up"
        ></Bottomwarning>
      </div>
    </div>
  );
}
