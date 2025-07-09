import React from "react";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../pages/Loader/Loader";
import Swal from "sweetalert2";

const MyPosts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: myPosts = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myPosts", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `http://localhost:3000/Allposts/user?email=${user?.email}`
      );
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to recover this post!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(
          `http://localhost:3000/Allposts/${id}`
        );
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Your post has been deleted.", "success");
          refetch();
        }
      } catch (error) {
        Swal.fire("Error", "Failed to delete post.", error);
      }
    }
  };

  if (isLoading) <Loader></Loader>;

  return (
    <div className="max-w-7xl mx-auto p-4 mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">My Posts</h1>

      {myPosts.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t added any posts yet.
        </p>
      ) : (
        <div className="min-h-screen">
          <div className="overflow-x-auto">
            <table className="table w-full border rounded-lg shadow">
              <thead className="bg-orange-100 text-orange-800">
                <tr>
                  <th>#</th>
                  <th>Post Title</th>
                  <th>Votes</th>
                  <th>Comment</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {myPosts.map((post, index) => (
                  <tr key={post._id} className="">
                    <td>{index + 1}</td>
                    <td>{post.title}</td>
                    <td>{(post.upVote || 0) + (post.downVote || 0)}</td>
                    <td>
                      <button className="btn btn-sm border border-orange-800 bg-orange-400 hover:bg-orange-600 text-white">
                        Comment
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPosts;
