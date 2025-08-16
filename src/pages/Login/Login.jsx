import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth"
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import GoogleSignInUser from "../../hooks/GoogleSignInUser";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PageLoading from "../Loader/PageLoading";
import Animation from "../../hooks/Animation";
import Lottie from "lottie-react";
import LoginLottie from "../../assets/lotties/Login.json"

const Login = () => {
    const {signIn} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [showIcon, setShowIcon] = useState(false);
    useEffect(()=>{
      document.title = "ThreadQube | Login"
      window.scrollTo(0,0);
    },[])

    const GoogleSignIn = GoogleSignInUser();

    const {register, handleSubmit, formState: { errors }} = useForm();

    const onsubmit = async(data) => {
        try{
            await signIn(data.email, data.password)
            Swal.fire({
                icon: "success",
                title: "Login Successful!",
                timer: 1500,
                showConfirmButton: false,
            });
            navigate(`${location.state ? location.state : "/"}`);
        }
        catch(err){
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: err.message || "Invalid email or password",
            });
        }
    }
  return (
    <Animation><PageLoading><div data-aos="fade-up" className="hero min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-xl border border-gray-400 my-12">
        <div className="card-body">
          <h1 className="text-3xl text-center mb-5 font-bold">Join Us now!</h1>
           {/* Lottie Animation */}
            <div className="w-40 mx-auto mb-4">
              <Lottie animationData={LoginLottie} loop={true} />
            </div>
          <form onSubmit={handleSubmit(onsubmit)} className="fieldset">
            {/* email */}
            <label className="label">Email</label>
            <input type="email" className="input w-full" required placeholder="Enter your email" {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })} />
            {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
            {/* password */}
            <label className="label">Password</label>
            <div className="relative flex">
              <input  type={showIcon ? "text":"password"} required className="input w-full" placeholder="Enter your password" {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}/>
                <span onClick={()=> setShowIcon(!showIcon)} className="absolute right-4 top-3 cursor-pointer">{showIcon ? <FaEyeSlash size={20} /> : <FaEye size={20} />}</span>
            </div>
            {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>

            <button className="btn bg-gradient-to-r from-[#ef7706] to-[#fa9a1b] hover:from-[#fa9a1b] hover:to-[#ef7706] text-white mt-5">Join Us</button>
            <div className="divider">OR</div>

            {/* Google */}
            <button onClick={GoogleSignIn} className="btn bg-white text-black border-orange-400">
            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
            Join Us with Google
            </button>

             {/* Register Link */}
            <div className="text-sm font-medium mt-5 mb-5">
                Not registered?{" "}
                <Link to="/register" className="text-orange-600 hover:underline">
                    Create account
                </Link>
            </div>

            </form>
        </div>
      </div>
    </div></PageLoading></Animation>
  );
};

export default Login;
