import React from "react";
import { useSelector } from "react-redux";

const Result = () => {
  const state = useSelector((state) => state.quiz);
  const { result, data } = state;
  console.log(result);
  return (
    <div className='wrapper py-6'>
      <h2 className='text-white text-2xl text-center'>Result</h2>
      <div className='mt-5 lg:flex justify-between items-start'>
        <div className='w-full md:w-3/12'>
          <p className='result-elem'>
            <span>Attemp Questions:</span> <span>{result.attempt}</span>
          </p>
          <p className='result-elem'>
            <span>Correct Answer:</span> <span>{result.correct}</span>
          </p>
          <p className='result-elem'>
            <span>Skip Questions:</span> <span>{result.skip}</span>
          </p>
          <p className='result-elem'>
            <span>Wrong Answer:</span> <span>{result.incorrect}</span>
          </p>
          <p className='result-elem'>
            <span className='score'>Score:</span>{" "}
            <span className='score'>{result.score}%</span>
          </p>
        </div>
        <div className='w-full lg:w-8/12 mt-9 lg:mt-0'>
          {data.map((item, index) => {
            return (
              <div key={index}>
                <p className='result-elem'>
                  {index + 1}. {item.question}
                </p>
                <p className='pl-5 text-yellow-300'>Correct Answer: {item.correctAnswer}</p>
                <p className='pl-5 text-green-300'>Your Answer: {item.selectedAns}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Result;
