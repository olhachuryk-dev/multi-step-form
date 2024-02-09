import React from "react";
import TextInput from "../TextInput/TextInput";
import RadioInput from "../RadioInput/RadioInput";
import CheckboxInput from "../CheckboxInput/CheckboxInput";
import ToggleInput from "../ToggleInput/ToggleInput";
import { IField } from "../../types/IField";

const Field: React.FC<IField> = (props) => {
  switch (props.type) {
    case "text":
      return <TextInput {...props} key={props.id} />;
    case "email":
      return <TextInput {...props} key={props.id} />;
    case "tel":
      return <TextInput {...props} key={props.id} />;
    case "checkbox":
      return <CheckboxInput {...props} key={props.id} />;
    case "radio":
      return <RadioInput {...props} key={props.id} />;
    case "toggle":
      return <ToggleInput {...props} key={props.id} />;
    default:
      return <h4>The field type is incorrect</h4>;
  }
};

export default Field;
