import { useState } from "react";
import { IField } from "../../redux/formTypes";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Fieldset from "../../shared/Fieldset/Fieldset";
import ValidationMsg from "../../shared/ValidationMsg/ValidationMsg";
import styles from "./CheckboxInput.module.scss";

//for checkboxes and readiobuttons

const CheckboxInput = (props: IField) => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext();
  const [checkedInputs, setCheckedInputs] = useState<string[]>(
    getValues(props.id) || [""]
  );
  return (
    <>
      <Fieldset legend={props.label}>
        <>
          {props.options?.map((option) => {
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
                    onClick={() =>
                      setCheckedInputs((arr) =>
                        arr.includes(option.label)
                          ? arr.filter((el) => el !== option.label)
                          : [...arr, option.label]
                      )
                    }
                    {...register(props.id, {
                      required: props.validation?.required,
                      disabled: props.validation?.disabled,
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
        name={props.id}
        render={({ message }) => <ValidationMsg message={message} />}
      />
    </>
  );
};

export default CheckboxInput;
