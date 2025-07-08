import React from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const { signUp, updateUserProfile } = useAuth(); 
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Create user with email & password
      await signUp(data.email, data.password);

      // Update user profile with name and photo URL
      if (updateUserProfile) {
        await updateUserProfile({
          displayName: data.name,
          photoURL: data.photoURL,
        });
      }

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
    <div className="hero min-h-screen">
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
              {...register("photoURL", {
                pattern: {
                  value:
                    /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))/i,
                  message: "Please enter a valid image URL",
                },
              })}
            />
            {errors.photoURL && (
              <p className="text-red-500 text-sm mt-1">{errors.photoURL.message}</p>
            )}

            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}

            {/* Password */}
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>

            <button className="btn mt-5">Register</button>
            <div className="divider">OR</div>

            {/* Google */}
            <button className="btn bg-white text-black border-orange-400">
              {/* SVG Google Icon here */}
              Register with Google
            </button>

            {/* GitHub */}
            <button className="btn mt-3 bg-black text-white border-black">
              {/* SVG GitHub Icon here */}
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
    </div>
  );
};

export default Register;
