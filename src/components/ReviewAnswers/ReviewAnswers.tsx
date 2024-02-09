import React from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { selectAllFields } from "../../store/fieldsSlice";
import Card from "../../shared/Card/Card";
import { useFormContext } from "react-hook-form";
import { IMultistepForm } from "../../types/IMultistepForm";
import styles from "./ReviewAnswers.module.scss";

const ReviewAnswers = () => {
  const { getValues } = useFormContext();
  const fields = useAppSelector(selectAllFields);
  const answers: IMultistepForm["answers"] = getValues();
  return (
    <Card appearence="accent" padding="small">
      <>
        {fields.map((field, i) => {
          const label = field.label;
          const answer = answers[field.id];
          if (field.parentField?.display === false) return null;
          const lastAnswerStyle =
            field.stepId !== fields[i + 1]?.stepId && i + 1 < fields.length
              ? styles.answer_last
              : "";
          return (
            <div
              key={`${field.id}-${i}`}
              className={`${styles.answer_wrapper} ${
                field.hasChildFields ? styles.answer_accent : ""
              } ${lastAnswerStyle}`}
            >
              <label>{label}</label>
              {Array.isArray(answer) ? (
                <div className={styles.multiple}>
                  {answer.length > 0 ? (
                    answer.map((a) => <span key={a}>{a}</span>)
                  ) : (
                    <span>-</span>
                  )}
                </div>
              ) : (
                <div>
                  <span>{answer || "-"}</span>
                </div>
              )}
            </div>
          );
        })}
      </>
    </Card>
  );
};

export default ReviewAnswers;
