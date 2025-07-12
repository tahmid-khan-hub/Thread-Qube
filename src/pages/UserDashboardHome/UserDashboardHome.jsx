import React, { useEffect, useState } from "react";
import { FaThumbsUp, FaRegComments, FaClipboardList, FaCalendarAlt } from "react-icons/fa";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import useAuth from "../../hooks/useAuth";

const UserDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [stats, setStats] = useState({});

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`http://localhost:3000/dashboard-stats?email=${user.email}`)
        .then((res) => setStats(res.data));
    }
  }, [axiosSecure, user]);

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl mt-12 font-bold">Welcome back, {user?.displayName}!</h1>
        <p className="text-orange-600 mt-2 text-lg capitalize">{stats.badge} Member</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-orange-100 rounded-lg p-6 text-center shadow">
          <FaClipboardList className="text-3xl mx-auto text-orange-500" />
          <h2 className="text-xl font-bold mt-2">{stats.totalPosts || 0}</h2>
          <p>Total Posts</p>
        </div>
        <div className="bg-orange-100 rounded-lg p-6 text-center shadow">
          <FaThumbsUp className="text-3xl mx-auto text-orange-500" />
          <h2 className="text-xl font-bold mt-2">{stats.totalLikes || 0}</h2>
          <p>Total Likes</p>
        </div>
        <div className="bg-orange-100 rounded-lg p-6 text-center shadow">
          <FaRegComments className="text-3xl mx-auto text-orange-500" />
          <h2 className="text-xl font-bold mt-2">{stats.comments || 0}</h2>
          <p>Comments Made</p>
        </div>
        <div className="bg-orange-100 rounded-lg p-6 text-center shadow">
          <FaCalendarAlt className="text-3xl mx-auto text-orange-500" />
          <h2 className="text-xl font-bold mt-2">
            {stats.memberSince ? new Date(stats.memberSince).toLocaleDateString() : "--"}
          </h2>
          <p>Member Since</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHome;
