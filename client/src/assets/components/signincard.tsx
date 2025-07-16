import Inputfield from "./inputfield";
import { signinInput } from "@sushantjarial/blog-common";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../config";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const borderAnimationKeyframes = `
  @keyframes borderAnimation {
    0%, 100% {
      background: linear-gradient(90deg, #22c55e 50%, transparent 50%), 
                  linear-gradient(90deg, transparent 50%, #22c55e 50%), 
                  linear-gradient(0deg, transparent 50%, #22c55e 50%), 
                  linear-gradient(0deg, #22c55e 50%, transparent 50%);
      background-repeat: no-repeat;
      background-size: 100% 3px, 100% 3px, 3px 100%, 3px 100%;
      background-position: top, bottom, left, right;
    }
    12.5% {
      background-position: right top, left bottom, top left, bottom right;
    }
    25% {
      background-position: right, left, top, bottom;
    }
    37.5% {
      background-position: right bottom, left top, bottom left, top right;
    }
    50% {
      background-position: bottom, top, right, left;
    }
    62.5% {
      background-position: left bottom, right top, bottom right, top left;
    }
    75% {
      background-position: left, right, bottom, top;
    }
    87.5% {
      background-position: left top, right bottom, top right, bottom left;
    }
  }
`;

const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const slideUpKeyframes = `
  @keyframes slideUp {
    from { transform: translateY(3rem); }
    to { transform: translateY(0); }
  }
`;

const pulseShadowKeyframes = `
  @keyframes pulseShadow {
    0% { box-shadow: 0 0 5px #22c55e; }
    50% { box-shadow: 0 0 20px #22c55e; }
    100% { box-shadow: 0 0 5px #22c55e; }
  }
`;

const style = document.createElement("style");
style.innerHTML =
  fadeInKeyframes +
  slideUpKeyframes +
  borderAnimationKeyframes +
  pulseShadowKeyframes;
document.head.appendChild(style);

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
          `${BACKEND_URL}/api/v1/user/signin`,
          signInput
        );
        const { token } = res.data;
        localStorage.setItem("token", token);
        navigate("/");
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
    <div className="relative p-[3px] rounded-3xl animate-[borderAnimation_3s_ease-in-out_infinite]">
      <div
        className="flex flex-col py-6 px-2 w-80 bg-black text-green-500 justify-center rounded-3xl
                    opacity-0 translate-y-12 
                    animate-[fadeIn_0.5s_ease-out_forwards,slideUp_0.5s_ease-out_forwards]"
      >
        <div className="text-green-500 text-4xl font-bold flex justify-center p-2">
          Sign in
        </div>
        <div className="flex flex-col justify-center mt-3">
          <Inputfield
            onChange={(e) =>
              SetsigninInput({ ...signInput, email: e.target.value })
            }
            name="Email"
            type="email"
            placeholder="ironman@gmail.com"
          ></Inputfield>
          <Inputfield
            onChange={(e) =>
              SetsigninInput({ ...signInput, password: e.target.value })
            }
            name="Password"
            type="password"
            placeholder="ironman3000"
          ></Inputfield>
          <button
            onClick={sendRequest}
            className="bg-green-500 p-1 mt-4 mx-4 rounded-md text-black hover:bg-green-600 transition-colors duration-200"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
