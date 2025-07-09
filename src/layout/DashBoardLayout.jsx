import React from "react";
import { NavLink, Outlet } from "react-router";
import brand from "../assets/logo.png";

const DashBoardLayout = () => {
  return (
    <div className="drawer lg:drawer-open max-w-[1500px] mx-auto">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-base-300 w-full lg:hidden">
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
            <a className=" text-xl mt-1 font-semibold text-black">ThreadQube</a>
          </div>
          </div>
        </div>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <div className="flex">
            <img className="w-8 mr-1" src={brand} alt="ThreadQube Logo" />
            <a className=" text-xl mt-1 font-semibold text-black">ThreadQube</a>
          </div>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="dashboard/allrecipe">My Profile</NavLink>
          </li>
          <li>
            <NavLink to="dashboard/addPost">Add Post</NavLink>
          </li>
          <li>
            <NavLink to="dashboard/addrecipe">My Posts</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;
