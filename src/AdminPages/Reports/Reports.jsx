import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import Loader from "../../pages/Loader/Loader";

const Reports = () => {
  const axiosSecure = useAxiosSecure();

  const { data: reports = [], isLoading, refetch } = useQuery({
    queryKey: ["adminReports"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reports");
      return res.data;
    },
  });

  const handleDeleteComment = async (commentId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the comment.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/comments/${commentId}`);
      await axiosSecure.delete(`/reports/byComment/${commentId}`);
      Swal.fire("Deleted", "Comment has been removed.", "success");
      refetch();
    }
  };

  const handleDismissReport = async (reportId) => {
    await axiosSecure.delete(`/reports/${reportId}`);
    Swal.fire("Dismissed", "Report has been removed.", "info");
    refetch();
  };

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen my-12">
      <h2 className="text-3xl font-bold text-center mb-8">Reported Comments</h2>

      {reports.length === 0 ? (
        <p className="text-center text-gray-500">No reports found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border rounded shadow">
            <thead className="bg-orange-100 text-orange-800">
              <tr>
                <th>#</th>
                <th>Comment</th>
                <th>User Email</th>
                <th>Feedback</th>
                <th>Reported At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={report._id}>
                  <td>{index + 1}</td>
                  <td>{report.commentText || "N/A"}</td>
                  <td>{report.userEmail}</td>
                  <td>{report.feedback}</td>
                  <td>{new Date(report.reportedAt).toLocaleString()}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleDeleteComment(report.commentId)}
                      className="btn btn-xs bg-red-600 text-white"
                    >
                      Delete Comment
                    </button>
                    <button
                      onClick={() => handleDismissReport(report._id)}
                      className="btn btn-xs bg-gray-500 text-white"
                    >
                      Dismiss
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

export default Reports;
