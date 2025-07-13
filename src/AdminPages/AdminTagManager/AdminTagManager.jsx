import React, { useState } from "react";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AdminTagManager = () => {
  const axiosSecure = useAxiosSecure();
  const [tagName, setTagName] = useState("");

  const { data: tags = [], refetch } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tags");
      return res.data;
    },
  });

  const handleAddTag = async (e) => {
    e.preventDefault();
    if (!tagName) return;

    try {
      const res = await axiosSecure.post("/tags", {
        name: tagName,
      });
      if (res.data.insertedId) {
        Swal.fire("Success", "Tag added", "success");
        setTagName("");
        refetch();
      }
    } catch (err) {
      Swal.fire("Error", err.response.data.error || "Failed", "error");
    }
  };
  return (
    <div className="my-12">
      <h2 className="text-xl font-bold mb-3">Manage Tags</h2>
      <form onSubmit={handleAddTag} className="flex gap-2 mb-5">
        <input
          type="text"
          className="input input-bordered"
          placeholder="New tag name"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
        />
        <button type="submit" className="btn bg-orange-500 text-white">
          Add Tag
        </button>
      </form>

      <div className="max-w-xl mx-auto flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag._id} className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AdminTagManager;
