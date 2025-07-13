import React from "react";
import useAuth from "./useAuth";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "./UseAxiosSecure";

const GItHubSignInUser = () => {
  const { GitHubSign } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleGitHubSignIn = async () => {
    try {
      const res = await GitHubSign();
      const user = res.user;

      const userData = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: "user", 
        badge: "bronze", 
        createdAt: new Date(),
      };

      await axiosSecure.post("/users", userData);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Welcome! You’re now signed in",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(location.state ? location.state : "/");
    } catch (err) {
      console.log("GitHub Sign-in Error:", err);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Something went wrong! Please try again.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return handleGitHubSignIn;
};

export default GItHubSignInUser;
