import axios from "axios";
import useAuth from "./useAuth"
import { useNavigate } from "react-router";

const useAxiosSecure = () => {
  const {user, logOut} = useAuth();
  const navigate = useNavigate();
  const axiosSecure = axios.create({
    baseURL: "https://thread-qube-server-main.vercel.app",
  });

  axiosSecure.interceptors.request.use(
    async(config) => {
      if(user){
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosSecure.interceptors.response.use(
    (res) => res,
    (error) => {
      console.log("inside interceptors error", error);
      const status = error.response?.status;

      if (status === 403) {
        navigate("/forbidden");
      } else if (status === 401) {
        logOut()
          .then(() => {
            navigate("/login");
          })
          .catch((err) => {
            console.log(err);
          });
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
