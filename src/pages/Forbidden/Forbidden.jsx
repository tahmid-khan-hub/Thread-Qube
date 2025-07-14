
import React from "react";
import { Link } from "react-router";
import { FaLock } from "react-icons/fa";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <FaLock className="text-red-500 text-6xl mb-4" />
      <h1 className="text-4xl font-bold mb-2">403 - Forbidden</h1>
      <p className="text-gray-600 mb-6">
        You don't have permission to access this page.
      </p>
      <Link to="/" className="btn bg-orange-500">
        Go Back Home
      </Link>
    </div>
  );
};

export default Forbidden;
