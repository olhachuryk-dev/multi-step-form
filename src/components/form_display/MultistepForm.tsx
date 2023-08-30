import { useEffect } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReset,
  useForm,
} from "react-hook-form";
import StepsTracker from "./StepsTracker";
import useMultistepForm from "../../hooks/useMultistepForm";
import { IAnswer } from "../../store/formTypes";
import StepContents from "./StepContents";
import Card from "../UI/Card";
import Button from "../UI/Button";
import "./MultistepForm.scss";

const MultistepForm = () => {
  const {
    steps,
    currentStepIndex,
    answers,
    stepFields,
    back,
    next,
    goTo,
    submit,
  } = useMultistepForm();
  const methods = useForm();

  useResetAnswers(answers, methods.reset);

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
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <StepsTracker
          steps={steps}
          currentStepIndex={currentStepIndex}
          goTo={goTo}
        />
        <Card appearence="primary">
          <StepContents step={steps[currentStepIndex]} fields={stepFields} />
        </Card>
        {currentStepIndex === lastStepIndex &&
        steps[currentStepIndex].completed === true ? (
          <></>
        ) : (
          <div className="buttons_container">
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
          </div>
        )}
      </form>
    </FormProvider>
  );
};

export default MultistepForm;

function useResetAnswers(answers: IAnswer, reset: UseFormReset<FieldValues>) {
  useEffect(() => {
    if (typeof answers === "string") return; //do nothing if "answers" are empty ()
    //else set form answers entered earlier;
    reset(answers);
  }, [answers, reset]);
}
