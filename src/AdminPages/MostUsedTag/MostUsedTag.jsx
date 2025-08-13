import React, { useMemo } from "react";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../pages/Loader/Loader";

const MostUsedTag = () => {
  const axiosSecure = useAxiosSecure();

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["allPosts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/Allposts/tags");
      return res.data;
    },
  });

  // Count tag usage
  const tagData = useMemo(() => {
    const counts = {};
    posts.forEach((post) => {
      if (post.tag) {
        counts[post.tag] = (counts[post.tag] || 0) + 1;
      }
    });

    return Object.entries(counts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  }, [posts]);

  if (isLoading) return <Loader></Loader>;
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Most Used Tags</h2>
      {tagData.length > 0 ? <BarChart data={tagData} /> : <p>No tags found</p>}
    </div>
  );
};

export default MostUsedTag;
