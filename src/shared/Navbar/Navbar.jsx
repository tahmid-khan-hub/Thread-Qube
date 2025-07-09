import React from "react";
import brand from "../../assets/logo.png";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const handleLogOut = () => {
    logOut()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const links = (
    <>
      <li>
        <NavLink>Home</NavLink>
      </li>
      <li>
        <NavLink>Membership</NavLink>
      </li>
    </>
  );
  return (
    <div className=" bg-orange-100 ">
      <div className="navbar max-w-[1400px] mx-auto px-3">
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
          {user?.photoURL ? (
            <img
              title={user?.displayName || "User"}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-orange-500 ring-offset-2"
              src={user?.photoURL}
              alt="Profile"
            />
          ) : (
            <img
              title={user?.displayName || "User"}
              className="w-9 h-9 rounded-full object-cover "
              src="https://i.ibb.co/VWP8Nd1t/image.png"
              alt="Profile"
            />
          )}

          {user ? (
            <a
              onClick={handleLogOut}
              className="btn border border-orange-800 bg-orange-400 hover:bg-orange-600 text-white ml-2"
            >
              <Link to="login">Log Out</Link>
            </a>
          ) : (
            <a className="btn border border-orange-800 bg-orange-400 hover:bg-orange-600 text-white ml-2">
              <Link to="login">Join Us</Link>
            </a>
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
