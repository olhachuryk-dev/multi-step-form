import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { getUserAnswerData } from "../services/firebase/getFormData";
import { IAnswer } from "../types/IAnswer";
import  RequestStatus  from "../types/requestStatus";

const initialState: {
  data: IAnswer;
  status: RequestStatus;
  error: string;
} = {
  data: {},
  status: RequestStatus.IDLE,
  error: "",
};

export const fetchAnswers = createAsyncThunk(
  "answers/fetchAnswers",
  async ({ formId, userId }: { formId: string; userId: string }) => {
    const response = await getUserAnswerData({ formId, userId });
    return response;
  }
);

const answersSlice = createSlice({
  name: "answers",
  initialState: initialState,
  reducers: {},
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
