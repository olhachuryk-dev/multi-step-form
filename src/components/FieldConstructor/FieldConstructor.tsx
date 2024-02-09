import React from "react";
import { IField } from "../../types/IField";
import CheckboxInput from "../CheckboxInput/CheckboxInput";
import RadioInput from "../RadioInput/RadioInput";
import ToggleInput from "../ToggleInput/ToggleInput";

const FieldConstructor: React.FC<IField> = (props) => {
  switch (props.type) {
    case "checkbox":
      return <CheckboxInput {...props} key={props.id} />;
    case "radio":
      return <RadioInput {...props} key={props.id} />;
    case "toggle":
      return <ToggleInput {...props} key={props.id} />;
    default:
      return null;
  }
};

export default FieldConstructor;
