import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import useAuth from "../../hooks/useAuth";

const Announcement = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const announcement = {
      authorName: user?.displayName,
      authorImage: user?.photoURL,
      title: data.title,
      description: data.description,
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("http://localhost:3000/announcements", announcement);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Announcement posted!", "success");
        reset();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-24 p-6 border-gray-400 bg-gray-100 rounded shadow">
      <h2 className="text-3xl text-black font-bold mb-6 text-center">Post Announcement</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Author Name */}
        <input
          type="text"
          className="input w-full bg-gray-200 text-gray-500"
          defaultValue={user?.displayName}
          readOnly
        />
        {/* Author Image */}
        <input
          type="text"
          className="input w-full bg-gray-200 text-gray-500"
          defaultValue={user?.photoURL}
          readOnly
        />
        {/* Title */}
        <input
          {...register("title", { required: true })}
          type="text"
          className="input w-full bg-gray-200 text-black"
          placeholder="Announcement Title"
        />
        {errors.title && <p className="text-red-500 text-sm">Title is required</p>}

        {/* Description */}
        <textarea
          {...register("description", { required: true })}
          className="textarea w-full bg-gray-200 text-black"
          placeholder="Announcement Description"
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-sm">Description is required</p>
        )}

        <button className="btn w-full bg-orange-500 text-white mt-5">Submit</button>
      </form>
    </div>
  );
};

export default Announcement;
