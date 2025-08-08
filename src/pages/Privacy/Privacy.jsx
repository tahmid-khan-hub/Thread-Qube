import React, { useEffect } from "react";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";

const Privacy = () => {

  useEffect(()=>{
    document.title = "ThreadQube | Privacy & Policy"
    window.scrollTo(0,0);
  },[])
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["privacy"],
    queryFn: async () => {
      const res = await axiosSecure.get("/staticPages/privacy");
      return res.data;
    },
  });
  console.log(data);

  if (isLoading || !data) return <Loader></Loader>;

  return (
    <div className="max-w-[1500px] mx-auto px-2 py-10">
      <h1 className="text-3xl font-bold mb-6">Privacy & Policy</h1>
      <div className="prose prose-sm max-w-none">
        <div
          dangerouslySetInnerHTML={{
            __html: data.content.replace(/className=/g, "class="),
          }}
        />
      </div>
      <p className="text-sm text-gray-600 mt-10">
        Last updated: {new Date(data.lastUpdated).toLocaleDateString()}
      </p>
    </div>
  );
};

export default Privacy;
