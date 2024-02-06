import { configureStore } from "@reduxjs/toolkit";
import fieldsReducer from "./fieldsSlice";
import stepsReducer from "./stepsSlice";
import answersReducer from "./answersSlice";

const store = configureStore({
  reducer: {
    fields: fieldsReducer,
    steps: stepsReducer,
    answers: answersReducer,
  },
});

export default store;

/*extract the RootState type and the Dispatch type 
 so that they can be referenced as needed.
 Inferring these types from the store itself 
 means that they correctly update as you add more
 state slices or modify middleware settings.*/

export type RootState = ReturnType<typeof store.getState>;

/*For useDispatch, the default Dispatch type does not
 know about thunks or other middleware.
 To correctly dispatch thunks, you need to use
 the specific customized AppDispatch type from 
 the store that includes the thunk middleware types,
 and use that with useDispatch.*/
export type AppDispatch = typeof store.dispatch;
