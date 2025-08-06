import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaBell } from "react-icons/fa";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import useAuth from "../../hooks/useAuth";


const AnnouncementBell = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch announcements
  const { data: announcements = [], isLoading: loadingAnnouncements } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcements");
      return res.data;
    },
  });

  // Fetch feedback
  const { data: feedbacks = [], isLoading: loadingFeedbacks } = useQuery({
    queryKey: ["feedbacks", user?.uid],
    enabled: !!user?.uid, // Only fetch if user.uid exists
    queryFn: async () => {
      const res = await axiosSecure.get("/feedback");
      return res.data;
    },
  });

  // Combine and filter feedback + announcements
  const combinedItems = React.useMemo(() => {
    if (loadingAnnouncements || loadingFeedbacks) return [];

    // Filter feedback for current user and response === true
    const filteredFeedbacks = feedbacks.filter(
      (fb) => fb.userId === user?.uid && fb.response === true
    );

    // Map them into a common shape
    const mappedFeedbacks = filteredFeedbacks.map((fb) => ({
      type: "feedback",
      id: fb._id,
      content: fb.message,
    }));

    const mappedAnnouncements = announcements.map((ann) => ({
      type: "announcement",
      id: ann._id,
      content: ann.title,
    }));

    // Combine both arrays
    return [...mappedAnnouncements, ...mappedFeedbacks];
  }, [announcements, feedbacks, user?.uid, loadingAnnouncements, loadingFeedbacks]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer"
      >
        <FaBell className="text-2xl text-gray-600 mr-5" />
        {combinedItems.length > 0 && (
          <span className="absolute -top-2 right-0.5 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {combinedItems.length}
          </span>
        )}
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg z-20 p-3 max-h-96 overflow-y-auto border border-gray-200">
          <h3 className="font-bold text-lg mb-2 text-orange-600">
            Notifications
          </h3>
          {combinedItems.length === 0 ? (
            <p className="text-gray-500">No new notifications</p>
          ) : (
            <ul className="space-y-2">
              {combinedItems.map((item) => (
                <li
                  key={item.id}
                  className={`text-sm text-gray-700 border-b pb-1 ${
                    item.type === "feedback" ? "" : ""
                  }`}
                >
                  {item.content}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default AnnouncementBell;
