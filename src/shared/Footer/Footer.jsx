import React from "react";
import brand from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-orange-100 text-black py-10 mt-10">
      <div className="max-w-[1400px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        
        {/* Brand Logo + Name */}
        <div className="flex items-center space-x-2 mb-6 md:mb-0">
          <img src={brand} alt="ThreadQube Logo" className="w-8 h-8 object-contain" />
          <span className="text-xl font-semibold text-black">ThreadQube</span>
        </div>

        {/* Navigation Links */}
        <nav className="mb-6 md:-mb-11 ml-0 md:-ml-11">
          <ul className="flex space-x-6 text-sm">
            <li>
              <a href="/about" className=" ">
                About
              </a>
            </li>
            <li>
              <a href="/faq" className=" ">
                FAQ
              </a>
            </li>
            <li>
              <a href="/privacy" className=" ">
                Privacy
              </a>
            </li>
            <li>
              <a href="/terms" className=" ">
                Terms
              </a>
            </li>
          </ul>
        </nav>

        {/* Social Media Icons */}
        <div className="flex space-x-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-blue-500 transition"
          >
            <svg
              fill="currentColor"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2c0-2 1-3 3-3h2v3h-2c-.5 0-1 .5-1 1v2h3l-.5 3h-2.5v7A10 10 0 0 0 22 12z" />
            </svg>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-sky-400 transition"
          >
            <svg
              fill="currentColor"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M23 3a10.9 10.9 0 0 1-3 1 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-blue-600 transition"
          >
            <svg
              fill="currentColor"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-6">
        &copy; {new Date().getFullYear()} ThreadQube. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
