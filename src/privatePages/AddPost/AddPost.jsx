import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

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

  const tagOptions = [
    { value: "education", label: "Education" },
    { value: "travel", label: "Travel" },
    { value: "tech", label: "Technology" },
    { value: "persondev", label: "Personal-development" },
    { value: "book", label: "Books" },
    { value: "game", label: "Gaming" },
    { value: "music", label: "Music" },
    { value: "career", label: "Career" },
    { value: "health", label: "Health" },
    { value: "sports", label: "Sports" },
  ];

  useEffect(() => {
    const fetchUserPosts = async () => {
      const res = await axiosSecure.get(`http://localhost:3000/Allposts/user?email=${user?.email}`);
      setPostCount(res.data.length);
    };
    if (user?.email) fetchUserPosts();
  }, [user, axiosSecure]);

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
      createdAt: new Date(),
    };

    const res = await axiosSecure.post("http://localhost:3000/Allposts", newPost);
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
    <div className="min-h-screen">
      <div className="w-[96%] md:max-w-xl mx-auto mt-16 mb-12 p-4 border rounded shadow bg-gray-50">
        <h2 className="text-3xl font-bold mb-4 text-center">Add New Post</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          {/* Read-only fields */}
          <input
            className="input w-full bg-gray-200"
            type="text"
            defaultValue={user?.displayName}
            readOnly
          />
          <input
            className="input w-full bg-gray-200"
            type="email"
            defaultValue={user?.email}
            readOnly
          />
          <input
            className="input w-full bg-gray-200"
            type="text"
            defaultValue={user?.photoURL}
            readOnly
          />

          {/* Post Title */}
          <input
            className="input w-full"
            type="text"
            placeholder="Post Title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}

          {/* Description */}
          <textarea
            className="textarea w-full"
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
            {...register("tag", { required: "Please select a tag" })}
            className="select select-bordered w-full"
            defaultValue=""
          >
            <option value="" disabled>
              Select a Tag
            </option>
            {tagOptions.map((tag) => (
              <option className="" key={tag.value} value={tag.value}>
                {tag.label}
              </option>
            ))}
          </select>
          {errors.tag && (
            <p className="text-red-500 text-sm">{errors.tag.message}</p>
          )}

          <button type="submit" className="w-full mt-8 btn border border-orange-800 bg-orange-400 hover:bg-orange-600 text-white">
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
