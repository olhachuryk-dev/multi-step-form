import React from "react";
import styles from "./Fieldset.module.scss";

type Props = {
  children: JSX.Element;
  showLegend?: boolean;
  legend?: string;
  className?: string;
};

const Fieldset: React.FC<Props> = ({
  children,
  legend,
  className = "",
  showLegend = false,
}) => {
  return (
    <fieldset className={`${styles.fieldset} ${className}`}>
      {legend ? (
        <legend className={showLegend ? "" : styles.hidden}>{legend}</legend>
      ) : null}
      {children}
    </fieldset>
  );
};

export default Fieldset;
