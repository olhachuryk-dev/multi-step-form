import React, { useMemo } from "react";
import { IStep } from "../../../store/formTypes";
import "./StepsTracker.scss";

type Props = {
  steps: IStep[];
  currentStepIndex: number;
  goTo: (index: number) => void;
};

const StepsTracker = ({ steps, currentStepIndex, goTo }: Props) => {
  const enabledStepLastIndex = useMemo(
    () => steps.findIndex((step: IStep) => step.completed === false),
    [steps]
  );

  function stepClickHandler(index: number) {
    goTo(index);
  }

  return (
    <div className="tracker_container">
      {steps.length > 1 ? (
        steps.map((step, index) => (
          <div key={step.id}>
            <button
              type="button"
              disabled={index > enabledStepLastIndex}
              onClick={() => stepClickHandler(index)}
              className={`tracker_button ${
                currentStepIndex === index ? "active" : ""
              }`}
              aria-hidden="true"
            >
              {step.order}
            </button>
            <span>Step {step.order}</span>
            <span>{step.name}</span>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default StepsTracker;
