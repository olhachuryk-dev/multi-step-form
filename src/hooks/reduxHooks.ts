import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch;

//Adding a pre-typed useDispatch hook keeps you from forgetting to import AppDispatch where it's needed.
export const useAppDispatch: DispatchFunc = useDispatch;

// It saves you the need to type (state: RootState) each time u use useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
