import iconBulltes from "../assets/Bullets.svg";
import iconCheckbox from "../assets/Checkbox.svg";
import iconTextInput from "../assets/TextInput.svg";
import iconEmail from "../assets/Email.svg";
import iconPhone from "../assets/Phone.svg";
import iconToggles from "../assets/Toggles.svg";
import { FieldType } from "../types/IField";

export interface IFieldType {
  type: FieldType;
  src: string;
  inputLabel: string;
  value: string | string[];
}
export const FIELD_TYPES_LIST: IFieldType[] = [
  {
    type: "radio",
    src: iconBulltes,
    inputLabel: "",
    value: ["", ""],
  },
  {
    type: "checkbox",
    src: iconCheckbox,
    inputLabel: "",
    value: ["", ""],
  },
  {
    type: "toggle",
    src: iconToggles,
    inputLabel: "",
    value: ["", ""],
  },
  {
    type: "text",
    src: iconTextInput,
    inputLabel: "",
    value: "",
  },
  {
    type: "email",
    src: iconEmail,
    inputLabel: "",
    value: "",
  },
  {
    type: "tel",
    src: iconPhone,
    inputLabel: "",
    value: "",
  },
];