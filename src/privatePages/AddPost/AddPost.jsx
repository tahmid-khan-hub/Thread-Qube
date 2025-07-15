import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import Animation from "../../hooks/Animation";

const AddPost = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [postCount, setPostCount] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: tagOptions = [] } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tags");
      return res.data;
    },
  });

  useEffect(() => {
    const fetchUserPosts = async () => {
      const res = await axiosSecure.get(
        `/Allposts/user?email=${user?.email}`
      );
      setPostCount(res.data.length);
    };
    if (user?.email) fetchUserPosts();
  }, [user, axiosSecure]);

  useEffect(() => {
    document.title = "ThreadQube | AddPost";
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = async (data) => {
    const newPost = {
      authorName: user?.displayName,
      authorEmail: user?.email,
      authorImage: user?.photoURL,
      title: data.title,
      description: data.description,
      tag: data.tag,
      upVote: 0,
      downVote: 0,
      comments: 0,
      postTime: new Date(),
    };

    const res = await axiosSecure.post(
      "/Allposts",
      newPost
    );
    if (res.data.insertedId) {
      Swal.fire({
        icon: "success",
        title: "New Post Added Successfully!",
        timer: 1500,
        showConfirmButton: false,
      });
      reset();
      //   navigate("/myposts");
    }
  };

  if (postCount >= 5) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center p-4">
        <h2 className="text-xl font-semibold mb-4">
          You have reached the post limit for normal users.
        </h2>
        <button
          onClick={() => navigate("/membership")}
          className="btn bg-orange-500 hover:bg-orange-600 text-white"
        >
          Become a Member
        </button>
      </div>
    );
  }

  return (
    <Animation><div data-aos="fade-up" className="min-h-screen">
      <div className="w-[96%] md:max-w-xl mx-auto mt-16 mb-12 p-4 border rounded shadow bg-gray-50">
        <h2 className="text-3xl font-bold mb-8 text-black text-center">
          Add New Post
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          {/* Read-only fields */}
          <input
            className="input w-full bg-gray-200 text-gray-500"
            type="text"
            defaultValue={user?.displayName}
            readOnly
          />
          <input
            className="input w-full bg-gray-200 text-gray-500"
            type="email"
            defaultValue={user?.email}
            readOnly
          />
          <input
            className="input w-full bg-gray-200 text-gray-500"
            type="text"
            defaultValue={user?.photoURL}
            readOnly
          />

          {/* Post Title */}
          <input
            className="input w-full bg-gray-200 text-black"
            type="text"
            placeholder="Post Title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}

          {/* Description */}
          <textarea
            className="textarea w-full bg-gray-200 text-black"
            placeholder="Post Description"
            {...register("description", {
              required: "Description is required",
            })}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}

          {/* Tag dropdown */}
          <select
            {...register("tag")}
            className="select select-bordered w-full bg-gray-200 text-black"
          >
            <option value="">Select Tag</option>
            {tagOptions.map((tag) => (
              <option key={tag._id} value={tag.name}>
                {tag.name}
              </option>
            ))}
          </select>
          {errors.tag && (
            <p className="text-red-500 text-sm">{errors.tag.message}</p>
          )}

          <button
            type="submit"
            className="w-full mt-8 btn bg-gradient-to-r from-[#ef7706] to-[#fa9a1b] hover:from-[#fa9a1b] hover:to-[#ef7706] text-white"
          >
            Add Post
          </button>
        </form>
      </div>
    </div></Animation>
  );
};

export default AddPost;
