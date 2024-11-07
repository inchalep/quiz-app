import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveScore, selectQuizOption } from "../../store/slices/quizSlice";
import { updateScore } from "../../services/quizService";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const [qsnNo, setQsnNo] = useState(0);
  const [time, setTime] = useState(600);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const [currQuestion, setCurrQuestion] = useState({});
  const state = useSelector((state) => state.quiz);
  const user = useSelector((state) => state.user.data);
  const { data } = state;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setCurrQuestion(data[qsnNo]);
    }
  }, [data, qsnNo]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(intervalId);
  }, [intervalId, time]);

  const startTimer = () => {
    if (isRunning) return;
    setIsRunning(true);
    const id = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(id);
          setIsRunning(false);
          finishQuiz();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    setIntervalId(id);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds
    }`;
  };

  const handleQsn = (type) => {
    if (type === "next") {
      setQsnNo((prev) => prev + 1);
    } else {
      setQsnNo((prev) => prev - 1);
    }
  };
  const selectAns = (ans) => {
    dispatch(selectQuizOption({ ans, qsnNo }));
  };

  const finishQuiz = async () => {
    try {
      const result = data.reduce(
        (acc, value) => {
          if (value.selectedAns) {
            acc.attempt += 1;
          } else {
            acc.skip += 1;
          }
          if (value.selectedAns === value.correctAnswer) {
            acc.correct += 1;
          } else {
            acc.incorrect += 1;
          }
          return acc;
        },
        {
          correct: 0,
          attempt: 0,
          skip: 0,
          incorrect: 0,
        }
      );
      const score = (result.correct / data.length) * 100;
      console.log(user._id,'user:::::',user)
      await updateScore({ score, userId: user._id });
      dispatch(saveScore({ ...result, score }));
      navigate("/result");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='wrapper py-6 flex justify-center'>
      <div className='w-full md:w-7/12'>
        <div className='flex justify-between items-center'>
          <p className='text-2xl text-red-300'>
            Question {qsnNo + 1}/{data.length}
          </p>
          <span
            className={`${time < 180 ? "text-red-400" : "text-white"} text-xl`}
          >
            {formatTime(time)}
          </span>
        </div>
        <div className='my-6'>
          <p className='text-xl text-yellow-400'>{currQuestion?.question}</p>
          <div className='mt-3'>
            {currQuestion?.options?.map((item, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    selectAns(item);
                  }}
                  className={`px-3 py-2 block my-1.5 w-full rounded-md text-left text-white ${
                    currQuestion?.selectedAns === item
                      ? "bg-green-600 shadow-md"
                      : "bg-gray-600"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
        <div className='flex justify-between items-center'>
          {qsnNo > 0 ? (
            <button
              onClick={() => handleQsn("back")}
              className='btn bg-sky-600'
            >
              Back
            </button>
          ) : null}
          {qsnNo < data.length - 1 ? (
            <button
              onClick={() => handleQsn("next")}
              className='btn bg-sky-600'
            >
              Next
            </button>
          ) : (
            <button onClick={finishQuiz} className='btn bg-red-600'>
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
