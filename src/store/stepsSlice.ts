import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IStep } from "./formTypes";
import { RootState } from "./store";
import { getStepsData } from "../firebase/getFormData";
import { RequestStatus } from "./formTypes";

const initialState: {
  data: IStep[];
  status: RequestStatus;
  error: string;
} = {
  data: [],
  status: RequestStatus.IDLE,
  error: "",
};

export const fetchSteps = createAsyncThunk("steps/fetchSteps", getStepsData);

const stepsSlice = createSlice({
  name: "steps",
  initialState,
  reducers: {
    completeStep: (state, action: PayloadAction<{ stepIndex: number }>) => {
      const { stepIndex } = action.payload;
      state.data[stepIndex].completed = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSteps.pending, (state, action) => {
        state.status = RequestStatus.LOADING;
      })
      .addCase(fetchSteps.fulfilled, (state, action) => {
        state.status = RequestStatus.SUCCESS;
        const reviewStep: IStep = {
          id: "review_form",
          description: "Double-check everything looks OK before confirming.",
          name: "Summary",
          title: "Finishing up",
          order: parseInt(action.payload.length) + 1,
          completed: false,
        };
        state.data = action.payload.concat(reviewStep);
      })
      .addCase(fetchSteps.rejected, (state, action) => {
        state.error = action.error.message || "";
      });
  },
});

export const { completeStep } = stepsSlice.actions;

export const selectAllSteps = (state: RootState) => state.steps.data;

export default stepsSlice.reducer;
