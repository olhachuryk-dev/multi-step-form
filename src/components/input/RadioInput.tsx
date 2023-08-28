import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { IField } from "../../store/formTypes";
import useSetDefaultChoice from "../../hooks/useSetDefaultChoice";
import Fieldset from "../UI/Fieldset";
import ValidationMsg from "../UI/ValidationMsg";
import "./RadioInput.scss";

//for  readiobuttons

const RadioInput = (props: IField) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  useSetDefaultChoice(props.id, props.options?.[0].label || "");

  return (
    <>
      <Fieldset label={props.label}>
        <>
          {props.options?.map((option) => {
            return (
              <div key={option.label} className="radio_option">
                {option.icon ? (
                  <img src={option.icon} alt={option.label} />
                ) : (
                  <div className="default_icon">
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
