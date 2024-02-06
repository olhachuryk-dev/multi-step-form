import React, { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { IStep } from "../../redux/formTypes";
import { useFormContext } from "react-hook-form";
import ValidationMsg from "../../shared/ValidationMsg/ValidationMsg";
import Fieldset from "../../shared/Fieldset/Fieldset";
import iconBulltes from "../../assets/Bullets.svg";
import iconCheckbox from "../../assets/Checkbox.svg";
import iconTextInput from "../../assets/TextInput.svg";
import iconEmail from "../../assets/Email.svg";
import iconPhone from "../../assets/Phone.svg";
import iconToggles from "../../assets/Toggles.svg";
import iconUsername from "../../assets/Username.svg";
import styles from "./FieldSelector.module.scss";

interface IBasicFieldType {
  type: string;
  src: string;
}
interface IFieldType extends IBasicFieldType {
  subTypes?: IBasicFieldType[];
}
const fieldTypes: IFieldType[] = [
  {
    type: "text",
    src: iconTextInput,
    subTypes: [
      {
        type: "email",
        src: iconEmail,
      },
      {
        type: "tel",
        src: iconPhone,
      },
      {
        type: "text",
        src: iconUsername,
      },
    ],
  },
  {
    type: "radio",
    src: iconBulltes,
  },
  {
    type: "checkbox",
    src: iconCheckbox,
  },
  {
    type: "toggle",
    src: iconToggles,
  },
];

type Props = {
  step: IStep;
  currentStepIndex: number;
  fieldIndex?: number;
};

const FieldSelector: React.FC<Props> = ({
  step,
  currentStepIndex,
  fieldIndex = 0,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [checkedInput, setCheckedInput] = useState<string>("");
  const id = `${currentStepIndex}.${step.id}.fields.${fieldIndex}`;
  return (
    <>
      <Fieldset
        legend={"Select Field Type *"}
        className={styles.grid}
        showLegend={true}
      >
        <>
          {fieldTypes?.map((option) => {
            return (
              <div
                key={`${id}.${option.type}`}
                className={`${styles.option}  ${
                  checkedInput === option.type ? styles.option_checked : ""
                }`}
              >
                <img src={option.src} alt={option.type} />
                <div>
                  <input
                    type="radio"
                    value={option.type}
                    onClick={() => setCheckedInput(option.type)}
                    {...register(id, {
                      required: "Selection Required",
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
        name={`${step.id}.field`}
        render={({ message }) => <ValidationMsg message={message} />}
      />
    </>
  );
};

export default FieldSelector;
