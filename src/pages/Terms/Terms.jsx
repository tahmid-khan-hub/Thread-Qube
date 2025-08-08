import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import Loader from "../Loader/Loader";

const Terms = () => {

  useEffect(()=>{
    document.title = "ThreadQube | Terms & Conditions"
    window.scrollTo(0,0);
  },[])
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["terms"],
    queryFn: async () => {
      const res = await axiosSecure.get("/staticPages");
      return res.data;
    },
  });

  if (isLoading) return <Loader></Loader>;

  return (
    <div className="max-w-[1500px] mx-auto px-2 py-10">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
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

export default Terms;
