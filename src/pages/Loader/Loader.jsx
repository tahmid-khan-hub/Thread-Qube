import React from "react";
import Lottie from "lottie-react";
import loaderLottie from "../../assets/lotties/loader.json";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[150px] h-[150px]">
        <Lottie animationData={loaderLottie} loop />
      </div>
    </div>
  );
};

export default Loader;