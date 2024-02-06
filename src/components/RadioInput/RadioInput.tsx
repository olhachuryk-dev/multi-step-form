import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { IField } from "../../redux/formTypes";
import useSetDefaultChoice from "../../hooks/useSetDefaultChoice";
import Fieldset from "../../shared/Fieldset/Fieldset";
import ValidationMsg from "../../shared/ValidationMsg/ValidationMsg";
import styles from "./RadioInput.module.scss";

//for  readiobuttons

const RadioInput = (props: IField) => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext();
  useSetDefaultChoice(props.id, props.options?.[0].label || "");

  const [checkedInput, setCheckedInput] = useState<string>(
    getValues(props.id) || props.options?.[0].label
  );
  return (
    <>
      <Fieldset legend={props.label}>
        <>
          {props.options?.map((option) => {
            return (
              <div
                key={option.label}
                className={`${styles.radio_option} ${
                  checkedInput === option.label ? styles.input_checked : ""
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
                    onClick={() => setCheckedInput(option.label)}
                    {...register(props.id, {
                      required: props.validation?.required,
                      disabled: props.validation?.disabled,
                      value: props.validation?.value,
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
        name={props.id}
        render={({ message }) => <ValidationMsg message={message} />}
      />
    </>
  );
};

export default RadioInput;
