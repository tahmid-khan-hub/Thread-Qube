import React, { useState } from "react";
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
  const { role, roleLoading } = useUserRole();
  const [isOpen, setIsOpen] = useState(false);

  const { data: announcements = [], isLoading: announcementLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcements");
      return res.data;
    },
  });

  const { data: feedbacks = [], isLoading: feedbackLoading } = useQuery({
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
      return await axiosSecure.patch(`/announcements/${id}/read`, { read: true });
    },
    onSuccess: () => queryClient.invalidateQueries(["announcements"]),
  });

  if (roleLoading || announcementLoading || feedbackLoading) return <Loader />;

  const userFeedbacks = feedbacks.filter(
    (item) => item.userId === user?.uid && item.response === true && !item.read
  );

  const unreadAnnouncements = announcements.filter((item) => !item.read);

  const combinedNotifications = [...userFeedbacks, ...unreadAnnouncements];

  const handleDismiss = (item) => {
    if (item.message) {
      // Feedback
      feedbackMutation.mutate(item._id);
    } else {
      // Announcement
      announcementMutation.mutate(item._id);
    }
  };

  return (
    <>
      {role === "admin" || role === "user" ? (
        <div className="relative">
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
            <MdNotificationsNone />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg z-50">
              {role === "admin" ? (
                <div className="p-4 text-center text-gray-500">No notifications</div>
              ) : combinedNotifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">No notifications</div>
              ) : (
                combinedNotifications.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center px-4 py-2 border-b text-sm hover:bg-gray-50"
                  >
                    <span>{item.message || item.title}</span>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDismiss(item)}
                    >
                      <MdClose />
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
