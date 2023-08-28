import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import StepsTracker from "./StepsTracker";
import useMultistepForm from "../../hooks/useMultistepForm";
import StepContents from "./StepContents";
import Card from "../UI/Card";
import database from "../../firebase/firebaseInit";
import Button from "../UI/Button";
import { ref, set } from "firebase/database";
import "./MultistepForm.scss";

const MultistepForm = () => {
  const { steps, currentStepIndex, answers, stepFields, back, next, goTo } =
    useMultistepForm();

  const methods = useForm();

  const lastStepIndex = steps.length - 1;

  useEffect(() => {
    if (typeof answers === "string") return;
    methods.reset(answers);
  }, [answers, methods]);

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
        <div className="form_contents">
          <StepsTracker
            steps={steps}
            currentStepIndex={currentStepIndex}
            goTo={goTo}
          />
          <Card appearence="primary">
            <StepContents step={steps[currentStepIndex]} fields={stepFields} />
          </Card>
        </div>
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
