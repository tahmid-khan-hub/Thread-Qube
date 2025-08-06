import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";

const FeedBack = () => {
  useEffect(() => {
    document.title = "ThreadQube | Feedback";
  }, []);

  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const feedbackData = {
        ...data,
        name: user?.displayName || "Anonymous",
        photo: user?.photoURL || null,
        userId: user?.uid || user?.email,
        createdAt: new Date().toISOString(),
        response: false,
        rating: parseInt(data.rating),
      };

      if (data.screenshot && data.screenshot.length > 0) {
        feedbackData.screenshot = data.screenshot[0].name;
      }

      const res = await axiosSecure.post("/feedback", feedbackData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Thank you!", "Your feedback has been submitted.", "success");
      reset();
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="mx-3 p-4">
      <h2 className="text-3xl text-center font-bold mb-9 mt-5">
        Submit Feedback
      </h2>

      {/* User Info Display */}
      {user && (
        <div data-aos="fade-down" className="flex items-center gap-3 mb-5 bg-base-200 p-3 rounded-lg">
          <img
            src={user?.photoURL}
            alt="User Avatar"
            className="w-12 h-12 rounded-full object-cover border"
          />
          <div>
            <p className="font-semibold">{user?.displayName}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>
      )}

      <form
        data-aos="fade-up"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-base-200 p-5 rounded-xl"
      >
        {/* Category */}
        <label className="block">
          <span className="text-black font-semibold">Category</span>
          <select
            {...register("category")}
            className="w-full p-2 border-2 border-gray-300 bg-white rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="Bug Report">Bug Report</option>
            <option value="Feature Request">Feature Request</option>
            <option value="General Feedback">General Feedback</option>
            <option value="UI/UX Suggestion">UI/UX Suggestion</option>
            <option value="Other">Other</option>
          </select>
        </label>

        {/* Star Rating */}
        <div>
          <span className="text-black font-semibold block mb-2">Rating</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer text-2xl transition-colors ${
                  watch("rating") >= star ? "text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => setValue("rating", star)}
              />
            ))}
          </div>
          <input type="hidden" {...register("rating")} required />
        </div>

        {/* Message */}
        <textarea
          {...register("message")}
          placeholder="Write your feedback here..."
          className="w-full p-2 border-2 border-gray-300 bg-white rounded h-32"
          required
        />

        {/* Screenshot Upload */}
        <label className="block">
          <span className="text-black font-semibold">
            Attach Screenshot (optional)
          </span>
          <input
            type="file"
            accept="image/*"
            {...register("screenshot")}
            className="mt-2 block w-full text-sm text-gray-500 border border-gray-300 rounded cursor-pointer"
          />
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full mt-5 btn bg-gradient-to-r from-[#ef7706] to-[#fa9a1b] hover:from-[#fa9a1b] hover:to-[#ef7706] text-white"
        >
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default FeedBack;
