import React from "react";
import StepInput from "../StepInput/StepInput";

type Props = {
  fieldId: string;
  optionId: string;
}

const OptionsConstructor: React.FC<Props> = ({optionId, fieldId}) => {
  return <>
    <StepInput
      id={`${optionId}.`}
      label="Option name"
      required={true}
    />
    <StepInput
      id={optionId}
      label="Option description"
      required={false}
    />
  </>
};

export default OptionsConstructor;
