import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import brand from "../assets/logo.png";
import useUserRole from "../hooks/useUserRole";
import useAuth from "../hooks/useAuth";
import Loader from "../pages/Loader/Loader";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import {
  FaUserCircle,
  FaRegNewspaper,
  FaUserShield,
  FaUsersCog,
} from "react-icons/fa";
import { MdPostAdd, MdReportProblem, MdCampaign, MdLogout, MdFeedback } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import Animation from "../hooks/Animation";

const DashBoardLayout = () => {
  const { role, roleLoading } = useUserRole();
  const { user, logOut } = useAuth(); 

  if (roleLoading) return <Loader />;

  const handleLogOut = () => {
    logOut()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="drawer lg:drawer-open max-w-[1500px] mx-auto border border-gray-50">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar for mobile */}
        <div className="navbar sticky top-0 z-50 bg-base-100 w-full lg:hidden">
          <div className="flex-none">
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

          {/* user display name & photo beside logo */}
          <div className="mx-2 flex-1 mb-1 lg:hidden">
            <div className="flex items-center">
              <img className="w-8 mr-1" src={brand} alt="ThreadQube Logo" />
              <span className="text-xl mt-1 font-semibold">ThreadQube</span>
              {user && (
                <div className="flex items-center ml-auto">
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-8 h-8 rounded-full object-cover ml-2"
                  />
                  <span className="ml-2 hidden sm:inline">
                    {user.displayName}
                  </span>
                </div>
              )}
              
            </div>
          </div>
        </div>

        {/* Page content */}
        <Outlet />
      </div>

      {/* Sidebar */}
      <Animation><div data-aos="fade-right" className="drawer-side border-r border-orange-500">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu text-base-content min-h-full w-80 p-4">
          {/* Logo */}
          <div className="flex items-center ml-2 mb-4">
            <img className="w-8 mr-1" src={brand} alt="ThreadQube Logo" />
            <span className="text-xl font-semibold">ThreadQube</span>
          </div>

          {/* user photo & name in sidebar */}
          {user && (
            <div className="hidden lg:flex flex-col items-center gap-2 p-2 rounded-lg mb-4 mt-5">
              <img
                src={user.photoURL}
                alt="User"
                className="w-24 h-24 rounded-full object-cover border"
              />
              <span className="font-semibold text-xl mt-2">{user.displayName}</span>
              <span className="font-medium text-gray-500 ">{user.email}</span>
            </div>
          )}

          {/* Links */}
          {role === "admin" ? (
            <>
              <NavLink className="font-semibold mb-3" to="/">
                <li>
                  <a>
                    <AiFillHome className="inline-block mr-2" />
                    Home
                  </a>
                </li>
              </NavLink>
              <NavLink className="font-semibold mb-3" to="dashboard/adminProfile">
                <li>
                  <a>
                    <FaUserShield className="inline-block mr-2" />
                    Admin Profile
                  </a>
                </li>
              </NavLink>
              <NavLink className="font-semibold mb-3" to="dashboard/manageUsers">
                <li>
                  <a>
                    <FaUsersCog className="inline-block mr-2" />
                    Manage Users
                  </a>
                </li>
              </NavLink>
              <NavLink className="font-semibold mb-3" to="dashboard/reportedActivities">
                <li>
                  <a>
                    <MdReportProblem className="inline-block mr-2" />
                    Reported Activities
                  </a>
                </li>
              </NavLink>
              <NavLink className="font-semibold mb-3" to="dashboard/announcements">
                <li>
                  <a>
                    <MdCampaign className="inline-block mr-2" />
                    Announcement
                  </a>
                </li>
              </NavLink>
              <NavLink className="font-semibold mb-3" to="dashboard/allFeedbacks">
                <li>
                  <a>
                    <MdFeedback className="inline-block mr-2" />
                    All Feedback
                  </a>
                </li>
              </NavLink>
              <Link className="font-semibold" onClick={handleLogOut}>
                <li>
                  <a>
                    <MdLogout className="inline-block mr-2" />
                    Log Out
                  </a>
                </li>
              </Link>
            </>
          ) : (
            <>
              <NavLink className="font-semibold mb-3" to="/">
                <li>
                  <a>
                    <AiFillHome className="inline-block mr-2" />
                    Home
                  </a>
                </li>
              </NavLink>
              <NavLink className="font-semibold mb-3" to="/dashboard/dashboardHome">
                <li>
                  <a>
                    <AiOutlineHome className="inline-block mr-2" />
                    Dashboard Home
                  </a>
                </li>
              </NavLink>
              <NavLink className="font-semibold mb-3" to="dashboard/myProfile">
                <li>
                  <a>
                    <FaUserCircle className="inline-block mr-2" />
                    My Profile
                  </a>
                </li>
              </NavLink>
              <NavLink className="font-semibold mb-3" to="dashboard/addPost">
                <li>
                  <a>
                    <MdPostAdd className="inline-block mr-2" />
                    Add Post
                  </a>
                </li>
              </NavLink>
              <NavLink className="font-semibold mb-3" to="dashboard/myPosts">
                <li>
                  <a>
                    <FaRegNewspaper className="inline-block mr-2 " />
                    My Posts
                  </a>
                </li>
              </NavLink>
              <NavLink className="font-semibold mb-3" to="dashboard/feedback">
                <li>
                  <a>
                    <MdFeedback className="inline-block mr-2 mt-0.5" />
                    Feedback
                  </a>
                </li>
              </NavLink>
              <NavLink className="font-semibold mb-3" to="dashboard/userSettings">
                <li>
                  <a>
                    <IoIosSettings className="inline-block mr-2 mt-0.5" />
                    Settings
                  </a>
                </li>
              </NavLink>
              <Link className="font-semibold" onClick={handleLogOut}>
                <li>
                  <a>
                    <MdLogout className="inline-block mr-2 mt-0.5" />
                    Log Out
                  </a>
                </li>
              </Link>
            </>
          )}
        </ul>
      </div></Animation>
    </div>
  );
};

export default DashBoardLayout;
