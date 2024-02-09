import React from "react";
import Field from "../Field/Field";
import ReviewAnswers from "../ReviewAnswers/ReviewAnswers";
import { IField } from "../../types/IField";
import { IStep } from "../../types/IStep";
import RequestStatus from "../../types/requestStatus";
import styles from "./StepContents.module.scss";
import { useAppSelector } from "../../hooks/reduxHooks";
import Loading from "../../shared/Loading/Loading";

type Props = {
  step: IStep;
  fields: IField[];
  isValid: boolean;
};
const thanks =
  "Thanks for confirming! If you ever need support, please feel free to email us at fake.support@lorem.com.";

const StepContents: React.FC<Props> = ({ step, fields, isValid }) => {
  const formSubmitted = fields.length === 0 && step?.completed === true;
  const stepsStatus = useAppSelector((state) => state.steps.status);
  if (stepsStatus === RequestStatus.LOADING) return <Loading />;
  if (!isValid)
    return (
      <div className={styles.step_container}>
        <h2 className={styles.title}>Not Found</h2>
        <p className={styles.description}>
          The link is incorrect or no more active. Please, double-check the link
          address or contact form author.
        </p>
      </div>
    );

  return (
    <div
      className={`${styles.step_container} ${
        formSubmitted ? styles.thankyou : ""
      }`}
    >
      <h2 className={styles.title}>
        {formSubmitted ? "Thank You!" : step?.title}
      </h2>
      <p className={styles.description}>
        {formSubmitted ? thanks : step?.description}
      </p>
      {fields.length ? (
        fields.map((field) => {
          const hasParentField = field.parentField?.parentFieldId !== undefined;
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
};

export default StepContents;
