import React from "react";
import Home from "../components/Home/Home";
import Navbar from "../shared/Navbar/Navbar"
import Footer from "../shared/Footer/Footer"
import Banner from "../components/Banner/Banner"
import { Outlet, useLocation } from "react-router";

const HomeLayout = () => {
  const location = useLocation();
  const home = location.pathname === '/'
  return (
    <div>
      <Navbar></Navbar>
      {
        home && <Banner></Banner>
      }
      
      <div className="w-[97%] md:max-w-[1400px] mx-auto">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;
