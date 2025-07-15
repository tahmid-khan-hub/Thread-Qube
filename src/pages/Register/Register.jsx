import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { getAuth } from "firebase/auth";
import app from "../../firebase/firebase.config";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import GItHubSignInUser from "../../hooks/GItHubSignInUser";
import GoogleSignInUser from "../../hooks/GoogleSignInUser";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PageLoading from "../Loader/PageLoading";
import Animation from "../../hooks/Animation";

const Register = () => {
  const auth = getAuth(app);
  const { signUp, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [showIcon, setShowIcon] = useState(false);
  useEffect(()=>{
    document.title = "ThreadQube | Register"
    window.scrollTo(0,0);
  },[])

  const GoogleSignIn = GoogleSignInUser();
  const GitHubSignIn = GItHubSignInUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await signUp(data.email, data.password);

      await updateUserProfile({
        displayName: data.name,
        photoURL: data.photoURL,
      });
      await auth.currentUser.reload();

      const userInfo = {
        name: data.name,
        email: data.email,
        photoURL: data.photoURL,
        badge: "bronze",
        role: "user",
        createdAt: new Date(),
      };

      await axiosSecure.post("/users", userInfo);

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "Something went wrong!",
      });
    }
  };

  return (
    <Animation><PageLoading><div data-aos="fade-up" className="hero min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-xl border border-gray-400 my-16">
        <div className="card-body">
          <h1 className="text-3xl text-center mb-5 font-bold">Register now!</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
            {/* Name */}
            <label className="label">Name</label>
            <input
              type="text"
              className="input"
              placeholder="Enter your name"
              required
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}

            {/* PhotoURL */}
            <label className="label">PhotoURL</label>
            <input
              type="text"
              className="input"
              placeholder="Enter your photoURL"
              required
              {...register("photoURL", {
                
              })}
            />
            

            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Enter your email"
              required
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}

            {/* Password */}
            <label className="label">Password</label>
            <div className="relative flex">
              <input
                type={showIcon ? "text" : "password"}
                required
                className="input"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                    message:
                      "Password must be at least 8 characters, include uppercase, lowercase, number, and special character",
                  },
                })}
/>
            <span onClick={()=> setShowIcon(!showIcon)} className="absolute right-7 top-3 cursor-pointer">{showIcon ? <FaEyeSlash size={20} /> : <FaEye size={20} />}</span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>

            <button className="btn mt-5">Register</button>
            <div className="divider">OR</div>

            {/* Google */}
            <button onClick={GoogleSignIn} className="btn bg-white text-black border-orange-400">
            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
            Register with Google
            </button>

            {/* GitHub */}
            <button onClick={GitHubSignIn} className="btn mt-3 bg-black text-white border-black">
            <svg aria-label="GitHub logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="white" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"></path></svg>
            Register with GitHub
            </button>

            {/* Login Link */}
            <div className="text-sm font-medium text-black mt-5 mb-5">
              Already Have Account?{" "}
              <Link to="/login" className="text-orange-600 hover:underline">
                Join Us Here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div></PageLoading></Animation>
  );
};

export default Register;
