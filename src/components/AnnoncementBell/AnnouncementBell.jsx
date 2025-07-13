import React from "react";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../pages/Loader/Loader";
import { FaBell } from "react-icons/fa";

const AnnouncementBell = () => {
  const axiosSecure = useAxiosSecure();

  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcements");
      return res.data;
    },
  });

  return (
    <div className="relative cursor-pointer">
      <FaBell className="text-2xl text-gray-600 mr-5" />
      {!isLoading && announcements.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mr-5">
          {announcements.length}
        </span>
      )}
    </div>
  );
};

export default AnnouncementBell;
