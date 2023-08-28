import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { getUserAnswerData } from "../firebase/getFormData";
import { RequestStatus } from "./formTypes";

const initialState: {
  data: { [char: string]: string };
  status: RequestStatus;
  error: string;
} = {
  data: {},
  status: RequestStatus.IDLE,
  error: "",
};

export const fetchAnswers = createAsyncThunk(
  "answers/fetchAnswers",
  getUserAnswerData
);

const answersSlice = createSlice({
  name: "answers",
  initialState: initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnswers.pending, (state, action) => {
        state.status = RequestStatus.LOADING;
      })
      .addCase(fetchAnswers.fulfilled, (state, action) => {
        state.status = RequestStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(fetchAnswers.rejected, (state, action) => {
        state.status = RequestStatus.FAILED;
        state.error = action.error.message || "";
      });
  },
});

export const selectAllAnswers = (state: RootState) => state.answers.data;
export const selectFieldAnswer = (fieldId: string) => (state: RootState) =>
  state.answers.data[fieldId];
export default answersSlice.reducer;
