import React from "react";
import styles from "./Card.module.scss";

interface CardProps {
  children: JSX.Element | JSX.Element[];
  appearence: "primary" | "secondary" | "accent";
  padding?: "none" | "small" | "medium";
}

const Card = (props: CardProps) => {
  return (
    <div
      className={`${
        styles[`${props.appearence}_card`]} ${
        styles[`padding_${props.padding}`]
      }`}
    >
      {props.children}
    </div>
  );
};

export default Card;
