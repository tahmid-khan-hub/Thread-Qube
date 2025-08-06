import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loader from "../../pages/Loader/Loader";
import Pagination from "../../shared/Pagination/Pagination";

const feedbackOptions = [
  "This comment is offensive",
  "Spam or irrelevant",
  "Harassment or abuse",
];

const CommentsPage = () => {
  const { postId } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [feedbackMap, setFeedbackMap] = useState({});
  const [reportedMap, setReportedMap] = useState({});
  const [modalComment, setModalComment] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data = {}, isLoading} = useQuery({
    queryKey: ["comments", postId, page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments/${postId}?page=${page}&limit=${limit}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const comments = data.comments || [];
  const totalPages = data.totalPages || 1;
  const totalComments = data.totalComments || 0;

  useEffect(() => {
    const fetchReportedComments = async () => {
      try {
        const res = await axiosSecure.get(`/reports/${postId}`);
        const reportedIds = res.data;
        const map = {};
        reportedIds.forEach((id) => (map[id] = true));
        setReportedMap(map);
      } catch (err) {
        console.error("Failed to fetch reports:", err);
      }
    };
    fetchReportedComments();
  }, [postId, axiosSecure]);

  useEffect(() => {
    document.title = "ThreadQube | Comments";
    window.scrollTo(0, 0);
  }, []);

  const handleFeedbackChange = (commentId, value) => {
    setFeedbackMap((prev) => ({ ...prev, [commentId]: value }));
  };

  const handleReport = async (commentId) => {
    try {
      const feedback = feedbackMap[commentId];
      if (!feedback) return;

      const res = await axiosSecure.post(`/reports`, {
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

  const handleReadMore = (text) => {
    setModalComment(text);
    document.getElementById("comment_modal").showModal();
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="max-w-[1400px] mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="btn bg-gradient-to-r from-[#ef7706] to-[#fa9a1b] hover:from-[#fa9a1b] hover:to-[#ef7706] text-white mt-5 ml-2"
        >
          Back
        </button>
      </div>

      <div className="max-w-5xl mx-auto my-10 p-4 min-h-screen">
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
                    <td>{(page - 1) * limit + idx + 1}</td>
                    <td>{comment.userEmail}</td>
                    <td>
                      {comment.commentText.length > 20 ? (
                        <>
                          {comment.commentText.slice(0, 20)}...
                          <button
                            onClick={() => handleReadMore(comment.commentText)}
                            className="text-blue-500 underline ml-1"
                          >
                            Read More
                          </button>
                        </>
                      ) : (
                        comment.commentText
                      )}
                    </td>
                    <td>
                      <select
                        value={feedbackMap[comment._id] || ""}
                        onChange={(e) =>
                          handleFeedbackChange(comment._id, e.target.value)
                        }
                        className="select select-bordered select-sm w-full"
                        disabled={reportedMap[comment._id]}
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

            {/* Pagination */}
            <div className="mt-4 text-center text-sm text-gray-600">
              Showing {(page - 1) * limit + 1} –{" "}
              {Math.min(page * limit, totalComments)} of {totalComments} comments
            </div>
             <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          </div>
        )}
      </div>

      {/* Modal */}
      <dialog id="comment_modal" className="modal">
        <div className="modal-box max-w-2xl max-h-[90vh] overflow-auto">
          <h3 className="font-bold text-lg mb-4">Full Comment</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{modalComment}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn bg-orange-500 text-white">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default CommentsPage;
