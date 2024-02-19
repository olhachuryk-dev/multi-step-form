import React from "react";
import styles from "./Card.module.scss";

type Props =  {
  children: JSX.Element | JSX.Element[];
  appearence: "primary" | "secondary" | "accent";
  padding?: "none" | "small" | "medium";
}

const Card: React.FC<Props> = ({children, appearence, padding='small'}) => {
  return (
    <div
      className={`${
        styles[`${appearence}_card`]} ${
        styles[`padding_${padding}`]
      }`}
    >
      {children}
    </div>
  );
};

export default Card;
