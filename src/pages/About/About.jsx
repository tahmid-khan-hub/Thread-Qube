import React, { useEffect } from "react";
import Lottie from "lottie-react";
import AboutLottie from "../../assets/lotties/About Us Team.json";
import { Link } from "react-router";
import Animation from "../../hooks/Animation";

const About = () => {
  useEffect(() => {
    document.title = "ThreadQube | About";
    window.scrollTo(0,0);
  }, []);
  return (
   <Animation> <div className="min-h-screen py-12 md:px-10 lg:px-20 ">
      <div className="max-w-[1300px] mx-auto grid md:grid-cols-2 gap-16 items-center mb-44">
        {/* Lottie Animation */}
        <div data-aos="fade-right">
          <Lottie
            animationData={AboutLottie}
            loop={true}
            className="w-full h-auto"
          />
        </div>

        {/* Text Content */}
        <div data-aos="fade-left">
          <h2 className="text-3xl font-bold mb-7">
            Welcome to{" "}
            <a className="text-3xl font-bold ml-1 ">
              ThreadQube
            </a>
          </h2>
          <p className="text-lg leading-relaxed mb-6">
            ThreadQube is an advanced forum platform designed to bring
            communities closer by enabling meaningful conversations through
            posts, comments, and threaded discussions.
          </p>

          <ul className="space-y-4 ">
            <li className="flex items-start">
              <span className="text-orange-500 text-xl mr-3 ">✔</span>
              <span>
                <strong>Role-based Dashboards:</strong> Personalized spaces for
                users with different roles.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 text-xl mr-3">✔</span>
              <span>
                <strong>Create & Manage Posts:</strong> Share, edit, and
                organize your content seamlessly.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 text-xl mr-3">✔</span>
              <span>
                <strong>Interactive Comments:</strong> Engage in discussions
                with nested replies.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 text-xl mr-3">✔</span>
              <span>
                <strong>Memberships:</strong> Unlock exclusive content and
                features.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 text-xl mr-3">✔</span>
              <span>
                <strong>Post Moderation:</strong> Keep the community safe and
                organized.
              </span>
            </li>
          </ul>

          <p className="mt-6 text-gray-500">
            ThreadQube empowers communities to build vibrant, interactive spaces
            for knowledge sharing and connection.
          </p>

          {/* Footer call-to-action */}
          <div className="mt-8">
            <p className="text-gray-500 mb-4">
              Want to know more about ThreadQube?
            </p>
            <Link
              to="/"
              className="inline-block py-2 btn bg-gradient-to-r from-[#ef7706] to-[#fa9a1b] hover:from-[#fa9a1b] hover:to-[#ef7706] text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div></Animation>
  );
};

export default About;
