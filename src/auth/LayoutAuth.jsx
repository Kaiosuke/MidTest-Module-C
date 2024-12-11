import React from "react";
import { Outlet } from "react-router-dom";

const LayoutAuth = () => {
  return (
    <div className="bg-black h-screen">
      <Outlet />
    </div>
  );
};

export default LayoutAuth;
