import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import Loader from "../../pages/Loader/Loader";

const PageSettings = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data = [], isLoading } = useQuery({
    queryKey: ["terms"],
    queryFn: async () => {
      const res = await axiosSecure.get("/staticPages/all");
      return res.data;
    },
  });

  if (isLoading) return <Loader></Loader>;
  console.log(data);

  return (
    <div className="p-6 space-y-8">
      {/* Legal Section */}
      <div className="bg-base-200 rounded-xl p-6 shadow">
        <h3 className="text-xl font-semibold mb-4">Legal</h3>
        <p className="text-sm text-gray-500 mb-4">
          Manage ThreadQube legal documents Terms and Privacy.
        </p>

        <ul className="space-y-2">
          {data.map((page, i) => (
            <li key={i}>
              <button
                onClick={() => navigate(`/dashboard/dashboard/editPage/${page._id}`)}
                className="text-orange-600 hover:underline hover:text-orange-800 text-[15px] text-left"
              >
                {page.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PageSettings;
