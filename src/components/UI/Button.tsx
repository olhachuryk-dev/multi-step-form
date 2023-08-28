import React from "react";
import "./Button.scss";

type Props = {
  appearence: "primary" | "secondary" | "accent";
  name: string;
  type: "submit" | "button";
  onClick?: () => void;
  disabled?: boolean;
  visible?: boolean;
};

const Button = (props: Props) => {
  return (
    <button
      className={`${props.appearence}_btn ${
        props.visible === false ? "hidden" : ""
      }`}
      type={props.type}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.name}
    </button>
  );
};

export default Button;
