export interface IFieldValidation {
  required?: string | { value: boolean; message: string; };
  minLength?: { value: number; message: string; };
  maxLength?: { value: number; message: string; };
  max?: { value: number; message: string; };
  min?: { value: number; message: string; };
  pattern?: { value: string; message: string; };
  validate?: (value: string, formValues: string) => boolean;
  disabled?: boolean;
  onChange?: (e: React.SyntheticEvent) => void;
  value?: unknown;
  deps?: string | string[];
}
