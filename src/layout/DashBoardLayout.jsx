import React from "react";
import { NavLink, Outlet } from "react-router";
import brand from "../assets/logo.png";
import useUserRole from "../hooks/useUserRole";
import Loader from "../pages/Loader/Loader";
import { AiFillHome } from "react-icons/ai";
import {
  FaUserCircle,
  FaRegNewspaper,
  FaUserShield,
  FaUsersCog,
} from "react-icons/fa";
import { MdPostAdd, MdReportProblem, MdCampaign } from "react-icons/md";

const DashBoardLayout = () => {
  const { role, roleLoading } = useUserRole();
  if (roleLoading) return <Loader></Loader>;
  return (
    <div className="drawer lg:drawer-open max-w-[1500px] mx-auto">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar sticky top-0 z-50 bg-base-100 w-full lg:hidden">
          <div className="flex-none ">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 mb-1 lg:hidden">
            <div className="flex">
              <img className="w-8 mr-1" src={brand} alt="ThreadQube Logo" />
              <a className=" text-xl mt-1 font-semibold ">ThreadQube</a>
            </div>
          </div>
        </div>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>
      <div className="drawer-side border-r border-orange-500">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          {/* logo */}
          <div className="flex ml-2 mb-4">
            <img className="w-8 mr-1" src={brand} alt="ThreadQube Logo" />
            <a className=" text-xl mt-1 font-semibold">ThreadQube</a>
          </div>

          {role === "admin" ? (
            <>
              {/* Admin links */}
              <li>
                <NavLink to="/">
                  <AiFillHome className="inline-block mr-2" />
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="dashboard/adminProfile">
                  <FaUserShield className="inline-block mr-2" />
                  Admin Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="dashboard/manageUsers">
                  <FaUsersCog className="inline-block mr-2" />
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="dashboard/reportedActivities">
                  <MdReportProblem className="inline-block mr-2" />
                  Reported Activities
                </NavLink>
              </li>
              <li>
                <NavLink to="dashboard/announcement">
                  <MdCampaign className="inline-block mr-2" />
                  Announcement
                </NavLink>
              </li>
            </>
          ) : (
            <>
              {/* User links */}
              <li>
                <NavLink to="/">
                  <AiFillHome className="inline-block mr-2" />
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="dashboard/myProfile">
                  <FaUserCircle className="inline-block mr-2" />
                  My Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="dashboard/addPost">
                  <MdPostAdd className="inline-block mr-2" />
                  Add Post
                </NavLink>
              </li>
              <li>
                <NavLink to="dashboard/myPosts">
                  <FaRegNewspaper className="inline-block mr-2" />
                  My Posts
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;
