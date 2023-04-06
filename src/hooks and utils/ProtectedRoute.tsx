import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { RootState } from "../store";

export default function ProtectedRoute({ children }: { children: any; redirect: string;}) {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    if(!isLoggedIn) {
        return children;
    } else {
        return <Navigate to="/login"  replace />;
    }
}