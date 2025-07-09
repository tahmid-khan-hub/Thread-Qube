import React from 'react';
import useAuth from "../hooks/useAuth"
import { Navigate, useLocation } from 'react-router';
import Loader from '../pages/Loader/Loader';

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth()
    const location = useLocation()

    if(loading) return <Loader></Loader>

    if(user && user.email) return children

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;