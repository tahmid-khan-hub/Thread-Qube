// src/pages/admin/EditPage.jsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import Loader from "../../pages/Loader/Loader";

const EditPage = () => {
  const { id } = useParams(); 
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { register, handleSubmit, reset} = useForm();
  const mapPageToForm = (data = {}) => {
    const mapped = {
      title: data.title ?? "",
      description: data.description ?? "",
      lastUpdated: data.lastUpdated ?? "",
    };

    for (let i = 1; i <= 10; i++) {
      mapped[`t${i}_title`] = data[`t${i}_title`] ?? "";
      mapped[`t${i}`] = data[`t${i}`] ?? "";
    }

    return mapped;
  };

  const { data: pageData, isLoading } = useQuery({
    queryKey: ["staticPage", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/staticPages/${id}`);
      return res.data?.data ?? res.data;
    },
    enabled: !!id,
    retry: 1,
    onError: (err) => {
      console.error(err);
      Swal.fire("Error", "Failed to load page data.", "error");
    },
  });

  useEffect(() => {
    if (pageData) {
      reset(mapPageToForm(pageData));
    }
  }, [pageData, reset]);

  const updateMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosSecure.put(`/staticPages/${id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["staticPage", id]);
      Swal.fire("Saved", "Page updated successfully.", "success").then(() => {
        navigate("/"); 
      });
    },
    onError: (err) => {
      console.error(err);
      Swal.fire("Error", "Could not update page.", "error");
    },
  });

  const onSubmit = (formValues) => {
    updateMutation.mutate(formValues);
  };

  if (isLoading) return <Loader></Loader>;

  return (
    <div className="p-4">
      <h1 className="text-3xl text-center font-bold mb-4 mt-8">Update Terms & Conditions</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            {...register("title")}
            className="border border-gray-300 bg-base-200 rounded w-full p-2"
            placeholder="Page title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            {...register("description")}
            rows={5}
            className="border border-gray-300 bg-base-200 rounded w-full p-2"
            placeholder="Short description shown on top"
          />
        </div>

        {/* Sections t1..t10 */}
        {Array.from({ length: 10 }).map((_, i) => {
          const num = i + 1;
          return (
            <div key={num} className="border border-gray-300 bg-base-200 p-3 rounded">
              <label className="block font-medium mb-1">Section {num} (Title)</label>
              <input
                {...register(`t${num}_title`)}
                className="border border-gray-300 bg-base-200 rounded w-full p-2 mb-2"
                placeholder={`Section ${num} title`}
              />
              <label className="block font-medium mb-1">Section {num} (Content)</label>
              <textarea
                {...register(`t${num}`)}
                rows={3}
                className="border border-gray-300 bg-base-200 rounded w-full p-2"
                placeholder={`Section ${num} content`}
              />
            </div>
          );
        })}

        {/* actions */}
        <div className="flex items-center gap-3 mb-3">
          <button
            type="submit"
            disabled={updateMutation.isLoading}
            className="btn bg-gradient-to-r from-[#ef7706] to-[#fa9a1b] hover:from-[#fa9a1b] hover:to-[#ef7706] text-white"
          >
            {updateMutation.isLoading ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={() => reset(mapPageToForm(pageData))}
            className="btn border border-orange-500 bg-white"
          >
            Reset
          </button>

          <div className="ml-auto text-sm text-gray-600">
            Last updated:{" "}
            {pageData?.lastUpdated ? new Date(pageData.lastUpdated).toLocaleString() : "—"}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPage;
