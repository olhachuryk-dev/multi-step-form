import React from "react";
import { IStep } from "../../types/IStep";
import { useFormContext } from "react-hook-form";
import Fieldset from "../../shared/Fieldset/Fieldset";
import FieldConstructor from "../FieldConstructor/FieldConstructor";
import Spacer from "../../shared/Spacer/Spacer";
import styles from "./FieldSelector.module.scss";
import {
  FIELD_TYPES_LIST,
} from "../../utils/fieldTypeConstructorData";

type Props = {
  step: IStep;
  fieldId: string;
};

const FieldSelector: React.FC<Props> = ({ step, fieldId }) => {
  const selectorId = `${fieldId}.type`;
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();
  const checkedInputType =  watch(selectorId);
  return (
    <>
      <Fieldset
        legend={"Select Field Type*"}
        className={styles.grid}
        showLegend={true}
        errors={errors}
        id={selectorId}
      >
        <>
          {FIELD_TYPES_LIST?.map((option) => {
            return (
              <div
                key={`${fieldId}.${option.type}`}
                className={`${styles.option}  ${
                  checkedInputType === option.type && styles.option_checked
                }`}
              >
                <img src={option.src} alt={option.type} />
                <div>
                  <input
                    type="radio"
                    value={option.type}
                    {...register(selectorId, {
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
      {checkedInputType && (
        <FieldConstructor
          id={fieldId}
          stepId={step.id}
          hasChildFields={false}
          label="Enter value"
          type={checkedInputType}
          review={false}
        />
      )}
      <Spacer size={15} />
    </>
  );
};

export default FieldSelector;
