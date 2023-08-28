import React from "react";
import Field from "./Field";
import { IField, IStep } from "../../store/formTypes";
import ReviewAnswers from "./ReviewAnswers";
import "./StepContents.scss";

type Props = {
  step: IStep;
  fields: IField[];
}

const StepContents = (props: Props) => {
  const { step, fields } = props;
  return (
    <div className="step_container">
      <h2 className="title">{step?.title}</h2>
      <p className="description">{step?.description}</p>
      {fields.length ? fields.map((field) => {
        const hasParentField = field.parentField?.parentFieldId !== undefined;
        if (
          !hasParentField ||
          (hasParentField && field.parentField?.display === true)
        )
          return <Field {...field} key={field.id} />;
        return null;
      }): <ReviewAnswers />}
    </div>
  );
};

export default StepContents;
