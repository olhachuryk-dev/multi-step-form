import React, { useMemo } from "react";
import { IStep } from "../../types/IStep";
import Panel from "../../shared/Panel/Panel";
import styles from "./StepsTracker.module.scss";
import { useFormContext } from "react-hook-form";
import Button from "../../shared/Button/Button";

type Props = {
  isValid: boolean;
  steps: IStep[];
  currentStepIndex: number;
  goTo: (index: number) => void;
  addStep?: () => void;
};

const StepsTracker: React.FC<Props> = ({
  isValid,
  steps,
  currentStepIndex,
  goTo,
  addStep,
}) => {
  const { formState, trigger } = useFormContext();
  const enabledStepLastIndex = useMemo(
    () => steps.findIndex((step: IStep) => step.completed === false),
    [steps]
  );

  function forceValidation(callbackForValid: () => void, gotoIndex?: number) {
    trigger();
    if (
      !addStep
        ? (gotoIndex ?? 0) > enabledStepLastIndex || !formState.isValid
        : !formState.isValid
    ) {
      return;
    }
    callbackForValid();
  }

  function stepClickHandler(stepIndex: number) {
    forceValidation(() => goTo(stepIndex), stepIndex);
  }

  return (
    <Panel>
      {isValid ? (
        <>
          {steps.map((step, index) => (
            <div key={step.id} className={styles.tracker_wrapper}>
              <button
                type="button"
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
          ))}
          {addStep && (
            <Button
              name="Add step"
              appearence="accent"
              onClick={() => forceValidation(addStep)}
            />
          )}
        </>
      ) : (
        <></>
      )}
    </Panel>
  );
};

export default StepsTracker;
