import React, { useState, useRef, useEffect } from "react";
import { MdNotificationsNone, MdClose } from "react-icons/md";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";
import Loader from "../../pages/Loader/Loader";

const NotificationBell = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { role } = useUserRole();
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { data: announcements = [],  } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcements");
      return res.data;
    },
  });

  const { data: feedbacks = [],  } = useQuery({
    queryKey: ["feedback"],
    queryFn: async () => {
      const res = await axiosSecure.get("/feedback");
      return res.data;
    },
  });

  const feedbackMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/feedback/${id}/read`, { read: true });
    },
    onSuccess: () => queryClient.invalidateQueries(["feedback"]),
  });

  const announcementMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/announcements/${id}/read`, {
        read: true,
      });
    },
    onSuccess: () => queryClient.invalidateQueries(["announcements"]),
  });

  // if (roleLoading || announcementLoading || feedbackLoading) return <Loader />;

  const userFeedbacks = feedbacks.filter(
    (item) => item.userId === user?.uid && item.response === true && !item.read
  );

  const unreadAnnouncements = announcements.filter((item) => !item.read);

  const combinedNotifications = [...userFeedbacks, ...unreadAnnouncements];

  const handleDismiss = (item) => {
    if (item.message) {
      feedbackMutation.mutate(item._id);
    } else {
      announcementMutation.mutate(item._id);
    }
  };

  return (
    <>
      {role === "admin" || role === "user" ? (
        <div className="relative" ref={dropdownRef}> 
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl relative"
          >
            <MdNotificationsNone size={28} className="mr-3 mt-1" />

            {/* Notification Count Badge */}
            {combinedNotifications.length > 0 && (
              <span className="absolute -top-1 right-1 bg-orange-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {combinedNotifications.length}
              </span>
            )}
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded shadow-lg z-50">
              {/* Notifications Header */}
              <div className="px-4 py-2">
                <h1 className="text-lg font-bold text-center mt-2 text-black">
                  Notifications
                </h1>
              </div>

              {role === "admin" ? (
                <div className="p-4 mb-4 text-center text-gray-500">
                  No notifications available
                </div>
              ) : combinedNotifications.length === 0 ? (
                <div className="p-4 mb-4 text-center text-gray-500">
                  No notifications available
                </div>
              ) : (
                combinedNotifications.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center px-4 py-2 border-b border-gray-600 text-sm hover:bg-gray-50"
                  >
                    <span className="font-semibold mb-2">
                      {item.message || item.title}
                    </span>
                    <button
                      className="text-orange-600 hover:text-orange-700"
                      onClick={() => handleDismiss(item)}
                    >
                      <MdClose size={17} className="-mt-1.5"/>
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default NotificationBell;
