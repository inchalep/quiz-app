import React from "react";
import quizLoader from "../../assets/images/quizLoader.gif";

const Loader = () => {
  return (
    <div className='min-h-[calc(100vh-60px)] fixed w-full neumorph flex justify-center items-center'>
      <img src={quizLoader} alt='Loader' />
    </div>
  );
};

export default Loader;
