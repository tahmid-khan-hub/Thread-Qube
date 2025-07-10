import React from 'react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import { Navigate, useLocation } from 'react-router';
import Loader from '../pages/Loader/Loader';

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth();
    const {role, roleLoading} = useUserRole();
    const location = useLocation();

    if(loading || roleLoading) return <Loader></Loader>;

    if(user && role === 'admin') return children;
    return <Navigate to="/" state={{ from: location }} replace ></Navigate>;
};

export default AdminRoute;