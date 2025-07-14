import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../pages/Loader/Loader";
import bronze from "../../assets/bronze.png"
import gold from "../../assets/gold.jpg"

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: UserProfile = {}, isLoading: userLoading } = useQuery({
    queryKey: ["userInfo", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?email=${user.email}`
      );
      return res.data;
    },
  });

  const { data: myPosts = [], isLoading: postsLoading } = useQuery({
    queryKey: ["recentPosts", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/Allposts/user/recent?email=${user.email}`
      );
      return res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    },
  });

  console.log(myPosts);

  const badgeImage =
    UserProfile.badge === "gold"
      ? gold
      : bronze;

  if (postsLoading || userLoading) return <Loader></Loader>;

  return (
    <div className=" mt-10 px-4">
      {/* Profile Card */}
      <div className="max-w-3xl mx-auto bg-white border border-gray-400 rounded-lg shadow p-6">
        <img
          src={user?.photoURL}
          alt="Profile"
          className="w-28 h-28 mx-auto rounded-full object-cover ring-2 ring-orange-500"
        />
        <h2 className="text-2xl text-center font-bold mt-4 text-gray-800">
          {user?.displayName}
        </h2>

        <div className="flex justify-center items-center gap-3 mt-2 text-sm text-gray-600 flex-wrap">
          <span>{user?.email}</span>
          <span className="flex items-center gap-1">
            <img src={badgeImage} alt="Badge" className="w-5 h-5 object-cover" />
            <span className="capitalize text-orange-600 font-medium">
              {UserProfile.badge} badge
            </span>
          </span>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="mt-10 max-w-5xl mx-auto">
        <h2 className="text-3xl text-center mt-20 font-semibold mb-4 ">
          Recent Posts
        </h2>
        {myPosts.length === 0 ? (
          <p className="text-gray-500">You haven't posted anything yet.</p>
        ) : (
          <div className="space-y-7 mb-7 max-w-5xl mx-auto">
            {myPosts.slice(0, 3).map((post) => (
              <div
                key={post._id}
                className="border border-gray-400 p-4 rounded-md shadow-md bg-gray-50"
              >
                <h3 className="text-lg font-bold text-orange-700">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {post.description.slice(0, 100)}...
                </p>
                <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
                  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium"># {post.tag}</span>
                  <span className="font-semibold">
                    Votes: {(post.upvote ?? 0) + (post.downVote ?? 0)} |{" "}
                    {new Date(post.postTime).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
