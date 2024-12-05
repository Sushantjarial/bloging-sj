import { useState } from "react";
import { Link } from "react-router-dom";

interface AvatarProps {
    name?: string | null;
    color?: string;
    big?: Boolean;
    appBar?:Boolean
}

export default function Avatar({ name, color, big ,appBar }: AvatarProps) {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        if(!appBar)return;
        
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <div className="relative">
            <div
                onClick={toggleDropdown}
                className={`${big ? 'w-9 h-9 text-3xl' : 'w-6 h-6'} ${color ? `bg-${color}-500` : 'bg-green-500'} rounded-full font-bold text-center text-black ${appBar?"cursor-pointer":""}`}
            >
                {name?.charAt(0).toUpperCase()}
            </div>
            {dropdownVisible && (
                <div className="flex flex-col absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                   
                        <Link to="/myBlogs" className="hover:bg-green-300 cursor-pointer px-4 py-2">My Blogs </Link>
                
                     
                        
                        <Link className="px-4 py-2 hover:bg-green-300 cursor-pointer" to="/signin" onClick={()=>localStorage.clear()}>
                          Logout
                        </Link>


                    
                </div>
            )}
        </div>
    );
}