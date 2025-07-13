import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import { FaThumbsUp, FaComment } from "react-icons/fa";
import { Link } from "react-router";
import Loader from "../../pages/Loader/Loader";

const Posts = ({ page, activeTag, setTotalPages }) => {
  const axiosSecure = useAxiosSecure();
  const limit = 5;
  const [sortBy, setSortBy] = useState("newest");

  const { data: postsData, isLoading } = useQuery({
    queryKey: ["posts", page, activeTag, sortBy],
    queryFn: async () => {
      const tagQuery = activeTag ? `&tag=${activeTag}` : "";
      const res = await axiosSecure.get(
        `http://localhost:3000/Allposts?page=${page}&limit=${limit}${tagQuery}&sort=${sortBy}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  useEffect(() => {
    if (postsData?.totalPages) {
      setTotalPages(postsData.totalPages);
    }
  }, [postsData, setTotalPages]);

  if (isLoading) return <Loader />;

  const posts = postsData?.posts ?? [];

  return (
    <section className="max-w-[1400px] mx-auto px-4 py-8">
      <h2 className="text-3xl text-center mt-11 mb-7 font-bold">All Posts</h2>

      <div className="flex justify-end mb-11">
        <button
          onClick={() =>
            setSortBy(sortBy === "newest" ? "popularity" : "newest")
          }
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
        >
          {sortBy === "newest" ? "Sort by Popularity" : "Sort by Newest"}
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-16">
          {activeTag
            ? `No posts found with the tag "${activeTag}". Try another one.`
            : "No posts available right now."}
        </div>
      ) : (
        <div className="grid md:grid-cols-1 gap-6">
          {posts.map((post) => (
            <Link to={`postDetails/${post._id}`} key={post._id}>
              <div className="bg-white p-4 rounded-md shadow-md border border-gray-300">
                <div className="flex items-center space-x-3 mb-5">
                  <img
                    src={post.authorImage}
                    alt="Author"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <h4 className="font-medium text-black">{post.title}</h4>
                  <h4 className="font-medium text-black">{post.Name}</h4>
                </div>

                <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-2">
                  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                    #{post.tag}
                  </span>
                  <span className="ml-2 mt-1 font-semibold">
                    {new Date(post.postTime).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-medium text-gray-700 mt-5">
                  <span className="flex items-center gap-1">
                    <FaComment /> {post.commentsCount ?? 0} Comments
                  </span>
                  <span className="flex items-center gap-1">
                    <FaThumbsUp />
                    {(post.upvote ?? 0) - (post.downVote ?? 0)} Votes
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default Posts;
