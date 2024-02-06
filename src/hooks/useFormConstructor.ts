import { useState, useMemo, useEffect } from "react";
import { IStep } from "../redux/formTypes";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
// import { setFormStructure } from "../firebase/setFormData";
import { createStep, deleteStep, selectAllSteps } from "../redux/stepsSlice";
import { selectStepFields } from "../redux/fieldsSlice";
import { FieldValues } from "react-hook-form";

const useFormConstructor = () => {
  const dispatch = useAppDispatch();
  const steps = useAppSelector(selectAllSteps);
  useEffect(() => {
    if (steps.length === 0) {
      dispatch(createStep({ isFirstStep: true }));
    }
  }, [steps, dispatch]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = useMemo<IStep>(
    () => steps[currentStepIndex],
    [currentStepIndex, steps]
  );
  const stepFields = useAppSelector(selectStepFields(currentStep?.id));

  function back() {
    setCurrentStepIndex((step) => step - 1);
  }

  function addStep() {
    dispatch(createStep());
    setCurrentStepIndex(steps.length);
  }

  function removeStep(index: number) {
    if (currentStepIndex === index)
      setCurrentStepIndex((i) => (i === 0 ? 1 : i - 1));
    dispatch(deleteStep({ stepIndex: index }));
  }

  function goTo(index: number) {
    setCurrentStepIndex(index);
  }

  function submit(data: FieldValues) {
    //TODO: transform data to IMultistepForm type;
    /*
    [
      {
        stepId: 
      } 
    ]
    */
    console.log(data);
    const constructorData = {};
    // setFormStructure("chubaka", data);
  }
  return {
    back,
    addStep,
    removeStep,
    goTo,
    submit,
    steps,
    currentStepIndex,
    currentStep,
    stepFields,
  };
};

export default useFormConstructor;
