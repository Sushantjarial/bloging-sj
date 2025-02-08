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
                <div className="flex flex-col absolute right-0 mt-2 w-48 bg-black text-white border border-green-500 rounded-md shadow-lg z-50">
                   
                        <Link to="/myBlogs" className="hover:bg-green-600  cursor-pointer px-4 py-2">My Blogs </Link>
                
                     
                        
                        <Link className="px-4 py-2 hover:bg-green-900 cursor-pointer flex text-red-500 font-extralight items-center " to="/signin" onClick={()=>localStorage.clear()}>
                        <div className="pr-2">Logout</div>
                          
                          
                          <img src="   https://cdn-icons-png.flaticon.com/512/3840/3840829.png "  className="h-4 w-4" alt="" title="" ></img>

                          
                          
                        </Link>


                    
                </div>
            )}
        </div>
    );
}