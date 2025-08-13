import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../pages/Loader/Loader";
import {PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer} from "recharts";
import AdminTagManager from "../AdminTagManager/AdminTagManager";
import Animation from "../../hooks/Animation";
import StatCard from "../../hooks/StatCard";
import { FaClipboardList } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import MostUsedTag from "../MostUsedTag/MostUsedTag";

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
    <div className="px-4 mt-16 min-h-screen">
      <h2 className="text-3xl font-bold text-center">Dashboard</h2>

      {/* stats card */}
      <Animation><div data-aos="fade-up" className="grid grid-cols-2 md:grid-cols-3 gap-5 max-w-3xl mx-auto mt-12">
        <StatCard
        icon={FaClipboardList}
        value={stats.totalPosts || 0}
        label="Total Posts"
        gradientFrom="#ef7706"
        gradientTo="#ffc66e"
        ></StatCard>

        <StatCard
        icon={FaComments}
        value={stats.totalComments || 0}
        label="Total Comments"
        gradientFrom="#ef7706"
        gradientTo="#ffc66e"
        ></StatCard>

        <StatCard
        icon={FaUsers}
        value={stats.totalUsers || 0}
        label="Total Users"
        gradientFrom="#ef7706"
        gradientTo="#ffc66e"
        ></StatCard>
      </div></Animation>

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

      <h3 className="text-3xl font-semibold mb-4 mt-24 text-center">
        Most Used Tag (Bar Chart)
      </h3>
      <div>
        <MostUsedTag></MostUsedTag>
      </div>

      <AdminTagManager></AdminTagManager>
    </div>
  );
};

export default AdminProfile;
