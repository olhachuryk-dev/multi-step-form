import {
  FormProvider,
} from "react-hook-form";
import useFormConstructor from "../../hooks/useFormConstructor";
import ButtonsGroup from "../../shared/ButtonsGroup/ButtonsGroup";
import Button from "../../shared/Button/Button";
import StepsTracker from "../StepsTracker/StepsTracker";
import preventFormSubmitByEnter from "../../utils/preventFormSubmitByEnter";
import StepConstructor from "../StepConstructor/StepConstructor";


const FormConstructor = () => {
  const {
    goTo,
    removeFieldById,
    addField,
    addStep,
    steps,
    fields,
    removeCurrentStep,
    submit,
    currentStepIndex,
    methods   
  } = useFormConstructor();
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
        <StepConstructor
          steps={steps}
          fields={fields}
          addField={addField}
          removeFieldById={removeFieldById}
          removeStep={removeCurrentStep}
          currentStepIndex={currentStepIndex}
        />
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
