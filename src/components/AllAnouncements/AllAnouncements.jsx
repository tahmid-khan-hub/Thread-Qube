import React from "react";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import Loader from "../../pages/Loader/Loader";
import { useQuery } from "@tanstack/react-query";

const AllAnouncements = () => {
  const axiosSecure = useAxiosSecure();

  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosSecure.get("http://localhost:3000/announcements");
      return res.data;
    },
  });
  if (isLoading) return <Loader></Loader>;

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8 mt-12">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Announcements
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {announcements.map((announcement) => (
          <div
            key={announcement._id}
            className="bg-white shadow-md border border-gray-200 rounded-xl p-6 hover:shadow-lg transition"
          >
            <p className="text-sm text-gray-500 mb-2">
              {announcement.createdAt
                ? new Date(announcement.createdAt).toLocaleDateString()
                : "Date not available"}
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {announcement.title || "Untitled"}
            </h3>
            <p className="text-gray-700">
              {announcement.description || "No details provided."}
            </p>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default AllAnouncements;
