import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTopPlayers } from '../../services/quizService';
import { fetchUserScore } from '../../store/slices/userSlice';

const Home = () => {
  const state = useSelector((state) => state.user);
  const [topPlayers,setTopPlayers] = useState([])
  const { myScore } = state;
  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  useEffect(()=>{
    getTopPlayersData()
    dispatch(fetchUserScore())
  },[])

  const getTopPlayersData = async()=>{
    try {
      const result = await fetchTopPlayers()
      setTopPlayers(result.data)
    } catch (error) {
      console.log(error)
    }
  }
  
  const navigateToQuiz = () => {
    navigate("/get-quiz");
  };
  return (
    <div className='wrapper py-6'>
      <h2 className='text-white text-3xl'>Leaderboard</h2>
      <div className=' md:flex justify-between items-center'>
        <div className='shadow-md w-full md:w-6/12 p-6 my-6 bg-slate-300 h-[calc(100vh-220px)]'>
          <h2 className='text-2xl font-semibold'>Top 10 Players</h2>
          <div>
          <div className='flex justify-between items-center'>
              <h4 className='font-bold w-8/12'>Name</h4>
              <span className='font-bold w-3/12 text-center'>Score(%)</span>
            </div>

            {topPlayers.length===0? <h2>No Data found</h2>:null}
            {topPlayers.length>0&&topPlayers.map((user,index)=>{
              return <div key={index} className='py-1 my-2 flex justify-between items-center'>
              <h4 className='w-8/12'>{user.name}</h4>
              <span className='w-3/12 text-center'>{user.score}</span>
            </div>
            })}
          </div>
        </div>
        <div className='w-full md:w-6/12 flex flex-col gap-y-3 justify-center items-center'>
          <h3 className='text-4xl text-white'>Your score</h3>
          <span className='text-3xl text-slate-300'>
            {myScore?.score ? myScore?.score : 0}%
          </span>
          <button
            className='px-3 border mt-1 border-sky-200 rounded-md text-white bg-sky-600'
            onClick={navigateToQuiz}
          >
            Get Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
