import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import loaderLottie from "../../assets/lotties/loader.json";

const Loader2 = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showLoader && (
        <div className="w-11 h-11">
          <Lottie animationData={loaderLottie} loop />
        </div>
      )}
    </div>
  );
};

export default Loader2;
