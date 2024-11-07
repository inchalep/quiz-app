import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "../loader";

const Layout = () => {
  const state = useSelector((state) => state.user);
  console.log(state.isLoading,'state:::')
  const navigate = useNavigate();
  useEffect(() => {
    if (!state.data.token) {
      navigate("/login");
    }
  }, []);

  return (
    <div className='min-h-screen  bg-sky-900'>
      <Navbar />
      <div className='relative'>
        {state.isLoading ? <Loader /> : null}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
