import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import {
  completeStep,
  createStep,
  deleteStep,
  selectAllSteps,
} from "../store/stepsSlice";
import { FieldValues } from "react-hook-form";
import {
  addNewField,
  selectAllFields,
  selectStepFields,
} from "../store/fieldsSlice";

const useFormConstructor = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const dispatch = useAppDispatch();
  const steps = useAppSelector(selectAllSteps);
  const fields = useAppSelector(selectAllFields);
  const stepFields = useAppSelector(
    selectStepFields(steps[currentStepIndex]?.id)
  );
  useEffect(() => {
    dispatch(createStep({ isFirstStep: true }));
  }, []);

  function addStep() {
    dispatch(createStep());
  }

  function addField(stepId: string) {
    dispatch(addNewField({ stepId }));
  }

  function removeStep(index: number) {
    dispatch(deleteStep({ stepIndex: index }));
  }

  function finishStep() {
    dispatch(completeStep({ stepIndex: currentStepIndex }));
  }
  function back() {
    setCurrentStepIndex((step) => step - 1);
  }

  function next() {
    finishStep();
    setCurrentStepIndex((step) => step + 1);
  }

  function goTo(index: number) {
    setCurrentStepIndex(index);
  }

  function submit(data: FieldValues) {
    finishStep();
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
    finishStep,
    back,
    next,
    goTo,
    addStep,
    removeStep,
    addField,
    submit,
    steps,
    fields,
    currentStepIndex,
    stepFields,
  };
};

export default useFormConstructor;
