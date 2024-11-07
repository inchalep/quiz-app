import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchQuestionsList } from "../../services/quizService";

const initialState = {
  data: [],
  result: {
    correct: 0,
    attempt: 0,
    skip: 0,
    incorrect: 0,
    score: 0
  },
};

export const fetchQuizData = createAsyncThunk(
  "quiz/fetchQuiz",
  async (topics) => {
    const response = await fetchQuestionsList(topics);
    return response.data;
  }
);

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    selectQuizOption: (state, action) => {
      const { ans, qsnNo } = action.payload;
      state.data[qsnNo].selectedAns = ans;
    },
    saveScore: (state, action) => {
      state.result = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuizData.fulfilled, (state, action) => {
      const quizquestions = action.payload.map((item) => ({
        ...item,
        selectedAns: "",
      }));
      state.data = quizquestions;
    });
  },
});

export const { selectQuizOption, saveScore } = quizSlice.actions;

export default quizSlice.reducer;
