import { useEffect } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReset,
  useForm,
} from "react-hook-form";
import database from "../../firebase/firebaseInit";
import { ref, set } from "firebase/database";
import StepsTracker from "./StepsTracker";
import useMultistepForm from "../../hooks/useMultistepForm";
import { IAnswer } from "../../store/formTypes";
import StepContents from "./StepContents";
import Card from "../UI/Card";
import Button from "../UI/Button";
import "./MultistepForm.scss";

const MultistepForm = () => {
  const { steps, currentStepIndex, answers, stepFields, back, next, goTo } =
    useMultistepForm();
  const methods = useForm();
  const lastStepIndex = steps.length - 1;
  useResetAnswers(answers, methods.reset);

  const onSubmit: SubmitHandler<any> = (data) => {
    const dbRef = ref(database, "helga_chu/answers/olhachuryk");
    if (currentStepIndex < lastStepIndex) {
      next();
    } else {
      set(dbRef, data);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {/* <div className="form_contents"> */}
        <StepsTracker
          steps={steps}
          currentStepIndex={currentStepIndex}
          goTo={goTo}
        />
        <Card appearence="primary">
          <StepContents step={steps[currentStepIndex]} fields={stepFields} />
        </Card>
        {/* </div> */}
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
            appearence={currentStepIndex < lastStepIndex ? "primary" : "accent"}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default MultistepForm;

function useResetAnswers(answers: IAnswer, reset: UseFormReset<FieldValues>) {
  useEffect(() => {
    if (typeof answers === "string") return; //do nothing if "answers" are empty ()
    //else set form answers entered earlier;
    reset(answers, { keepIsSubmitted: true });
    //TODO: implement restriction of multiple form submittions
  }, [answers, reset]);
}
