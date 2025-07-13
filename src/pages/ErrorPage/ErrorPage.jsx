import React, { useEffect } from "react";
import Lottie from "lottie-react";
import ErrorLottie from "../../assets/lotties/error.json"
import { Link } from "react-router";

const ErrorPage = () => {

  useEffect(()=>{document.title = "ThreadQube | No Page Found"},[])


  return (
    <>
      <div className="bg-[#f9e8d9]">
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="w-72 h-72">
            <Lottie animationData={ErrorLottie} loop />
          </div>
          <p className="text-center text-2xl my-4">
            Oops! The page you're looking for doesn't exist
          </p>
          <div className="flex">
            <Link className="block mx-auto w-fit" to={`/`}>
              <button className="btn text-white bg-orange-500 rounded-md hover:bg-orange-600">
                Home
              </button>
            </Link>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;