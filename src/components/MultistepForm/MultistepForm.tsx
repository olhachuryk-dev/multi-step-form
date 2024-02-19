import React from "react";
import {
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import StepsTracker from "../StepsTracker/StepsTracker";
import useMultistepForm from "../../hooks/useMultistepForm";
import { IAnswer } from "../../types/IAnswer";
import StepContents from "../StepContents/StepContents";
import Card from "../../shared/Card/Card";
import Button from "../../shared/Button/Button";
import ButtonsGroup from "../../shared/ButtonsGroup/ButtonsGroup";
import preventFormSubmitByEnter from "../../utils/preventFormSubmitByEnter";

type Props = {
  formId: string;
  userId: string;
};

const MultistepForm: React.FC<Props> = ({ formId, userId }) => {
  const {
    isValid,
    steps,
    answers,
    stepFields,
    currentStepIndex,
    back,
    next,
    goTo,
    submit,
  } = useMultistepForm(formId, userId);
  const methods = useForm({
    values: answers
  });

  const lastStepIndex = steps.length - 1;
  const onSubmit: SubmitHandler<IAnswer> = (data) => {
    if (currentStepIndex < lastStepIndex) {
      next();
    } else {
      submit(data);
    }
  };
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        onKeyDown={preventFormSubmitByEnter}
      >
        <StepsTracker
          isValid={isValid}
          steps={steps}
          currentStepIndex={currentStepIndex}
          goTo={goTo}
        />
        <Card appearence="primary" padding="medium">
          <StepContents
            step={steps[currentStepIndex]}
            fields={stepFields}
            isValid={isValid}
          />
        </Card>
        {(currentStepIndex === lastStepIndex &&
          steps[currentStepIndex].completed === true) ||
        !isValid ? (
          <></>
        ) : (
          <ButtonsGroup>
            <Button
              type="button"
              onClick={back}
              name="Go Back"
              appearence="secondary"
              visible={currentStepIndex > 0}
            />
            <Button
              type="submit"
              name={currentStepIndex < lastStepIndex ? "Next Step" : "Confirm"}
              appearence={
                currentStepIndex < lastStepIndex ? "primary" : "accent"
              }
            />
          </ButtonsGroup>
        )}
      </form>
    </FormProvider>
  );
};

export default MultistepForm;
