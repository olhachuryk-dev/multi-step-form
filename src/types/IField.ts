import { IFieldValidation } from "./IFieldValidation";
import { IFieldOption } from "./IFieldOption";

export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "checkbox"
  | "radio"
  | "dropdown"
  | "toggle";

  
export interface IField {
  id: string;
  stepId: string;
  hasChildFields: boolean;
  label: string;
  type: FieldType;
  review: boolean;
  description?: string;
  parentField?: {
    parentFieldId: string;
    parentOptionId: string;
    display: boolean;
  };
  options?: IFieldOption[];
  validation?: IFieldValidation;
  placeholder?: string;
}
