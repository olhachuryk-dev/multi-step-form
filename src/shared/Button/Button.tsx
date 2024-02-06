import React from "react";
import styles from "./Button.module.scss";

type Props = {
  name: string;
  appearence?: "primary" | "secondary" | "accent";
  type?: "submit" | "button";
  onClick?: () => void;
  disabled?: boolean;
  visible?: boolean;
};

const Button: React.FC<Props> = ({
  name,
  appearence = "primary",
  type = "button",
  visible = true,
  disabled = false,
  onClick,
}) => {
  return (
    <button
      className={`${styles[`${appearence}_btn`]} ${!visible && styles.hidden}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;
