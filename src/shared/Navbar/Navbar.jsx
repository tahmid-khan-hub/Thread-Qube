import React from "react";
import brand from "../../assets/logo.png";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import AnnouncementBell from "../../components/AnnoncementBell/AnnouncementBell";
import './Navbar.css'
import useUserRole from "../../hooks/useUserRole";
import Loader from "../../pages/Loader/Loader";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { role, roleLoading } = useUserRole();
  if (roleLoading) return <Loader></Loader>;
  const handleLogOut = () => {
    logOut()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const links = (
    <>
      <NavLink to="/" className="font-semibold">
        <li><a>Home</a></li>
      </NavLink>
      <NavLink to="/dashboard" className="font-semibold">
        <li><a>Dashboard</a></li>
      </NavLink>
      {( user && role === "user") && <NavLink to="membership" className="font-semibold">
        <li><a>Membership</a></li>
      </NavLink>}
      <NavLink to="about" className="font-semibold">
        <li><a>About</a></li>
      </NavLink>
      <NavLink to="faq" className="font-semibold">
        <li><a>FaQ</a></li>
      </NavLink>
    </>
  );
  return (
    <div className=" bg-orange-100 sticky top-0 z-50">
      <div className="navbar max-w-[1400px] mx-auto px-3 ">
        {/* Left - Brand */}
        <div className="navbar-start">
          <img className="w-8 mr-2" src={brand} alt="ThreadQube Logo" />
          <a className=" text-xl font-semibold text-black">ThreadQube</a>
        </div>

        {/* Center - Links for large screen */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-black">{links}</ul>
        </div>

        {/* Right - Login and Dropdown for small screen */}
        <div className="navbar-end">
          <AnnouncementBell></AnnouncementBell>
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-9 h-9 rounded-full ring-2 ring-orange-500 ring-offset-2">
                  <img
                    src={
                      user?.photoURL || "https://i.ibb.co/VWP8Nd1t/image.png"
                    }
                    alt="Profile"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 px-4 mx-auto shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <div className="mx-auto">
                    <img src={user.photoURL} className="w-16 rounded-full ring-2 ring-orange-500 ring-offset-2 my-2" alt="user profile" />
                  </div>
                </li>
                <li className="text-center text-lg px-2 py-1 font-semibold text-orange-500 cursor-default">
                  {user?.displayName}
                </li>
                {
                  role === "admin" ? <li className="text-center mb-2 font-semibold">
                    Role: Admin
                  </li>: <li>

                  </li>
                }
                <li className="text-center text-gray-600">
                  {user.email}
                </li>
                <li>
                  <button onClick={handleLogOut} className=" btn bg-gradient-to-r from-[#ef7706] to-[#fa9a1b] hover:from-[#fa9a1b] hover:to-[#ef7706] text-white mt-5 text-[15px] mb-2">
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn bg-gradient-to-r from-[#ef7706] to-[#fa9a1b] hover:from-[#fa9a1b] hover:to-[#ef7706] text-white ml-2"
            >
              Join Us
            </Link>
          )}

          {/* Mobile menu */}
          <div className="dropdown dropdown-end lg:hidden ml-2">
            <div tabIndex={0} role="button" className="mx-2 text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black"
            >
              {links}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
