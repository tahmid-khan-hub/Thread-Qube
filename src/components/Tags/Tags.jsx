import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Tags = ({ activeTag, setActiveTag }) => {

  const { data: tags = [] } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/Alltags");
      return res.data;
    },
  });

  return (
    <section className="max-w-[1400px] mx-auto px-4 mt-12">
      <h2 className="text-3xl text-center font-bold mb-4">Browse by Tags</h2>
      <div className="flex justify-center items-center flex-wrap gap-3">
        {tags.map((tag) => (
          <button
            key={tag._id}
            onClick={() => setActiveTag(tag.name)}
            className={`px-4 py-2 rounded-full border text-sm font-medium cursor-pointer
              ${
                activeTag?.toLowerCase() === tag.name.toLowerCase()
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-orange-100"
              }`}
          >
            {tag.name}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Tags;
