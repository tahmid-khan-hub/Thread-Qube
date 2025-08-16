import React, { useEffect } from "react";
import {
  FaThumbsUp,
  FaRegComments,
  FaClipboardList,
  FaCalendarAlt,
} from "react-icons/fa";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Loader from "../Loader/Loader";
import Animation from "../../hooks/Animation"
import UserDataChart from "./UserDataChart";
import StatCard from "../../hooks/StatCard";

const UserDashboardHome = () => {
  useEffect(()=>{
    document.title = "ThreadQube | DashBoard"
    window.scrollTo(0,0)
  },[])
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["dashboardStats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/dashboard-stats?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loader></Loader>

  return (
    <div className="mx-auto mt-10 px-4 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl mt-12 font-bold">
          Welcome back, {user?.displayName}!
        </h1>
        <p className="text-orange-600 mt-2 text-lg capitalize">
          {stats.badge} Member
        </p>
      </div>

      <Animation><div data-aos="fade-up" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {/* user total posts */}
        <StatCard
        icon={FaClipboardList}
        value={stats.totalPosts || 0}
        label="Total Posts"
        gradientFrom="#ef7706"
        gradientTo="#ffc66e"
        ></StatCard>

        {/* user total likes */}
        <StatCard
        icon={FaThumbsUp}
        value={stats.totalLikes || 0}
        label="Total Likes"
        gradientFrom="#ef7706"
        gradientTo="#ffc66e"
        ></StatCard>
        
        {/* user total comments */}
        <StatCard
        icon={FaRegComments}
        value={stats.totalComments || 0}
        label="Comments Made"
        gradientFrom="#ef7706"
        gradientTo="#ffc66e"
        ></StatCard>
        
        {/* user joined date */}
        <StatCard
        icon={FaCalendarAlt}
        value={
        stats.memberSince
          ? new Date(stats.memberSince).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "2-digit",
            })
          : "--"
      }
        label="Member Since"
        gradientFrom="#ef7706"
        gradientTo="#ffc66e"
        ></StatCard>
      </div></Animation>

      {/* data chart */}
      <UserDataChart stats={stats}></UserDataChart>

      <p className="text-center text-gray-500 mt-12 mb-2 text-lg">
        Want to manage your content or update your personal information? Use
        the options below to view your profile or explore your posts.
      </p>

      <div className="mt-3 mb-7 flex justify-center gap-6">
        <Link to="/dashboard/dashboard/myProfile">
          <a className="btn bg-gradient-to-r from-[#ef7706] to-[#fa9a1b] hover:from-[#fa9a1b] hover:to-[#ef7706] text-white">
            My Profile
          </a>
        </Link>
        <Link to="/dashboard/dashboard/myPosts">
          <a className="btn bg-gradient-to-r from-[#ef7706] to-[#fa9a1b] hover:from-[#fa9a1b] hover:to-[#ef7706] text-white ">
            My Posts
          </a>
        </Link>
      </div>
    </div>
  );
};

export default UserDashboardHome;
