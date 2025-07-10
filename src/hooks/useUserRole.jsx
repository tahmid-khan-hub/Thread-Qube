import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUserRole = () => {
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();
    
    const {data: roleData = {}, isLoading: roleLoading} = useQuery({
        queryKey: ["userRole", user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`http://localhost:3000/users?email=${user.email}`)
            return res.data;
        }
    })

    const role = roleData?.role;
    return {role, roleLoading};
};

export default useUserRole;