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
import Panel from "../../shared/Panel/Panel";
import iconTrashcan from "../../assets/Trash.svg";
import styles from "./FormConstructor.module.scss";

const FormConstructor = () => {
  const {
    submit,
    addStep,
    addField,
    removeStep,
    currentStepIndex,
    back,
    next,
    goTo,
    steps,
    stepFields,
  } = useFormConstructor();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    submit(data);
  };
  const methods = useForm();
  stepFields.forEach((field) => {
    console.log(field);
  });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Panel>
          <div className={styles.addStep_btn}>
            <Button name="Add step" appearence="accent" onClick={addStep} />
          </div>
        </Panel>
        <Card appearence="primary">
          <>
            {steps.map((step, i) => (
              <div key={step.id}>
                <div className={styles.title}>
                  <h2>Step {step.order}</h2>
                  <button
                    className={styles.delete_btn}
                    type="button"
                    onClick={() => removeStep(i)}
                    disabled={steps.length <= 1}
                  >
                    <img src={iconTrashcan} alt="delete" />
                  </button>
                </div>
                <StepInput
                  id={`${step.id}.title`}
                  label="Step title"
                  required={true}
                  placeholder="e.g. Contact Info"
                />
                <StepInput
                  id={`${step.id}.name`}
                  label="Step name"
                  required={false}
                  placeholder="e.g. Contacts"
                />
                <StepInput
                  id={`${step.id}.description`}
                  label="Step description"
                  required={false}
                  multiline={true}
                  placeholder="e.g. Please provide your name, email address, and phone number."
                />
                {stepFields.map((field) => (
                  <FieldSelector
                    key={field.id}
                    step={step}
                    fieldId={`${step.id}.fields.${field.id}`}
                  />
                ))}
                <Button
                  name="Add Field"
                  onClick={() => {
                    console.log("add step");
                    addField(step.id);
                  }}
                />
              </div>
            ))}
          </>
        </Card>
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
