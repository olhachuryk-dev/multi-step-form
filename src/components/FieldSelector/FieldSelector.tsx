import React, { useState } from "react";
import { IStep } from "../../types/IStep";
import { useFormContext } from "react-hook-form";
import Fieldset from "../../shared/Fieldset/Fieldset";
import FieldConstructor from "../FieldConstructor/FieldConstructor";
import StepInput from "../StepInput/StepInput";
import Spacer from "../../shared/Spacer/Spacer";
import CheckboxInput from "../CheckboxInput/CheckboxInput";
import styles from "./FieldSelector.module.scss";
import {
  FIELD_TYPES_LIST,
  IFieldType,
} from "../../utils/fieldTypeConstructorData";

type Props = {
  step: IStep;
  fieldId: string;
};

const FieldSelector: React.FC<Props> = ({ step, fieldId }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [checkedInput, setCheckedInput] = useState<IFieldType>();
  return (
    <>
      <Fieldset
        legend={"Select Field Type*"}
        className={styles.grid}
        showLegend={true}
        errors={errors}
        id={`${fieldId}.type`}
      >
        <>
          {FIELD_TYPES_LIST?.map((option) => {
            return (
              <div
                key={`${fieldId}.${option.type}`}
                className={`${styles.option}  ${
                  checkedInput?.type === option.type && styles.option_checked
                }`}
              >
                <img src={option.src} alt={option.type} />
                <div>
                  <input
                    type="radio"
                    value={option.type}
                    onClick={() => setCheckedInput(option)}
                    {...register(`${fieldId}.type`, {
                      required: "Selection Required",
                    })}
                  />
                </div>
              </div>
            );
          })}
        </>
      </Fieldset>
      <Spacer size={15} />
      <StepInput
        id={`${fieldId}.label`}
        label="Field label"
        required={true}
        multiline={false}
        placeholder="e.g. Email address"
      />
      <CheckboxInput
        id={`${fieldId}.validation.required`}
        stepId={step.id}
        hasChildFields={false}
        label="Required"
        type={"checkbox"}
        review={false}
        options={[{ id: `${fieldId}.required`, label: "Required" }]}
      />
      {checkedInput?.type && (
        <FieldConstructor
          id={fieldId}
          stepId={step.id}
          hasChildFields={false}
          label="Enter value"
          type={checkedInput.type}
          review={false}
        />
      )}
      <Spacer size={15} />
    </>
  );
};

export default FieldSelector;
