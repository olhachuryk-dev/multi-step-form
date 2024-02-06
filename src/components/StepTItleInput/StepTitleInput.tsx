import React from "react";
import { useFormContext } from "react-hook-form";
import { IStep } from "../../redux/formTypes";
import { ErrorMessage } from "@hookform/error-message";
import ValidationMsg from "../../shared/ValidationMsg/ValidationMsg";
import styles from "./StepTitleInput.module.scss";

type Props = {
  step: IStep;
  label: "title" | "name" | "description";
  currentStepIndex: number;
  required: boolean;
  placeholder?: string;
  multiline?: boolean;
};

const StepTitleInput: React.FC<Props> = ({
  step,
  label,
  currentStepIndex,
  required,
  placeholder = "Some text",
  multiline = false,
}) => {
  const {
    formState: { errors },
    register,
  } = useFormContext();
  const id = `${step.id}.${label}`;
  return (
    <div className={styles.input_container}>
      <label htmlFor={id}>
        Step {label} {required ? "*" : ""}
      </label>
      <ErrorMessage
        errors={errors}
        name={id}
        render={({ message }) => <ValidationMsg message={message} />}
      />
      {multiline ? (
        <textarea
          placeholder={placeholder}
          {...register(id, {
            required: required,
            minLength: 1,
          })}
        />
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          {...register(id, {
            required: required ? "Required" : false,
            minLength: 1,
          })}
        />
      )}
    </div>
  );
};

export default StepTitleInput;
