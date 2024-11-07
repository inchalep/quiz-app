import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMyScore } from "../../services/quizService";

const initialState = {
  data: {},
  isLoading: false,
  myScore: {
    score: 0,
  },
};

export const fetchUserScore = createAsyncThunk(
  "quiz/fetchMyScore",
  async () => {
    const response = await fetchMyScore();
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserScore.fulfilled, (state, action) => {
      state.myScore = action.payload;
    });
  },
});

export const { setUserData, setLoading } = userSlice.actions;

export default userSlice.reducer;
