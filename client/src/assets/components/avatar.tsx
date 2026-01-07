import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

interface AvatarProps {
  name?: string | null;
  color?: string;
  big?: Boolean;
  appBar?: Boolean;
}

export default function Avatar({ name, color, big, appBar }: AvatarProps) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    if (!appBar) return;
    setDropdownVisible(!dropdownVisible);
  };

  const getBackgroundColor = () => {
    switch (color) {
      case "blue":
        return "bg-blue-500";
      case "green":
        return "bg-green-500";
      default:
        return "bg-green-500";
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node) &&
      avatarRef.current &&
      !avatarRef.current.contains(e.target as Node)
    ) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (dropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownVisible]);

  return (
    <div className="relative">
      <div
        ref={avatarRef}
        onClick={toggleDropdown}
        className={`flex items-center select-none justify-center ${
          big ? "w-9 h-9 text-3xl" : "w-6 h-6"
        } 
                ${getBackgroundColor()} rounded-full font-bold text-white 
                ${
                  appBar
                    ? "cursor-pointer hover:opacity-90 transition-opacity"
                    : ""
                }`}
      >
        {name ? name : "?"}
      </div>
      {dropdownVisible && name && (
        <div
          ref={dropdownRef}
          className="flex flex-col absolute right-0 mt-2 z-50 w-48 bg-black text-white border border-green-500 rounded-md shadow-lg "
        >
          <Link
            to="/myBlogs"
            className="hover:bg-green-600  cursor-pointer px-4 py-2"
          >
            My Blogs{" "}
          </Link>

          <Link
            to="/updateProfile"
            className="hover:bg-green-600  cursor-pointer px-4 py-2"
          >
            Update Profile{" "}
          </Link>

          <div
            onClick={async () => {
              await navigator.clipboard.writeText(
                "openverse.sushantjarial.tech/author/" +
                  localStorage.getItem("userId")
              );
              toast.success("Link copied to clipboard");
            }}
            className="hover:bg-green-600  cursor-pointer px-4 py-2"
          >
            Share Profile{" "}
          </div>

          <Link
            className="px-4 py-2 hover:bg-green-900 cursor-pointer flex text-red-500 font-extralight items-center "
            to="/signin"
            onClick={() => localStorage.clear()}
          >
            <div className="pr-2">Logout</div>

            <img
              src="   https://cdn-icons-png.flaticon.com/512/3840/3840829.png "
              className="h-4 w-4"
              alt=""
              title=""
            ></img>
          </Link>
        </div>
      )}
    </div>
  );
}
