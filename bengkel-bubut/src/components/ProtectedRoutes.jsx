import {useContext, useState} from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import AuthContext from "./store/AuthContext";



const ProtectedRoutes = () => {
    const location = useLocation();
    const isAuth = useContext(AuthContext)
    return isAuth.isLoggedIn ? <Outlet/> : (
        <Navigate to="/login" replace state={{ from: location }} />
      )
}

export default ProtectedRoutes;