export enum RequestStatus {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "succeeded",
  FAILED = "failed",
}

export interface IMultistepForm {
  steps: IStep[];
  fields: IField[];
  answers: IAnswer;
}

export interface IStep {
  id: string;
  title?: string;
  description?: string;
  name?: string;
  order: number;
  completed: boolean;
}

export interface IField {
  id: string;
  stepId: string;
  hasChildFields: boolean;
  description?: string;
  parentField?: {
    parentFieldId: string;
    parentOptionId: string;
    display: boolean;
  };
  label: string;
  type: "text" | "email" | "tel" | "checkbox" | "radio" | "dropdown" | "toggle";
  review: boolean;
  options?: IFieldOption[];
  validation?: IFieldValidation;
  placeholder?: string;
}

export interface IFieldOption {
  id: string;
  label: string;
  icon?: string;
  description?: string;
}

export interface IFieldValidation {
  required?: string | { value: boolean; message: string };
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  max?: { value: number; message: string };
  min?: { value: number; message: string };
  pattern?: { value: string; message: string };
  validate?: (value: string, formValues: string) => boolean;
  disabled?: boolean;
  onChange?: (e: React.SyntheticEvent) => void;
  value?: unknown;
  deps?: string | string[];
  //deps - Validation will be triggered for the dependent inputs,it only limited to register api not trigger.
  /*
  <input
    {...register("test", {
      deps: ['inputA', 'inputB'],
    })}
  />
  */
}

export interface IAnswer {
  [char: string]: any;
}
