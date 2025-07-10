import React from "react";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["AllUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("http://localhost:3000/users/all");
      return res.data;
    },
  });

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
        const res = await axiosSecure.patch(`http://localhost:3000/users/admin/${id}`);
        if (res.data.modifiedCount > 0) {
          Swal.fire("Success!", "User is now an admin.", "success");
          refetch();
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Failed to update role.", err);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
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
                <td>{index + 1}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  {u.role === "admin" ? (
                    <span className="btn btn-sm bg-green-600 text-white font-bold">Admin</span>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(u._id)}
                      className="btn btn-sm bg-orange-500 text-white hover:bg-orange-600"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
                <td>
                  {u.badge === "gold" ? (
                    <span className="btn btn-sm bg-amber-400 badge-success">Member</span>
                  ) : (
                    <span className="btn btn-sm bg-[#CD7F32] text-white badge-warning">Not a Member</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
