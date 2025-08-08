import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import LexicalEditor from "../../components/LexicalEditor/LexicalEditor";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import Loader from "../../pages/Loader/Loader";

const EditPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editorContent, setEditorContent] = useState(null);

  useEffect(() => {
    document.title = "ThreadQube | Edit Terms and Policy";
  }, []);

  const { data: pageData = {}, isLoading } = useQuery({
    queryKey: ["page", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/staticPages/${id}`);
      const content = res.data?.content;

      try {
        const parsedContent = JSON.parse(content);
        setEditorContent(parsedContent);
      } catch {
        setEditorContent(null);
      }

      return res.data;
    },
    enabled: !!id,
  });

  console.log(pageData);

  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosSecure.patch(`/staticPages/${id}`, {
        content: JSON.stringify(editorContent),
        lastUpdated: new Date(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["page", id]);
      Swal.fire({
        title: "Success!",
        text: "Page content updated!",
        icon: "success",
      });
    },
    onError: (err) => {
      Swal.fire({
        title: "Error!",
        text: err?.message || "Something went wrong",
        icon: "error",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  if (isLoading) return <Loader></Loader>;

  return (
    <div className=" p-6">
      <h1 className="text-3xl text-center font-bold mt-5 mb-7">
        Update: {pageData?.title}
      </h1>
      <form onSubmit={handleSubmit}>
        <LexicalEditor
          initialContent={editorContent}
          onChange={(val) => setEditorContent(val)}
        />
        <button
          type="submit"
          className="mt-8 w-full btn bg-gradient-to-r from-[#ef7706] to-[#fa9a1b] hover:from-[#fa9a1b] hover:to-[#ef7706] text-white"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditPage;
