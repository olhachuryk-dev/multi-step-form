import React, { useMemo } from "react";
import { IStep } from "../../types/IStep";
import Panel from "../../shared/Panel/Panel";
import styles from "./StepsTracker.module.scss";
import { useFormContext } from "react-hook-form";

type Props = {
  isValid: boolean;
  steps: IStep[];
  currentStepIndex: number;
  goTo: (index: number) => void;
};

const StepsTracker: React.FC<Props> = ({
  isValid,
  steps,
  currentStepIndex,
  goTo,
}) => {
  const { formState } = useFormContext();
  const enabledStepLastIndex = useMemo(
    () => steps.findIndex((step: IStep) => step.completed === false),
    [steps]
  );

  function stepClickHandler(index: number) {
    goTo(index);
  }

  return (
    <Panel>
      {isValid ? (
        steps.map((step, index) => (
          <div key={step.id} className={styles.tracker_wrapper}>
            <button
              type="button"
              disabled={index > enabledStepLastIndex || !formState.isValid}
              onClick={() => stepClickHandler(index)}
              className={`${styles.tracker_button} ${
                currentStepIndex === index ? styles.active : ""
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
    </Panel>
  );
};

export default StepsTracker;
