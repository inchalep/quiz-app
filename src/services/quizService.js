import { _get, _post } from "../utils/apiUtil";

export const fetchTopicList = async () => {
  const result = await _get("quiz/topiclist");
  return result;
};

export const fetchQuestionsList = async (topics) => {
  const result = await _post("quiz/fetch-questions", topics);
  return result;
};

export const updateScore = async (payload) => {
  const result = await _post("quiz/update-score", payload);
  return result;
};

export const fetchTopPlayers = async () => {
  const result = await _get("quiz/top-players");
  return result;
};

export const fetchMyScore = async () => {
  const result = await _get("quiz/get-my-score");
  return result;
};
