import { useEffect, useState } from "react"
import { BACKEND_URL } from "../../config"
import axios from "axios"
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
           toast.error("Failed to update profile");
        }
    };

    return (
        <div>
            <Appbar />
            <div className="flex justify-center items-center h-screen bg-black">
                <div className="max-w-md w-full p-6 bg-black shadow-lg shadow-green-500 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-6 text-center text-green-500">Update Profile</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-green-500 mb-1">
                                First Name
                            </label>
                            <input
                                type="text"
                                value={userInfo.firstName}
                                onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
                                className="w-full px-4 py-2 border bg-gray-700 border-gray-300 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-green-500 mb-1">
                                Last Name
                            </label>
                            <input
                                type="text"
                                value={userInfo.lastName}
                                onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
                                className="w-full px-4 py-2 border bg-gray-700 border-gray-300 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-green-500 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                value={userInfo.email}
                                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                                className="w-full px-4 py-2 border bg-gray-700 border-gray-300 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-green-500 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                value={userInfo.password}
                                onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                                className="w-full px-4 py-2 border bg-gray-700 border-gray-300 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                                placeholder="Enter your password to update"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                        >
                            Update Profile
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}