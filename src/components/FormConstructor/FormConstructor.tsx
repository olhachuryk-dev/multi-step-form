import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import useFormConstructor from "../../hooks/useFormConstructor";
import StepTitleInput from "../StepTItleInput/StepTitleInput";
import FieldSelector from "../FieldSelector/FieldSelector";
import Card from "../../shared/Card/Card";
import ButtonsGroup from "../../shared/ButtonsGroup/ButtonsGroup";
import Button from "../../shared/Button/Button";
import Panel from "../../shared/Panel/Panel";
import iconTrashcan from "../../assets/Trash.svg";
import styles from "./FormConstructor.module.scss";
import Spacer from "../../shared/Spacer/Spacer";

const FormConstructor = () => {
  const { submit, addStep, removeStep, steps } = useFormConstructor();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    submit(data);
  };
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Panel>
          <Button name="Add step" appearence="accent" />
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
                <StepTitleInput
                  step={step}
                  label="title"
                  currentStepIndex={i}
                  required={true}
                  placeholder="e.g. Contact Info"
                />
                <StepTitleInput
                  step={step}
                  label="name"
                  currentStepIndex={i}
                  required={false}
                  placeholder="Shortened title"
                />
                <StepTitleInput
                  step={step}
                  label="description"
                  currentStepIndex={i}
                  required={false}
                  multiline={true}
                  placeholder="e.g. Please provide your name, email address, and phone number."
                />
                <FieldSelector
                  step={step}
                  fieldIndex={0}
                  currentStepIndex={i}
                />
              </div>
            ))}
          </>
          <Spacer size={20} />
          <Button name="Add" onClick={addStep} />
          <Spacer size={20} />
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
