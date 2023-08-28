import React, { useMemo } from "react";
import { IStep } from "../../store/formTypes";
import "./StepsTracker.scss";

type Props = {
  steps: IStep[];
  currentStepIndex: number;
  goTo: (index: number) => void;
}

const StepsTracker = (props: Props) => {
  const { steps, currentStepIndex, goTo } = props;

  const enabledStepLastIndex = useMemo(
    () => steps.findIndex((step: IStep) => step.completed === false),
    [steps]
  );

  function stepClickHandler(index: number) {
    goTo(index);
  }

  return (
    <div className="tracker_container">
      {steps.map((step, index) => (
        <button 
          disabled={index > enabledStepLastIndex}
          onClick={() => stepClickHandler(index)}
          className={`tracker_button ${currentStepIndex === index ? "active" : ""}`}
          key={step.id}
          aria-hidden={true}
        >
          {step.order}
        </button>
      ))}
    </div>
  );
};

export default StepsTracker;
