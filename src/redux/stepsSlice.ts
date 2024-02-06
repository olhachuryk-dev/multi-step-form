import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
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

export const fetchSteps = createAsyncThunk(
  "steps/fetchSteps",
  async (formId: string) => {
    const response = await getStepsData(formId);
    return response;
  }
);

const stepsSlice = createSlice({
  name: "steps",
  initialState,
  reducers: {
    completeStep: (state, action: PayloadAction<{ stepIndex: number }>) => {
      const { stepIndex } = action.payload;
      state.data[stepIndex].completed = true;
    },
    createStep: (
      state,
      action: PayloadAction<{ isFirstStep: boolean } | undefined>
    ) => {
      const newStep: IStep = {
        id: uuidv4(),
        order: state.data.length + 1,
        completed: false,
        name: "",
        description: "",
        title: "",
      };
      if (action.payload?.isFirstStep === true)
        //for entirely empty form construction
        state.data = [{ ...newStep, order: 1 }];
      else state.data.push(newStep);
    },
    deleteStep: (state, action: PayloadAction<{ stepIndex: number }>) => {
      const { stepIndex } = action.payload;
      state.data.splice(stepIndex, 1);
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
          order: parseInt(action?.payload?.length) + 1,
          completed: false,
        };
        if (action.payload.length > 0) {
          state.data = action.payload?.concat(reviewStep);
        } //if else -  this form doesn't exist
      })
      .addCase(fetchSteps.rejected, (state, action) => {
        state.error = action.error.message || "";
      });
  },
});

export const { completeStep, createStep, deleteStep } = stepsSlice.actions;

export const selectAllSteps = (state: RootState) => state.steps.data;

export default stepsSlice.reducer;
