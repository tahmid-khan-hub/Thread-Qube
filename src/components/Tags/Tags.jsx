import React, { useState } from "react";

const Tags = () => {
  const tags = ["education", "travel", "technology", "personal-development", "books", "gaming", "music", "career", "health", "sports"]
  const [activeTag, setActiveTag] = useState(null);

  return (
    <section className="max-w-[1400px] mx-auto px-4 mt-8">
      <h2 className="text-2xl font-semibold mb-4">Browse by Tags</h2>

      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-4 py-2 rounded-full border text-sm font-medium cursor-pointer
              ${
                activeTag === tag
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-orange-100"
              }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Tags;
