import React, { useEffect, useState } from "react";
import Animation from "../../hooks/Animation";

const faqData = [
  {
    question: "What can I do on ThreadQube?",
    answer:
      "On ThreadQube, you can create posts, comment on threads, interact with others, manage your content, and take part in a growing discussion-based community.",
  },
  {
    question: "Do I need an account to use ThreadQube?",
    answer:
      "Yes, creating an account allows you to post, comment, and access your personalized dashboard based on your user role.",
  },
  {
    question: "Will I receive announcements from the admin?",
    answer:
      "Yes, admins can share announcements and important updates. These will appear in your dashboard for easy access.",
  },
  {
    question: "What are the benefits of membership?",
    answer:
      "With a free account, you can create up to 5 posts. Membership removes that limit and gives you greater flexibility to participate.",
  },
  {
    question: "Can I report a comment?",
    answer:
      "Yes, if you find any comment inappropriate or against the community guidelines, you can report it directly from the interface. Our moderation team will review it.",
  },
];

const FaQ = () => {
  useEffect(() => {
    document.title = "ThreadQube | FAQ";
    window.scrollTo(0,0)
  }, []);

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="min-h-screen px-6 py-16 ">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 ">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <Animation><div
              data-aos="fade-up"
              key={index}
              className="border rounded-lg shadow-sm transition-all duration-200"
            >
              <button
                className="w-full flex justify-between items-center p-5 text-left text-lg font-medium "
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span className="text-orange-500 text-2xl">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>
              {activeIndex === index && (
                <div className="px-5 pb-5 text-gray-500 text-base">
                  {faq.answer}
                </div>
              )}
            </div></Animation>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaQ;
