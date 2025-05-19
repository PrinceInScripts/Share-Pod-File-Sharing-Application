import { useDispatch } from "react-redux";
import {  logoutUser } from "../../redux/slice/auth/authSlice";
import { useEffect } from "react";


const logout = () => {

    const dispatch = useDispatch();
    
    useEffect(()=>{
        const logoutUserFromStorage = async () => {
            await dispatch(logoutUser());
            window.location.href = "/login";
        }
        logoutUserFromStorage();

    },[dispatch])

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <h1 className="text-3xl font-bold text-gray-700 animate-pulse">Logging out...</h1>
        </div>
    )

}

export default logout;