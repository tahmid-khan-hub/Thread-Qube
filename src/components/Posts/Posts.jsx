import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/UseAxiosSecure";

const Posts = () => {
  const axiosSecure = useAxiosSecure();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axiosSecure.get("http://localhost:3000/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
      });
  }, [axiosSecure]);

  return (
    <section className="max-w-[1400px] mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">All Posts</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((post, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            <div className="flex items-center space-x-3 mb-2">
              <img src={post.authorImage} alt="Author" className="w-10 h-10 rounded-full" />
              <h4 className="font-medium">{post.authorName}</h4>
            </div>
            <h3 className="text-xl font-semibold mb-1">{post.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{post.description}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Tag: #{post.tag}</span>
              <span>{new Date(post.postTime).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Posts;
