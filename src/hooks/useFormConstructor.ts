import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
const useFormConstructor = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const methods = useForm({});

  useEffect(()=>{
    const newStepId = `steps.0`;
    methods.register(newStepId);
    methods.setValue(newStepId, {
      completed: false,
      id: uuidv4(),
      order: 1,
    });
    console.log('effect')
    console.log(methods.getValues('steps'))
  }, [])

  function addStep() {
    const stepsAmount = methods.getValues("steps")?.length || 0;
    const newStepId = `steps.${stepsAmount}`;
    methods.register(newStepId);
    methods.setValue(newStepId, {
      completed: false,
      id: uuidv4(),
      order: stepsAmount+1,
    });
    setCurrentStepIndex(stepsAmount)
  }

  function addField(stepId: string) {
    const newStepId = `fields.${methods.getValues("fields")?.length || 0}`;
    methods.register(newStepId);
    methods.setValue(newStepId, {
      hasChildFields: false,
      id: uuidv4(),
      review: false,
      stepId: stepId,
      type: "text",
      validation: {
        required: false
      }
    });
  }

  function removeStep() {
    methods.unregister(`steps.${currentStepIndex}`)
    setCurrentStepIndex(index => index-1 > -1 ? index-1 : 0)
  }

  function removeField(fieldIndex: number) {
    methods.unregister(`fields.${fieldIndex}`)
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
    addField,
    removeStep,
    removeField,
    submit,
    currentStepIndex,
    methods
  };
};

export default useFormConstructor;
