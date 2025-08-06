import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MdClose, MdCheck } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/UseAxiosSecure";

const AllFeedbacks = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedFeedback, setSelectedFeedback] = useState(null);

  // Fetch all feedbacks
  const { data: feedbacks = [], isLoading } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/feedback");
      return res.data;
    },
  });

  // Delete feedback
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/feedback/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["feedbacks"]);
      Swal.fire("Deleted!", "Feedback removed successfully", "success");
    },
  });

  // Mark as responded
  const patchMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/feedback/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["feedbacks"]);
      Swal.fire("Responded!", "Marked as responded", "success");
    },
  });

  // Delete handler
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This feedback will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  // Respond handler
  const handleRespond = (id) => {
    patchMutation.mutate(id);
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading feedbacks...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-5 text-center">All Feedbacks</h2>

      {/* Responsive table */}
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Feedback</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((fb, index) => (
              <tr key={fb._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <img
                    src={fb.photo || "https://via.placeholder.com/40"}
                    alt="User"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  {fb.name}
                </td>
                <td className="px-4 py-3">{fb.category}</td>
                <td className="px-4 py-3">{fb.rating} ⭐</td>
                <td className="px-4 py-3">
                  {fb.message.length > 20
                    ? `${fb.message.slice(0, 20)}...`
                    : fb.message}
                  {fb.message.length > 20 && (
                    <button
                      className="text-orange-500 underline ml-2"
                      onClick={() => setSelectedFeedback(fb)}
                    >
                      View More
                    </button>
                  )}
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    onClick={() => handleRespond(fb._id)}
                    disabled={fb.response}
                    className={`p-2 rounded ${
                      fb.response
                        ? "bg-green-200 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                  >
                    <MdCheck size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(fb._id)}
                    className="p-2 rounded bg-red-500 hover:bg-red-600 text-white"
                  >
                    <MdClose size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedFeedback && (
        <div
          className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={() => setSelectedFeedback(null)}
        >
          <div
            className="bg-white border border-gray-200 shadow-2xl rounded-xl p-6 max-w-lg w-full mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button Top-Right */}
            <button
              onClick={() => setSelectedFeedback(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              title="Close"
            >
              <MdClose size={22} />
            </button>

            {/* Modal Content */}
            <h3 className="text-xl font-semibold mb-4">Full Feedback</h3>
            <div className="max-h-60 overflow-y-auto text-gray-700 whitespace-pre-wrap mb-5">
              {selectedFeedback.message}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllFeedbacks;
