import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import Loader from "../../pages/Loader/Loader";
import Swal from "sweetalert2";

const SocialSettings = () => {
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, reset } = useForm();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["social"],
    queryFn: async () => {
      const res = await axiosSecure.get("/staticPages/social");
      return res.data;
    },
    onSuccess: (data) => {
        reset(data); 
    }
  });

  console.log(data);

  const onSubmit = async (formData) => {
    try {
      await axiosSecure.patch("/staticPages/socialLinks", formData);
      await refetch();
      Swal.fire("Updated!", "Social links updated successfully.", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update social links.", "error");
    }
  };

  if (isLoading) return <Loader></Loader>;

  return (
    <div className="p-6 space-y-8">
      {/* social settings */}
      <div className="bg-base-200 rounded-xl p-6 shadow">
        <h3 className="text-xl font-semibold mb-4">Social Links</h3>
        <p className="text-sm text-gray-500 mb-4">
          Manage ThreadQube social media links.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="font-semibold">FaceBook</label>
            <input
              {...register("facebook", { required: true })}
              defaultValue={data?.facebook || ""}
              className="input input-bordered w-full mt-1"
            />
          </div>

          <div>
            <label className="font-semibold">Twitter</label>
            <input
              {...register("twitter", { required: true })}
              defaultValue={data?.twitter || ""}
              className="input input-bordered w-full mt-1"
            />
          </div>

          <div>
            <label className="font-semibold">LinkedIn</label>
            <input
              {...register("linkedin", { required: true })}
              defaultValue={data?.linkedin || ""}
              className="input input-bordered w-full mt-1"
            />
          </div>

          <button
            type="submit"
            className="w-full btn bg-gradient-to-r from-[#ef7706] to-[#fa9a1b] hover:from-[#fa9a1b] hover:to-[#ef7706] text-white mt-5 text-[15px]"
          >
            Update Links
          </button>
        </form>
      </div>
    </div>
  );
};

export default SocialSettings;
