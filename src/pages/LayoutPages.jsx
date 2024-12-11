import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const LayoutPages = () => {
  return (
    <>
      <Header />
      <div className="max-w-[1200px] m-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default LayoutPages;
