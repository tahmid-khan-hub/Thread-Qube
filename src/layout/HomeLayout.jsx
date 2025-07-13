import React, { useState } from "react";
import Home from "../components/Home/Home";
import Navbar from "../shared/Navbar/Navbar";
import Footer from "../shared/Footer/Footer";
import Banner from "../components/Banner/Banner";
import { Outlet, useLocation } from "react-router";

const HomeLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [activeTag, setActiveTag] = useState("");

  return (
    <div>
      <Navbar />
      {isHome && <Banner setActiveTag={setActiveTag} />} 
      <div className="w-[97%] md:max-w-[1400px] mx-auto">
        <Outlet context={{ activeTag, setActiveTag }} /> 
      </div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
