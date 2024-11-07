import React, { useEffect, useState } from "react";
import { fetchTopicList } from "../../services/quizService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchQuizData } from "../../store/slices/quizSlice";
import { useNavigate } from "react-router-dom";

const GetQuiz = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const result = await fetchTopicList();
      setTopics(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const selectTopic = (topic) => {
    const isTopicAdded = selectedTopics.find((item) => item._id === topic._id);
    if (isTopicAdded) {
      toast.error("Topic already added.");
      return;
    }
    setSelectedTopics((prev) => [...prev, topic]);
  };

  const startQuiz = () => {
    dispatch(
      fetchQuizData({ topics: selectedTopics.map((topics) => topics._id) })
    );
    navigate("/quiz");
  };
  
  return (
    <div className='wrapper p-6'>
      <h2 className='text-white text-3xl'>Select Topics</h2>
      {topics.length === 0 ? (
        <p className='text-white m-6'>No topics found</p>
      ) : null}
      <div className='flex flex-wrap item-center gap-x-3 mt-6'>
        {topics.length > 0 &&
          topics.map((topic, index) => {
            return (
              <span
                key={index}
                role='button'
                onClick={() => selectTopic(topic)}
                className='px-3 py-1 my-2 rounded-md bg-red-400 capitalize'
              >
                {topic.name}
              </span>
            );
          })}
      </div>
      {selectedTopics.length > 0 ? (
        <>
          <h2 className='text-slate-300 text-xl mt-12'>Selected Topics</h2>
          <div className='flex flex-wrap item-center gap-x-3 mt-6'>
            {selectedTopics.length > 0 &&
              selectedTopics.map((topic, index) => {
                return (
                  <span
                    key={index}
                    role='button'
                    className='px-3 py-1 rounded-md bg-green-400 capitalize'
                  >
                    {topic.name}
                  </span>
                );
              })}
          </div>
        </>
      ) : null}
      {selectedTopics.length > 0 ? (
        <button
          className='mt-14 px-4 py-1 bg-sky-300 rounded-md'
          onClick={startQuiz}
        >
          Start
        </button>
      ) : null}
    </div>
  );
};

export default GetQuiz;
