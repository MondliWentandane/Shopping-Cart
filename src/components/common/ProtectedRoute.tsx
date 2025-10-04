import type React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelectore } from "../../app/hooks";

interface ProtectedRouteProps{
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) =>{
    const{ user, token } = useAppSelectore((state)=> state.auth);
    if(!user || !token){
        return <Navigate to="/login" replace />
    }

    return <>{children}</>
};

export default ProtectedRoute;