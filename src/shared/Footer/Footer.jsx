import React from "react";
import brand from "../../assets/logo.png";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-orange-100 text-black">
      <div className="max-w-[1400px] mx-auto px-4 py-6 md:flex md:items-center md:justify-between">
        
        {/* Left: Logo */}
        <div className="flex items-center mb-4 md:mb-0">
          <img src={brand} alt="ThreadQube Logo" className="w-8 h-8 mr-2" />
          <span className="text-black text-xl font-semibold">ThreadQube</span>
        </div>

        {/* Center: Links */}
        <ul className="flex flex-wrap items-center mb-4 md:mb-0 text-sm font-medium text-black mr-5">
          <Link to="/about"><li><a className="mr-6 hover:underline">About</a></li></Link>
          <li><a href="/privacy" className="mr-6 hover:underline">Privacy Policy</a></li>
          <li><a href="/terms" className="mr-6 hover:underline">Terms</a></li>
          <li><a href="/contact" className="hover:underline">Contact</a></li>
        </ul>

        {/* Right: Social Icons */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" className="hover:text-blue-500">
            <svg fill="currentColor" className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2c0-2 1-3 3-3h2v3h-2c-.5 0-1 .5-1 1v2h3l-.5 3h-2.5v7A10 10 0 0 0 22 12z" />
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" className="hover:text-sky-400">
            <svg fill="currentColor" className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 0 1-3 1 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" className="hover:text-blue-600">
            <svg fill="currentColor" className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom copyright */}
      <hr className="border-gray-700 mx-4 " />
      <div className="text-center py-4 text-xs ml-0 md:ml-7 text-gray-500">
        &copy; {new Date().getFullYear()} ThreadQube™. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
