import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../pages/Loader/Loader";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegComment } from "react-icons/fa";
import Pagination from "../../shared/Pagination/Pagination";
import Lottie from "lottie-react";
import noPostLottie from "../../assets/lotties/Empty State.json"

const MyPosts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "ThreadQube | MyPosts";
    window.scrollTo(0, 0);
  }, []);

  const [page, setPage] = useState(1);
  const limit = 5;

  const {
    data = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myPosts", user?.email, page],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/Allposts/user?email=${user.email}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const myPosts = data.posts || [];
  const totalPosts = data.totalPosts || 0;
  const totalPages = data.totalPages || 1;

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
        const res = await axiosSecure.delete(`/Allposts/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Your post has been deleted.", "success");
          refetch();
        }
      } catch (error) {
        Swal.fire("Error", "Failed to delete post.", error);
      }
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto p-4 mt-10">
      

      {myPosts.length === 0 ? (
        <div className="flex flex-col items-center h-screen">
          <h1 className="text-3xl font-bold text-center mb-6">My Posts</h1>
          <div className="w-72 h-72">
            <Lottie animationData={noPostLottie} loop />
          </div>
          <p className="text-center text-gray-500 -mt-9">
          You haven’t added any posts yet.
          </p>
          <p className="text-center text-gray-500">
            To add a post, visit{" "}
            <Link
              to="/dashboard/dashboard/addPost"
              className="text-orange-500 font-semibold"
            >
              Add Post
            </Link>
          </p>
        </div>
      ) : (
        <div className="min-h-screen">
          <h1 className="text-3xl font-bold text-center mb-6">My Posts</h1>
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
                  <tr key={post._id}>
                    <td>{(page - 1) * limit + index + 1}</td>
                    <td>{post.title}</td>
                    <td>{(post.upvote || 0) + (post.downVote || 0)}</td>
                    <td>
                      <FaRegComment
                        size={25}
                        onClick={() => navigate(`/comments/${post._id}`)}
                        className="text-orange-500 ml-3 cursor-pointer"
                      />
                    </td>
                    <td>
                      <RiDeleteBin5Line
                        size={25}
                        className="text-red-500 ml-1 cursor-pointer"
                        onClick={() => handleDelete(post._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Info */}
          <div className="mt-4 text-sm text-center text-gray-600">
            Showing {(page - 1) * limit + 1} –{" "}
            {Math.min(page * limit, totalPosts)} of {totalPosts} posts
          </div>

          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </div>
      )}
    </div>
  );
};

export default MyPosts;
