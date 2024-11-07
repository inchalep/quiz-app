import React from "react";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className='min-h-screen flex flex-col gap-y-4 justify-center items-center'>
      <p className='text-2xl text-sky-800 font-bold'>Ops! Page Not Foud</p>
      <button className='py-1 p-2 text-white bg-sky-800'>
        <NavLink to={"/"} title='Back to home'>
          Back to Home
        </NavLink>
      </button>
    </div>
  );
};

export default NotFound;
