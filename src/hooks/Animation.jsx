import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Animation = ({children}) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return <>{children}</>;
};

export default Animation;