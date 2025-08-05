import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../pages/Loader/Loader";
import Pagination from "../../shared/Pagination/Pagination";
import { RiDeleteBin5Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import Lottie from "lottie-react";
import noReportLottie from "../../assets/lotties/Data Extraction.json"

const Reports = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 10;
  useEffect(()=>{
    document.title = "ThreadQube | Reported Activities"
    window.scrollTo(0,0);
  },[])

  const {
    data = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["adminReports", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reports?page=${page}&limit=${limit}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const reports = data.reports || [];
  const totalReports = data.totalReports || 0;
  const totalPages = data.totalPages || 1;

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

      {reports.length === 0 ? (
        <div className="flex flex-col items-center h-screen">
          <h2 className="text-3xl font-bold text-center mb-8">Reported Comments</h2>
          <div className="w-72 h-72">
            <Lottie animationData={noReportLottie} loop />
          </div>
          <p className="text-center text-gray-500 ">
          No Issues to Address at the Moment.
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Reported Comments</h2>
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
                    <td>{(page - 1) * limit + index + 1}</td>
                    <td>{report.commentText.length > 7 ? report.commentText.slice(0, 7) + "...." : report.commentText}</td>
                    <td>{report.userEmail}</td>
                    <td>{report.feedback}</td>
                    <td>{new Date(report.reportedAt).toLocaleString()}</td>
                    <td className="flex gap-2 ">
                      <RiDeleteBin5Line size={25} className="text-red-500 ml-1" onClick={() => handleDeleteComment(report.commentId)}></RiDeleteBin5Line>
                      
                      <RxCross2 size={25} onClick={() => handleDismissReport(report._id)} className="ml-3"></RxCross2>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination info and controls */}
          <div className="mt-4 text-sm text-center text-gray-600">
            Showing {(page - 1) * limit + 1} –{" "}
            {Math.min(page * limit, totalReports)} of {totalReports} reports
          </div>

          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </>
      )}
    </div>
  );
};

export default Reports;
