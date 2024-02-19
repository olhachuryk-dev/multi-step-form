import React from "react";
import Card from "../../shared/Card/Card";
import StepInput from "../StepInput/StepInput";
import FieldSelector from "../FieldSelector/FieldSelector";
import Button from "../../shared/Button/Button";
import { IField } from "../../types/IField";
import { IStep } from "../../types/IStep";
import iconTrashcan from "../../assets/Trash.svg";
import styles from "./StepConstructor.module.scss";

type Props = {
  currentStepIndex: number;
  steps: IStep[];
  fields: IField[];
  removeFieldById: (id: string) => void;
  addField: (stepId: string) => void;
  removeStep: () => void;
}

const StepConstructor: React.FC<Props> = ({ currentStepIndex,
  steps,
  fields,
  removeFieldById,
  addField, 
  removeStep
}) => {
  const step = steps[currentStepIndex];
  return (
    <Card appearence="primary" padding="medium">
      {step && <div key={step.id}>
        <div className={styles.title}>
          <h2>Step {currentStepIndex+1}</h2>
          <button className={styles.delete_btn} type="button" onClick={() => removeStep()} disabled={steps.length <= 1}>
            <img src={iconTrashcan} alt="delete" />
          </button>
        </div>
        <StepInput id={`steps.${currentStepIndex}.title` as const} label="Step title" required={true} placeholder="e.g. Contact Info" />
        <StepInput id={`steps.${currentStepIndex}.name` as const} label="Step name" required={false} placeholder="e.g. Contacts" />
        <StepInput id={`steps.${currentStepIndex}.description` as const} label="Step description" required={false} multiline={true} placeholder="e.g. Please provide your name, email address, and phone number." />
        {fields?.map(
          (field: IField, i: number) => field.stepId === step.id &&<Card appearence="secondary" key={field.id} padding="small">
            <FieldSelector key={field.id} step={step} fieldId={`fields.${i}`} />
            <Button name="Remove Field" onClick={() => { removeFieldById(field.id) }} />
          </Card>
        )}
        <Button name="Add Field" onClick={() => { addField(step.id) }} />
      </div>
      }
    </Card>
  );
}

export default StepConstructor;