import React from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { selectAllFields } from "../../store/fieldsSlice";
import Card from "../UI/Card";
import { useFormContext } from "react-hook-form";
import { IMultistepForm } from "../../store/formTypes";
import "./ReviewAnswers.scss";

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
          const isLastStepAnswer =
            field.stepId !== fields[i + 1]?.stepId && i + 1 < fields.length;
          return (
            <div
              key={field.id}
              className={`answer_wrapper ${
                field.hasChildFields ? "answer_accent" : ""
              } ${isLastStepAnswer ? "answer_last" : ""}`}
            >
              <label>{label}</label>
              {Array.isArray(answer) ? (
                <div className="multiple">
                  {answer.map((a) => (
                    <span key={a}>{a}</span>
                  ))}
                </div>
              ) : (
                <div>
                  <span>{answer}</span>
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
