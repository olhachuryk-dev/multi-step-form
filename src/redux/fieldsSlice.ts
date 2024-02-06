import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IField, IFieldOption } from "./formTypes";
import { RootState } from "./store";
import { getFieldsData } from "../firebase/getFormData";
import { RequestStatus } from "./formTypes";

const initialState: {
  data: IField[];
  status: RequestStatus;
  error: string;
} = {
  data: [],
  status: RequestStatus.IDLE,
  error: "",
};

export const fetchFields = createAsyncThunk(
  "fields/fetchFields",
  async (formId: string) => {
    const response = await getFieldsData(formId);
    return response;
  }
);

const fieldsSlice = createSlice({
  name: "fields",
  initialState: initialState,
  reducers: {
    addNewField: (
      state,
      action: PayloadAction<{
        field: IField;
      }>
    ) => {
      state.data.push({ ...action.payload.field, id: "" });
    },
    addFieldOptions: () => {},
    displayChildFields: (
      state,
      action: PayloadAction<{
        parentFieldId: string;
        toggledOption: IFieldOption | undefined;
      }>
    ) => {
      const { parentFieldId, toggledOption } = action.payload;
      const childFields = state.data.filter(
        (field) => field.parentField?.parentFieldId === parentFieldId
      );
      if (childFields) {
        childFields.forEach((field) => {
          return field.parentField
            ? (field.parentField.display =
                field.parentField?.parentOptionId === toggledOption?.id)
            : field;
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFields.pending, (state, action) => {
        state.status = RequestStatus.LOADING;
      })
      .addCase(fetchFields.fulfilled, (state, action) => {
        state.status = RequestStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(fetchFields.rejected, (state, action) => {
        state.status = RequestStatus.FAILED;
        state.error = action.error.message || "";
      });
  },
});

export const { displayChildFields } = fieldsSlice.actions;

export const selectAllFields = (state: RootState) => state.fields.data;
export const selectStepFields = (stepId: string) => (state: RootState) => {
  if (!Array.isArray(state.fields.data) || state.fields.data.length === 0) return [] as IField[];
  return state.fields.data.filter((field) => field.stepId === stepId);
};

export default fieldsSlice.reducer;
