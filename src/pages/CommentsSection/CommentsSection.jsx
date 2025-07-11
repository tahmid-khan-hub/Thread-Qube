import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loader from "../Loader/Loader";

const CommentsSection = ({ postId }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [newComment, setNewComment] = useState("");

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `http://localhost:3000/comments?postId=${postId}`
      );
      return res.data;
    },
    enabled: !!postId,
  });

  const addCommentMutation = useMutation({
    mutationFn: async (commentData) => {
      const res = await axiosSecure.post(
        `http://localhost:3000/comments`,
        commentData
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", postId]);
      Swal.fire({
        icon: "success",
        title: "Comment added successfully!",
        timer: 1500,
        showConfirmButton: false,
        position: "top-end",
      });
      setNewComment("");
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Failed to add comment",
        timer: 1500,
        showConfirmButton: false,
        position: "top-end",
      });
    },
  });

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    const commentData = {
      postId,
      userEmail: user.email,
      userName: user.displayName,
      userImage: user.photoURL,
      commentText: newComment.trim(),
      createdAt: new Date(),
    };

    addCommentMutation.mutate(commentData);
  };

  if (isLoading) return <Loader></Loader>;

  return (
    <div className="mt-10 max-w-3xl mx-auto">
      <h3 className="text-2xl font-semibold mb-4">
        Comments ({comments.length})
      </h3>

      <div className="space-y-4 mb-6">
        {comments.length === 0 && <p>No comments yet. Be the first!</p>}
        {comments.map((c, idx) => (
          <div key={idx} className="flex items-start space-x-4 border-b pb-3">
            <img
              src={c.userImage || "https://i.ibb.co/VWP8Nd1t/image.png"}
              alt={c.userName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">{c.userName}</p>
              <p className="text-gray-700 whitespace-pre-wrap">
                {c.commentText}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(c.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {user ? (
        <form
          onSubmit={handleCommentSubmit}
          className="flex flex-col space-y-2"
        >
          <textarea
            className="textarea textarea-bordered w-full"
            rows={3}
            placeholder="Write your comment here..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={addCommentMutation.isLoading}
            required
          />
          <button
            type="submit"
            className={`btn btn-primary self-end ${
              addCommentMutation.isLoading ? "opacity-50" : ""
            }`}
            disabled={addCommentMutation.isLoading}
          >
            {addCommentMutation.isLoading ? "Posting..." : "Comment"}
          </button>
        </form>
      ) : (
        <p className="text-center text-gray-500 italic">
          Please log in to post a comment.
        </p>
      )}
    </div>
  );
};

export default CommentsSection;
