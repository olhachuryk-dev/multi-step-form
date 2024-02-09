import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { FieldErrors, FieldValues } from "react-hook-form";
import ValidationMsg from "../ValidationMsg/ValidationMsg";
import styles from "./Fieldset.module.scss";

type Props = {
  children: JSX.Element;
  id: string;
  showLegend?: boolean;
  errors?: FieldErrors<FieldValues>;
  legend?: string;
  className?: string;
};

const Fieldset: React.FC<Props> = ({
  children,
  id,
  legend,
  className = "",
  errors,
  showLegend = false,
}) => {
  return (
    <fieldset className={`${styles.fieldset} ${className}`}>
      <legend className={`${!showLegend && styles.hidden}`}>
        <span>{legend}</span>
        <ErrorMessage
          errors={errors}
          name={id}
          render={({ message }) => <ValidationMsg message={message} />}
        />
      </legend>
      {children}
    </fieldset>
  );
};

export default Fieldset;
