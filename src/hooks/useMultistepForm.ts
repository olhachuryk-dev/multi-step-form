import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { completeStep, fetchSteps, selectAllSteps } from "../store/stepsSlice";
import { fetchFields, selectStepFields } from "../store/fieldsSlice";
import { fetchAnswers, selectAllAnswers } from "../store/answersSlice";
import { IAnswer } from "../store/formTypes";
import { setFormAnswers } from "../firebase/setFormData";

const useMultistepForm = (formId: string, userId: string) => {
  const fieldsStatus = useAppSelector((state) => state.fields.status);
  const stepsStatus = useAppSelector((state) => state.steps.status);
  const answersStatus = useAppSelector((state) => state.answers.status);
  const steps = useAppSelector(selectAllSteps);
  const answers = useAppSelector(selectAllAnswers);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const stepFields = useAppSelector(
    selectStepFields(steps[currentStepIndex]?.id)
  );
  const isValid = useMemo(() => steps.length > 1, [steps]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (fieldsStatus === "idle") {
      dispatch(fetchFields(formId));
    }
    if (stepsStatus === "idle") {
      dispatch(fetchSteps(formId));
    }
    if (answersStatus === "idle") {
      dispatch(fetchAnswers({ formId, userId }));
    }
  }, [fieldsStatus, stepsStatus, answersStatus, dispatch, formId, userId]);

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
    setFormAnswers(formId, userId, data);
  }

  return {
    isValid, // not === 0 because completion step is added automatically
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
