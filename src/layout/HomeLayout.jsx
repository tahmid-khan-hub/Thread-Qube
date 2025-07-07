import React from "react";
import Home from "../components/Home/Home";
import Navbar from "../shared/Navbar/Navbar"
import Footer from "../shared/Footer/Footer"

const HomeLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="w-[97%] md:max-w-[1400px] mx-auto">
        <Home></Home>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;
