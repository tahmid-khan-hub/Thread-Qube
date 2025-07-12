import React, { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loader from "../../pages/Loader/Loader";

const feedbackOptions = [
  "This comment is offensive",
  "Spam or irrelevant",
  "Harassment or abuse",
];

const CommentsPage = () => {
  const {postId} = useParams();
  const axiosSecure = useAxiosSecure();

  const [feedbackMap, setFeedbackMap] = useState({});
  const [reportedMap, setReportedMap] = useState({});

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `http://localhost:3000/comments/${postId}`
      );
      return res.data;
    },
  });

  const handleFeedbackChange = (commentId, value) => {
    setFeedbackMap((prev) => ({ ...prev, [commentId]: value }));
  };

  const handleReport = async (commentId) => {
    try {
      const feedback = feedbackMap[commentId];
      if (!feedback) return;

      const res = await axiosSecure.post(`http://localhost:3000/reports`, {
        postId,
        commentId,
        feedback,
      });

      if (res.data?.insertedId) {
        Swal.fire("Reported", "Comment reported successfully", "success");
        setReportedMap((prev) => ({ ...prev, [commentId]: true }));
      }
    } catch (error) {
      Swal.fire("Error", "Failed to report comment", error);
    }
  };

  if (isLoading) return <Loader></Loader>;
  return (
    <div className="max-w-5xl mx-auto mt-10 p-4 min-h-screen">
      <h2 className="text-3xl font-bold mb-11 text-center">
        Comments on This Post
      </h2>

      {comments.length === 0 ? (
        <p className="text-center text-gray-500">No comments yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border rounded shadow">
            <thead className="bg-orange-100 text-orange-800">
              <tr>
                <th>#</th>
                <th>Commenter Email</th>
                <th>Comment</th>
                <th>Feedback</th>
                <th>Report</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment, idx) => (
                <tr key={comment._id}>
                  <td>{idx + 1}</td>
                  <td>{comment.userEmail}</td>
                  <td>{comment.commentText}</td>
                  <td>
                    <select
                      value={feedbackMap[comment._id] || ""}
                      onChange={(e) =>
                        handleFeedbackChange(comment._id, e.target.value)
                      }
                      className="select select-bordered select-sm w-full"
                    >
                      <option value="">Select Feedback</option>
                      {feedbackOptions.map((fb, index) => (
                        <option key={index} value={fb}>
                          {fb}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm bg-red-500 text-white disabled:opacity-50"
                      disabled={
                        !feedbackMap[comment._id] || reportedMap[comment._id]
                      }
                      onClick={() => handleReport(comment._id)}
                    >
                      {reportedMap[comment._id] ? "Reported" : "Report"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CommentsPage;
