import React from "react";
import Field from "./Field";
import ReviewAnswers from "./ReviewAnswers";
import { IField, IStep } from "../../store/formTypes";
import "./StepContents.scss";

type Props = {
  step: IStep;
  fields: IField[];
  isValid: boolean;
};
const thanks =
  "Thanks for confirming! If you ever need support, please feel free to email us at fake.support@lorem.com.";

const StepContents = ({ step, fields, isValid }: Props) => {
  const formSubmitted = fields.length === 0 && step?.completed === true;
  if (isValid) {
    return (
      <div className={`step_container ${formSubmitted ? " thankyou" : ""}`}>
        <h2 className="title">{formSubmitted ? "Thank You!" : step?.title}</h2>
        <p className="description">
          {formSubmitted ? thanks : step?.description}
        </p>
        {fields.length ? (
          fields.map((field) => {
            const hasParentField =
              field.parentField?.parentFieldId !== undefined;
            if (
              !hasParentField ||
              (hasParentField && field.parentField?.display === true)
            )
              return <Field {...field} key={field.id} />;
            return null;
          })
        ) : formSubmitted ? (
          <></>
        ) : (
          <ReviewAnswers />
        )}
      </div>
    );
  } else {
    return (
      <div className={`step_container`}>
        <h2 className="title">Not Found</h2>
        <p className="description">
          The link is incorrect or no more active. Please, double-check the link
          address or contact form author.
        </p>
      </div>
    );
  }
};

export default StepContents;
