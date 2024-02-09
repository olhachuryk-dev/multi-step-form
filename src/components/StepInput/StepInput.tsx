import React from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import ValidationMsg from "../../shared/ValidationMsg/ValidationMsg";
import styles from "./StepInput.module.scss";

type Props = {
  id: string;
  label: string;
  required: boolean;
  placeholder?: string;
  multiline?: boolean;
};

const StepInput: React.FC<Props> = ({
  label,
  required,
  id,
  placeholder = "Some text",
  multiline = false,
}) => {
  const {
    formState: { errors },
    register,
  } = useFormContext();
  return (
    <div className={styles.input_container}>
      <label htmlFor={id}>
        {label}
        {required ? "*" : ""}
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
            required: required && "Required",
            minLength: 1,
          })}
        />
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          {...register(id, {
            required: required && "Required",
            minLength: 1,
          })}
        />
      )}
    </div>
  );
};

export default StepInput;
