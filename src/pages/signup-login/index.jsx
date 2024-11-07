import React, { useMemo } from "react";
import Login from "../../components/login";
import { useResolvedPath } from "react-router-dom";
import Registration from "../../components/registration";

const SignUpLogin = () => {
  const { pathname } = useResolvedPath();
  const isLoginPath = useMemo(
    () => (pathname === "/login" ? true : false),
    [pathname]
  );
  return (
    <div className='min-h-screen  bg-sky-900 flex flex-col justify-center items-center'>
      <h1 className='font-bold text-4xl text-white mb-4'>Quizzy Bizzy</h1>
      {isLoginPath ? <Login /> : <Registration />}
    </div>
  );
};

export default SignUpLogin;
