import React from "react";
import Navbar from "../navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className='min-h-screen  bg-sky-900'>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
