import { IAnswer } from "./IAnswer";
import { IField } from "./IField";
import { IStep } from "./IStep";

export interface IMultistepForm {
  steps: IStep[];
  fields: IField[];
  answers: IAnswer;
}
