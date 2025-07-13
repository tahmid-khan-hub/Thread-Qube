import React from "react";
import { useParams } from "react-router";
import CommentsSection from "../CommentsSection/CommentsSection";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loader from "../Loader/Loader";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

const PostDetails = () => {
  // const postData = useLoaderData();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: postData, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/Allposts/${id}`);
      return res.data;
    },
  });

  const handleUpvote = async () => {
    if (!user) return Swal.fire("Please log in to upvote");

    try {
      await axiosSecure.patch(`/Allposts/${id}/vote`, {
        voteType: "upvote",
      });
      Swal.fire("Upvoted!", "", "success");
      queryClient.invalidateQueries(["post", id]);
    } catch (err) {
      console.error(err);
      Swal.fire("Failed to upvote", "", "error");
    }
  };

  const handleDownvote = async () => {
    if (!user) return Swal.fire("Please log in to downvote");

    try {
      await axiosSecure.patch(`/Allposts/${id}/vote`, {
        voteType: "downvote",
      });
      Swal.fire("Downvoted!", "", "success");
      queryClient.invalidateQueries(["post", id]);
    } catch (err) {
      console.error(err);
      Swal.fire("Failed to downvote", "", "error");
    }
  };

  if (isLoading) return <Loader></Loader>;

  if (!postData) {
    return (
      <div className="max-w-[1400px] mx-auto min-h-screen mt-20 py-10">
        <div className="text-center text-red-600 font-semibold text-lg">
          ❌ Post not found or failed to load.
        </div>
      </div>
    );
  }

  const {
    description,
    downVote,
    upvote,
    title,
    tag,
    postTime,
    authorImage,
    authorName,
  } = postData;

  return (
    <div className="max-w-[1400px] mx-auto min-h-screen mt-20 py-10">
      <div className="border-gray-600 rounded-lg shadow-md p-6 bg-gray-50 space-y-5">
        <h1 className="text-3xl font-bold text-orange-600">{title}</h1>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <img
              src={authorImage || "https://i.ibb.co/VWP8Nd1t/image.png"}
              alt={authorName}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-orange-400"
            />
            <div>
              <p className="text-lg font-medium text-gray-800">{authorName}</p>
              {postTime && (
                <p className="text-sm text-gray-500">
                  {new Date(postTime).toLocaleString()}
                </p>
              )}
            </div>
          </div>
          <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
            #{tag}
          </span>
        </div>

        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {description}
        </p>

        <div className="flex items-center gap-6 text-sm font-medium text-gray-600 mt-4">
          <div className="flex items-center gap-1">
            <FaThumbsUp size={21} onClick={handleUpvote} />
            <span className="text-green-600 text-2xl ml-1 font-semibold">
              {upvote || 0}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <FaThumbsDown size={21} className="mt-1" onClick={handleDownvote} />
            <span className="text-red-600 text-2xl ml-1 font-semibold">
              {downVote || 0}
            </span>
          </div>
          <button
            onClick={() =>
              document
                .getElementById("comments-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-orange-600 text-lg underline hover:text-orange-800 transition"
          >
            Go to Comments
          </button>
        </div>

        {/* Right-bottom aligned share buttons */}
        <div className="flex justify-end">
          <div>
            <p className="text-sm text-gray-600 font-medium mb-2">Share:</p>
            <div className="flex items-center gap-4">
              <FacebookShareButton url={window.location.href} quote={title}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>

              <WhatsappShareButton url={window.location.href} title={title}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>

              <TwitterShareButton url={window.location.href} title={title}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </div>
          </div>
        </div>
      </div>

      <div id="comments-section">
        <CommentsSection postId={postData._id} />
      </div>
    </div>
  );
};

export default PostDetails;
