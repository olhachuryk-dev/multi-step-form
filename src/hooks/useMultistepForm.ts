import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import database from "../firebase/firebaseInit";
import { ref, set } from "firebase/database";
import { completeStep, fetchSteps, selectAllSteps } from "../store/stepsSlice";
import { fetchFields, selectStepFields } from "../store/fieldsSlice";
import { fetchAnswers, selectAllAnswers } from "../store/answersSlice";
import { IAnswer } from "../store/formTypes";

const useMultistepForm = () => {
  const fieldsStatus = useAppSelector((state) => state.fields.status);
  const stepsStatus = useAppSelector((state) => state.steps.status);
  const answersStatus = useAppSelector((state) => state.answers.status);
  const steps = useAppSelector(selectAllSteps);
  const answers = useAppSelector(selectAllAnswers);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const stepFields = useAppSelector(
    selectStepFields(steps[currentStepIndex]?.id)
  );
  const dbRef = ref(database, "helga_chu/answers/olhachuryk");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (fieldsStatus === "idle") {
      dispatch(fetchFields());
    }
    if (stepsStatus === "idle") {
      dispatch(fetchSteps());
    }
    if (answersStatus === "idle") {
      dispatch(fetchAnswers());
    }
  }, [fieldsStatus, stepsStatus, answersStatus, dispatch]);

  function back() {
    setCurrentStepIndex((step) => step - 1);
  }

  function next() {
    dispatch(completeStep({ stepIndex: currentStepIndex }));
    setCurrentStepIndex((step) => step + 1);
  }

  function goTo(index: number) {
    setCurrentStepIndex(index);
  }

  function submit(data: IAnswer) {
    dispatch(completeStep({ stepIndex: currentStepIndex }));
    set(dbRef, data);
  }

  return {
    steps,
    currentStepIndex,
    stepFields,
    answers,
    back,
    next,
    goTo,
    submit,
  };
};

export default useMultistepForm;
