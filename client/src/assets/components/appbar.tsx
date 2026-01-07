import Avatar from "./avatar";
import { Link } from "react-router-dom";
import writeIcon from "./../images/write.svg";

interface Appbarprops {
  writeIcon?: boolean;
  auth?: String;
}
export default function Appbar({
  writeIcon: showWriteIcon,
  auth,
}: Appbarprops) {
  const name = localStorage.getItem("username");
  return (
    <div className="w-full  font-sans flex justify-between bg-black border-green-500 border-b px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 items-center shadow-green-500">
      <Link
        className="cursor-pointer flex text-green-500 text-3xl   px-1 sm:px-2"
        to="/"
      >
        <div className="font-sans font-extrabold">Openverse</div>
      </Link>

      <div className="flex items-center gap-8 sm:gap-8 md:gap-18">
        {showWriteIcon && (
          <Link
            to="/write"
            className="flex items-center text-green-500 hover:text-green-200 transition-colors"
          >
            <span className="hidden sm:block text-xl">Write</span>
            <img src={writeIcon} className="w-8 h-8 sm:hidden" alt="Write" />
          </Link>
        )}

        {auth ? (
          <Link
            to={`/${auth === "Signin" ? "signup" : "signin"}`}
            className={`${auth ? `flex` : `hidden`} items-center`}
          >
            <div className="text-green-500 hover:text-green-200 text-base sm:text-lg md:text-xl px-2 sm:px-3">
              {auth === "Signin" ? "Signup" : "Signin"}
            </div>
          </Link>
        ) : (
          <Avatar
            name={name?.charAt(0).toUpperCase()}
            color="green"
            big={true}
            appBar={true}
          ></Avatar>
        )}
      </div>
    </div>
  );
}
