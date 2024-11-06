import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const [isCollapse, setIsCollapse] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: "SIGNOUT_REQUEST" });
    localStorage.clear();
    navigate("/login");
  };
  return (
    <header className='py-3 bg-white shadow-md'>
      <div className='wrapper flex justify-between items-center text-sky-900'>
        <h1 className='font-bold text-3xl'>Quizzy Bizzy</h1>
        <div className='flex justify-between items-center gap-x-3'>
          <nav>
            <NavLink to={"/get-quiz"}>Get Quiz</NavLink>
          </nav>
          <div className='relative'>
            <span
              role='button'
              onClick={() => setIsCollapse((prev) => !prev)}
              className='h-7 w-7 inline-block rounded-full m-0 p-0 flex justify-center items-center bg-sky-900 text-white font-semibold'
            >
              DI
            </span>
            {isCollapse ? (
              <div className='w-36 absolute bg-white shadow-md rounded-md p-3 top-9 -left-12 border'>
                <h2 className='font-bold'>Dnyaneshwar Inchale</h2>
                <button
                  onClick={logout}
                  className='w-full rounded-md py-1 mt-4 font-semibold bg-sky-800 text-white '
                >
                  Logout
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
