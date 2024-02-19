import { useState } from "react";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { IStep } from "../types/IStep";
import { IField } from "../types/IField";
const useFormConstructor = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const methods = useForm(
  {
    defaultValues: {
      steps: [
        {
          completed: false,
          id: uuidv4(),
          order: 1,
        }
      ] as IStep[],
      fields: [] as IField[]
    }
  });

  const { fields: steps, append: appendStep, remove: removeStep } = useFieldArray({
    control: methods.control,
    name: 'steps',
  })
  const { fields, append: appendField, remove: removeField } = useFieldArray({
    control: methods.control,
    name: 'fields',
  })

  const addStep = () => {
    const stepsAmount = steps.length;
    appendStep({
      completed: false,
      id: uuidv4(),
      order: stepsAmount + 1,
    });
    setCurrentStepIndex(stepsAmount)
  };
  
  const removeCurrentStep = () => {
    const stepId = steps[currentStepIndex].id;
    const stepFieldsIndexArray: number[] = [];
    fields.forEach((field, i) => {
      if (field.stepId === stepId) stepFieldsIndexArray.push(i)
    });
    removeField(stepFieldsIndexArray);
    removeStep(currentStepIndex);
    setCurrentStepIndex(index => index > 0 ? index - 1 : 0);
  };

  const addField = (stepId: string) => {
    appendField({
      hasChildFields: false,
      label: "",
      id: uuidv4(),
      review: false,
      stepId: stepId,
      type: "text",
      validation: {
        required: '',
      }
    }
    )
  }

  const removeFieldById = (id: string) => {
    const index = fields.findIndex((field) => {
      return field.id === id
    });
    if (index !== -1) {
      removeField(index);
    }
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
    // const constructorData = {};
    // setFormStructure("chubaka", data);
  }

  return {
    goTo,
    removeFieldById,
    addField,
    addStep,
    removeCurrentStep,
    submit,
    steps,
    fields,
    currentStepIndex,
    methods
  };
};

export default useFormConstructor;
