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
        if(!appBar) return;
        setDropdownVisible(!dropdownVisible);
    };

    const getBackgroundColor = () => {
        switch(color) {
            case 'blue': return 'bg-blue-500';
            case 'green': return 'bg-green-500';
            default: return 'bg-green-500';
        }
    };

    return (
        <div className="relative">
            <div
                onClick={toggleDropdown}
                className={`flex items-center justify-center ${big ? 'w-9 h-9 text-3xl' : 'w-6 h-6'} 
                ${getBackgroundColor()} rounded-full font-bold text-white 
                ${appBar ? "cursor-pointer hover:opacity-90 transition-opacity" : ""}`}
            >
                {name}
            </div>
            {dropdownVisible && (
                <div className="flex flex-col absolute right-0 mt-2 z-50 w-48 bg-black text-white border border-green-500 rounded-md shadow-lg ">
                   
                        <Link to="/myBlogs" className="hover:bg-green-600  cursor-pointer px-4 py-2">My Blogs </Link>
                
                        <Link to="/updateProfile" className="hover:bg-green-600  cursor-pointer px-4 py-2">Update Profile </Link>
                     
                        
                        <Link className="px-4 py-2 hover:bg-green-900 cursor-pointer flex text-red-500 font-extralight items-center " to="/signin" onClick={()=>localStorage.clear()}>
                        <div className="pr-2">Logout</div>
                          
                          
                          <img src="   https://cdn-icons-png.flaticon.com/512/3840/3840829.png "  className="h-4 w-4" alt="" title="" ></img>

                          
                          
                        </Link>


                    
                </div>
            )}
        </div>
    );
}