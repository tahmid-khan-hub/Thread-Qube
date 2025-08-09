import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import { $generateHtmlFromNodes } from "@lexical/html";
import { createEditor } from "lexical";
import useAxiosSecure from "../../hooks/UseAxiosSecure";

const Terms = () => {
  const axiosSecure = useAxiosSecure();
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    document.title = "ThreadQube | Terms & Conditions";
    window.scrollTo(0, 0);
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["terms"],
    queryFn: async () => {
      const res = await axiosSecure.get("/staticPages");
      return res.data;
    },
  });

  useEffect(() => {
    if (!data?.content) return;

    let parsed;
    try {
      parsed = typeof data.content === "string"
        ? JSON.parse(data.content)
        : data.content;
    } catch (err) {
      console.error("Invalid editor state JSON", err);
      return;
    }

    const editor = createEditor();
    editor.update(() => {
      const editorState = editor.parseEditorState(parsed);
      editor.setEditorState(editorState);
      const html = $generateHtmlFromNodes(editor);
      setHtmlContent(html);
    });
  }, [data]);

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-[1500px] mx-auto px-2 py-10">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <div
        className="prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      <p className="text-sm text-gray-600 mt-10">
        Last updated: {data?.lastUpdated ? new Date(data.lastUpdated).toLocaleDateString() : ""}
      </p>
    </div>
  );
};

export default Terms;
