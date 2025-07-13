import axios from "axios";
import { useEffect } from "react";

const useAxiosSecure = () => {
  const axiosSecure = axios.create({
    baseURL: "http://localhost:3000",
    // withCredentials: true, 
  });

  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      // config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }, [axiosSecure]);

  return axiosSecure;
};

export default useAxiosSecure;
