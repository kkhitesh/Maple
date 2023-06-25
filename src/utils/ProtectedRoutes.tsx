import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../config/firebase";

export const ProtectedRoutes = () => {
  const [userAuth, loading, error] = useAuthState(auth);

  if (loading) return;

  return userAuth ? <Outlet /> : <Navigate to="/home" />;
};
