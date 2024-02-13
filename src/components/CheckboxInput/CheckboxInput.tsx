import React from "react";
import { IField } from "../../types/IField";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Fieldset from "../../shared/Fieldset/Fieldset";
import ValidationMsg from "../../shared/ValidationMsg/ValidationMsg";
import styles from "./CheckboxInput.module.scss";

const CheckboxInput: React.FC<IField> = ({
  id,
  label,
  options,
  validation,
}) => {
  const {
    register,
    formState: { errors },
    watch
  } = useFormContext();
  const checkedInputs = watch(id) || [""]
  return (
    <>
      <Fieldset legend={label} id={id}>
        <>
          {options?.map((option) => {
            return (
              <div
                key={option.label}
                className={`${styles.check_option} ${
                  checkedInputs.includes(option.label)
                    ? styles.input_checked
                    : ""
                }`}
              >
                <div className={styles.icon}></div>
                <div className={styles.input_wrapper}>
                  <input
                    type="checkbox"
                    id={option.id}
                    value={option.label}
                    {...register(id, {
                      required: validation?.required,
                      disabled: validation?.disabled,
                    })}
                  />
                  <label htmlFor={option.id}>{option.label}</label>
                  <p>{option.description}</p>
                </div>
              </div>
            );
          })}
        </>
      </Fieldset>
      <ErrorMessage
        errors={errors}
        name={id}
        render={({ message }) => <ValidationMsg message={message} />}
      />
    </>
  );
};

export default CheckboxInput;
