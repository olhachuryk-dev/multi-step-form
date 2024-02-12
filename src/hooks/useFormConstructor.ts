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
    setCurrentStepIndex(index => index + 1)
  }

  function addField(stepId: string) {
    dispatch(addNewField({ stepId }));
  }

  function removeStep(index: number) {
    setCurrentStepIndex(Math.max(0, currentStepIndex - 1));
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
