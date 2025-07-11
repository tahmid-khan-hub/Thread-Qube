import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import Pagination from "../../shared/Pagination/Pagination";
import { FaThumbsUp, FaComment } from "react-icons/fa";
import { Link } from "react-router";

const Posts = ({ page, setTotalPages }) => {
  const axiosSecure = useAxiosSecure();
  const [posts, setPosts] = useState([]);
  const limit = 5;

  useEffect(() => {
    axiosSecure
      .get(`http://localhost:3000/Allposts?page=${page}&limit=${limit}`)
      .then((res) => {
        setPosts(res.data.posts);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
      });
  }, [page]);

  return (
    <>
      {" "}
      <section className="max-w-[1400px] mx-auto px-4 py-8">
        <h2 className="text-3xl text-center my-11 font-bold ">All Posts</h2>

        <div className="grid md:grid-cols-1 gap-6">
          {posts.map((post) => (
            <Link to={`postDetails/${post._id}`}><div
              key={post._id}
              className="bg-white p-4 rounded-md shadow-md border border-gray-300"
            >
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
                <span className=" bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                  #{post.tag}
                </span>
                <span className="ml-2 mt-1 font-semibold">{new Date(post.postTime).toLocaleDateString()}</span>
              </div>

              <div className="flex justify-between text-sm font-medium text-gray-700 mt-5">
                <span className="flex items-center gap-1">
                  <FaComment /> {post.comments ?? 0} Comments
                </span>
                <span className="flex items-center gap-1">
                  <FaThumbsUp /> {post.upvote - post.downVote} Votes
                </span>
              </div>
            </div></Link>
          ))}
        </div>
      </section>
      
    </>
  );
};

export default Posts;
