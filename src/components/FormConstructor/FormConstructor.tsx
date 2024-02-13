import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import useFormConstructor from "../../hooks/useFormConstructor";
import StepInput from "../StepInput/StepInput";
import FieldSelector from "../FieldSelector/FieldSelector";
import Card from "../../shared/Card/Card";
import ButtonsGroup from "../../shared/ButtonsGroup/ButtonsGroup";
import Button from "../../shared/Button/Button";
import StepsTracker from "../StepsTracker/StepsTracker";
import iconTrashcan from "../../assets/Trash.svg";
import styles from "./FormConstructor.module.scss";
import preventFormSubmitByEnter from "../../utils/preventFormSubmitByEnter";
import { IStep } from "../../types/IStep";
import { IField } from "../../types/IField";

const FormConstructor = () => {
  const {
    submit,
    addStep,
    addField,
    removeStep,
    currentStepIndex,
    goTo,
    methods
  } = useFormConstructor();
  const step: IStep = methods.watch(`steps.${currentStepIndex}`);
const fields = methods.watch(`fields`);
console.log(step, fields)
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(submit)}
        onKeyDown={preventFormSubmitByEnter}
      >
        <StepsTracker
          isValid={true}
          steps={methods.watch('steps')}
          currentStepIndex={currentStepIndex}
          goTo={goTo}
          addStep={addStep}
        />
        {step && (
          <Card appearence="primary">
            <div key={step.id}>
              <div className={styles.title}>
                <h2>Step {step.order}</h2>
                <button
                  className={styles.delete_btn}
                  type="button"
                  onClick={() => removeStep()}
                  disabled={methods.watch('steps')?.length <= 1}
                >
                  <img src={iconTrashcan} alt="delete" />
                </button>
              </div>
              <StepInput
                id={`step.${currentStepIndex}.title`}
                label="Step title"
                required={true}
                placeholder="e.g. Contact Info"
              />
              <StepInput
                id={`step.${currentStepIndex}.name`}
                label="Step name"
                required={false}
                placeholder="e.g. Contacts"
              />
              <StepInput
                id={`step.${currentStepIndex}.description`}
                label="Step description"
                required={false}
                multiline={true}
                placeholder="e.g. Please provide your name, email address, and phone number."
              />
              {fields?.map((field: IField, i: number) => (
                field.stepId === step.id &&
                <FieldSelector
                  key={field.id}
                  step={step}
                  fieldId={`fields.${i}`}
                />
              ))}
              <Button
                name="Add Field"
                onClick={() => {
                  addField(step.id);
                }}
              />
            </div>
          </Card>
        )}
        <ButtonsGroup>
          <Button
            type="button"
            onClick={() => {}}
            name="Cancel"
            appearence="secondary"
          />
          <Button type="submit" name="Finish" appearence="accent" />
        </ButtonsGroup>
      </form>
    </FormProvider>
  );
};

export default FormConstructor;
