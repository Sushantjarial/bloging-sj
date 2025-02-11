import { useEffect, useState } from "react"
import { BACKEND_URL } from "../../config"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Appbar from "../assets/components/appbar"
import toast from "react-hot-toast"

interface UserInfo {
    firstName: string;
    lastName:string;
    email: string;
    password: string;
}

export default function UpdateProfile() {
    const [userInfo, setUserInfo] = useState<UserInfo>({
        firstName: '',
        lastName:'',
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token")
        async function fetch() {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/v1/user/userInformation`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setUserInfo({
                    ...userInfo,
                    firstName: res.data.user.firstName,
                    lastName:res.data.user.lastName,
                    email: res.data.user.email,

                });
               
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        fetch()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            await axios.put(
                `${BACKEND_URL}/api/v1/user/updateUserInformation`,
                userInfo,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
           toast.error("Failed to update profile");
        }
    };

    return (
        <div>
            <Appbar />
            <div className="flex justify-center items-center h-screen bg-black">
                <div className="max-w-md w-full p-6 border border-green-500 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 text-center text-green-500">Update Profile</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                First Name
                            </label>
                            <input
                                type="text"
                                value={userInfo.firstName}
                                onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })
                           
                                }
                                className="w-full px-3 py-2 border text-green-500 bg-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Last Name
                            </label>
                            <input
                                type="text"
                                value={userInfo.lastName}
                                onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })
                           
                                }
                                className="w-full px-3 py-2 border text-green-500 bg-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={userInfo.email}
                                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                                className="w-full px-3 py-2 border text-green-500 bg-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                             Password 
                            </label>
                            <input
                                type="password"
                                value={userInfo.password}
                                onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                                className="w-full px-3 py-2 border text-green-500 bg-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                                placeholder="Enter your password to update"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-500  py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                        >
                            Update Profile
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}