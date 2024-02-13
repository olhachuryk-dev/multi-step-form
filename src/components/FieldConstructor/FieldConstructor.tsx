import React from "react";
import { IField } from "../../types/IField";
import CheckboxInput from "../CheckboxInput/CheckboxInput";
import StepInput from "../StepInput/StepInput";
import OptionsConstructor from "../OptionsConstructor/OptionsConstructor";

const fieldsWithOptions = ["checkbox", "radio", "toggle"];

const FieldConstructor: React.FC<IField> = (props) => {
  const renderFieldTypeInputs = () => {
    if ([fieldsWithOptions].includes([props.type])) {
      // return <OptionsConstructor {...props} key={props.id} />;
    }
  };

  return (
    <>
      <StepInput
        id={`${props.id}.label`}
        label="Field label"
        required={true}
        multiline={false}
        placeholder="e.g. Email address"
      />
      <CheckboxInput
        id={`${props.id}.validation.required`}
        stepId={props.stepId}
        hasChildFields={false}
        label="Required"
        type={"checkbox"}
        review={false}
        options={[{ id: `${props.id}.required`, label: "Required" }]}
      />
      {renderFieldTypeInputs()}
    </>
  );
};

export default FieldConstructor;
