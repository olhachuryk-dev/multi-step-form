import { IField } from "../../store/formTypes";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import ValidationMsg from "../UI/ValidationMsg";
import "./TextInput.scss";

// for text inputs like text, email, tel.

const TextInput = (props: IField) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="input_container">
      <label htmlFor={props.id}>{props.label}</label>
      <ErrorMessage
        errors={errors}
        name={props.id}
        render={({ message }) => <ValidationMsg message={message} />}
      />
      <input
        type={props.type}
        placeholder={props.placeholder}
        id={props.id}
        {...register(props.id, {
          required: props.validation?.required,
          minLength: props.validation?.minLength,
          maxLength: props.validation?.maxLength,
          max: props.validation?.max,
          min: props.validation?.min,
          pattern: props.validation?.pattern?.value
            ? {
                value: new RegExp(props.validation.pattern.value),
                message: props.validation.pattern.message,
              }
            : undefined,
          disabled: props.validation?.disabled,
          value: props.validation?.value,
        })}
      />
    </div>
  );
};

export default TextInput;
