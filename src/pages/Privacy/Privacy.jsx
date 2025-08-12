import React, { useEffect } from "react";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";

const Privacy = () => {
  useEffect(() => {
    document.title = "ThreadQube | Privacy & Policy";
    window.scrollTo(0, 0);
  }, []);
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["privacy"],
    queryFn: async () => {
      const res = await axiosSecure.get("/staticPages/privacy");
      return res.data;
    },
  });

  if (isLoading || !data) return <Loader></Loader>;

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-10 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">{data.title}</h1>
      <p>{data.description}</p>

      {/* Privacy & Policy */}
      <h3 className="text-xl mt-5 font-semibold">{data.t1_title}</h3>
      <p className="mt-2">{data.t1}</p>

      <h3 className="text-xl mt-5 font-semibold">{data.t2_title}</h3>
      <p className="mt-2">{data.t2}</p>

      <h3 className="text-xl mt-5 font-semibold">{data.t3_title}</h3>
      <p className="mt-2">{data.t3}</p>

      <h3 className="text-xl mt-5 font-semibold">{data.t4_title}</h3>
      <p className="mt-2">{data.t4}</p>

      <h3 className="text-xl mt-5 font-semibold">{data.t5_title}</h3>
      <p className="mt-2">{data.t5}</p>

      <h3 className="text-xl mt-5 font-semibold">{data.t6_title}</h3>
      <p className="mt-2">{data.t6}</p>

      <h3 className="text-xl mt-5 font-semibold">{data.t7_title}</h3>
      <p className="mt-2">{data.t7}</p>

      <h3 className="text-xl mt-5 font-semibold">{data.t8_title}</h3>
      <p className="mt-2">{data.t8}</p>

      <h3 className="text-xl mt-5 font-semibold">{data.t9_title}</h3>
      <p className="mt-2">{data.t9}</p>

      <h3 className="text-xl mt-5 font-semibold">{data.t10_title}</h3>
      <p className="mt-2">{data.t10}</p>
    </div>
  );
};

export default Privacy;
