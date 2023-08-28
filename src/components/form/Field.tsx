import React from "react";
import TextInput from "../input/TextInput";
import RadioInput from "../input/RadioInput";
import CheckboxInput from "../input/CheckboxInput";
import ToggleInput from "../input/ToggleInput";
import { IField } from "../../store/formTypes";

const Field = (props: IField) => {
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
        return <h4>No such field type is there</h4>;
    }
};

export default Field;
