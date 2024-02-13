import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { IField } from "../../types/IField";
import useSetDefaultChoice from "../../hooks/useSetDefaultChoice";
import Fieldset from "../../shared/Fieldset/Fieldset";
import ValidationMsg from "../../shared/ValidationMsg/ValidationMsg";
import styles from "./RadioInput.module.scss";

const RadioInput: React.FC<IField> = ({ id, label, options, validation }) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();
  useSetDefaultChoice(id, options?.[0].label || "");

  return (
    <>
      <Fieldset legend={label} id={id}>
        <>
          {options?.map((option) => {
            return (
              <div
                key={option.label}
                className={`${styles.radio_option} ${
                  watch(id) === option.label ? styles.input_checked : ""
                }`}
              >
                {option.icon ? (
                  <img src={option.icon} alt={option.label} />
                ) : (
                  <div className={styles.default_icon}>
                    <div></div>
                  </div>
                )}
                <div>
                  <label htmlFor={option.label}>{option.label}</label>
                  <p>{option.description}</p>
                  <input
                    type="radio"
                    id={option.label}
                    value={option.label}
                    {...register(id, {
                      required: validation?.required,
                      disabled: validation?.disabled,
                      value: validation?.value,
                    })}
                  />
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

export default RadioInput;
