import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Pagination from "../../shared/Pagination/Pagination";
import Loader from "../../pages/Loader/Loader";
import { RiAdminFill, RiMedalFill } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 10;
  useEffect(()=>{
    document.title = "ThreadQube | Manage Users"
    window.scrollTo(0,0);
  },[])

  const {
    data = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/all/?page=${page}&limit=${limit}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const users = data.users || [];
  const totalUsers = data.totalUsers || 0;
  const totalPages = data.totalPages || 1;

  const handleMakeAdmin = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Make this user an admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#15803D",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/users/admin/${id}`);
        if (res.data.modifiedCount > 0) {
          Swal.fire("Success!", "User is now an admin.", "success");
          refetch(); // re-fetch current page
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Failed to update role.", "error");
      }
    }
  };

  if (isLoading) return <Loader></Loader>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6 mt-12">Manage Users</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra max-w-6xl mx-auto">
          <thead className="bg-orange-100 text-black">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Make Admin</th>
              <th>Subscription</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr key={u._id}>
                <td>{(page - 1) * limit + index + 1}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  {u.role === "admin" ? (
                    <RiAdminFill size={21} className="text-green-600 ml-7.5"/>
                  ) : (
                    <FaUserPlus onClick={() => handleMakeAdmin(u._id)} size={22} className="text-orange-500 hover:text-orange-600 ml-8"/>
                  )}
                </td>
                {u.role !== "admin" &&
                  <td>
                    {u.badge === "gold" ? (
                      <RiMedalFill size={21} className="text-amber-400 ml-8"/>
                    ) : (
                      <RiMedalFill size={21} className="text-[#CD7F32] ml-8"/>
                    )}
                  </td>
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Showing X–Y of Z users */}
      <div className="mt-4 text-sm text-center text-gray-600">
        Showing {(page - 1) * limit + 1} –{" "}
        {Math.min(page * limit, totalUsers)} of {totalUsers} users
      </div>

      {/* Pagination Component */}
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};

export default ManageUsers;
