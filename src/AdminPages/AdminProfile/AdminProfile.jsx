import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../pages/Loader/Loader";
import {PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer} from "recharts";
import AdminTagManager from "../AdminTagManager/AdminTagManager";
import Animation from "../../hooks/Animation";

const COLORS = ["#FF8042", "#00C49F", "#FFBB28"];

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  useEffect(()=>{
    document.title = "ThreadQube | Admin Profile"
    window.scrollTo(0,0);
  },[])

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = axiosSecure.get("/admin/stats");
      return (await res).data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loader></Loader>;

  const chartData = [
    { name: "Posts", value: stats.totalPosts || 0 },
    { name: "Comments", value: stats.totalComments || 0 },
    { name: "Users", value: stats.totalUsers || 0 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 mt-16 min-h-screen">
      <div>
        <h2 className="text-3xl font-bold mb-8 text-center">Admin Profile</h2>

      <div className="flex flex-col md:flex-row items-center gap-10 mb-10">
        <Animation><img
          data-aos="fade-up"
          src={user?.photoURL}
          alt="Admin"
          className="w-40 h-40 object-cover rounded-full border-4 border-orange-400"
        /></Animation>
        <Animation><div data-aos="fade-left" className="space-y-2 text-lg">
          <p>
            <span className="font-semibold">Name:</span> {user?.displayName}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user?.email}
          </p>
          <p>
            <span className="font-semibold">Total Posts:</span>{" "}
            {stats.totalPosts}
          </p>
          <p>
            <span className="font-semibold">Total Comments:</span>{" "}
            {stats.totalComments}
          </p>
          <p>
            <span className="font-semibold">Total Users:</span>{" "}
            {stats.totalUsers}
          </p>
        </div></Animation>
      </div>
      </div>

      <h3 className="text-3xl font-semibold mb-4 mt-24 text-center">
        Site Overview (Pie Chart)
      </h3>
      <div className="w-full h-96">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={110}
              label
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <AdminTagManager></AdminTagManager>
    </div>
  );
};

export default AdminProfile;
