import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import Loader from "../pages/Loader/Loader";

const UserRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (loading || roleLoading) return <Loader />;

  if (user && role === 'user') {
    return children;
  }

  return <Navigate to="/" state={location.pathname} replace />;
};

export default UserRoute;
