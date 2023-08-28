import { IField } from "../../store/formTypes";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Fieldset from "../UI/Fieldset";
import ValidationMsg from "../UI/ValidationMsg";
import "./CheckboxInput.scss";

//for checkboxes and readiobuttons

const CheckboxInput = (props: IField) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <Fieldset label={props.label}>
        <>
          {props.options?.map((option) => {
            return (
              <div key={option.label} className="check_option">
                <div className="icon"></div>
                <div className="input_wrapper">
                  <input
                    type="checkbox"
                    id={option.id}
                    value={option.label}
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
