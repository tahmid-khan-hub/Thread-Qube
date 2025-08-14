import React from "react";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../pages/Loader/Loader";
import Lottie from "lottie-react";
import NoUserLottie from "../../assets/lotties/no user.json"
import Animation from "../../hooks/Animation";

const NewUserThisMonth = () => {
  const axiosSecure = useAxiosSecure();

  const { data: newUsers = [], isLoading } = useQuery({
    queryKey: ["newUsersThisMonth"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/new-this-month");
      return res.data;
    },
  });
  console.log(newUsers);

  if (isLoading) return <Loader></Loader>;
  return (
    <div className=" rounded-xl p-5">
      {newUsers.length === 0 ? (
        <div className="w-72 h-72">
          <Lottie animationData={NoUserLottie} loop />
          <p className="text-gray-500">No new user this month</p>
        </div>
      ) : (
        <Animation><div data-aos="fade-up" className="space-y-3">
          {newUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-4 p-3 border border-gray-400 rounded-lg hover:bg-gray-50 transition"
            >
              <img
                src={user.photoURL}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <span className="ml-auto text-xs px-2 py-1 rounded-full bg-gray-200">
                {user.badge}
              </span>
            </div>
          ))}
        </div></Animation>
      )}
    </div>
  );
};

export default NewUserThisMonth;
