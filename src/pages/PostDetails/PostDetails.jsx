import React from "react";
import { useLoaderData, useParams } from "react-router";
import CommentsSection from "../CommentsSection/CommentsSection";

const PostDetails = () => {
  const paramsId = useParams();
  const id = paramsId.id;
  const loaderData = useLoaderData();
  const postsData = loaderData.posts;

  const postData = postsData.find((post) => post._id.toString() === id);

  const {
    authorImage,
    authorName,
    description,
    downVote,
    upvote,
    title,
    tag,
    postTime,
  } = postData;

  return (
    <div className="max-w-[1400px] mx-auto min-h-screen mt-20 py-10">
      <div className="border-gray-600 rounded-lg shadow-md p-6 bg-gray-50 space-y-5">
        {/* Title */}
        <h1 className="text-3xl font-bold text-orange-600">{title}</h1>

        {/* Author Info + Tag */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <img
              src={authorImage}
              alt={authorName}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-orange-400"
            />
            <div>
              <p className="text-lg font-medium text-gray-800">{authorName}</p>
              {postTime && (
                <p className="text-sm text-gray-500">
                  {new Date(postTime).toLocaleString()}
                </p>
              )}
            </div>
          </div>
          <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
            #{tag}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {description}
        </p>

        {/* Votes */}
        <div className="flex items-center gap-6 text-sm font-medium text-gray-600 mt-4">
          <div className="flex items-center gap-1">
            <span className="text-green-600 font-semibold">{upvote || 0}</span>{" "}
            Upvotes
          </div>
          <div className="flex items-center gap-1">
            <span className="text-red-600 font-semibold">{downVote || 0}</span>{" "}
            Downvotes
          </div>
        </div>
      </div>
      <CommentsSection postId={id}></CommentsSection>
    </div>
  );
};

export default PostDetails;
