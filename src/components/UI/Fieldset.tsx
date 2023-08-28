import React from "react";
import "./Fieldset.scss";

type Props = {
  children: JSX.Element;
  label?: string;
};

const Fieldset = ({ children, label }: Props) => {
  return (
    <fieldset>
      {label ? <legend>{label}</legend> : null}
      {children}
    </fieldset>
  );
};

export default Fieldset;
