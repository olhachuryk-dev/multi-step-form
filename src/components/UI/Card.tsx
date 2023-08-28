import React from "react";
import "./Card.scss";

interface CardProps {
  children: JSX.Element;
  appearence: "primary" | "secondary" | "accent";
  padding?: "none" | "small" | "medium";
}

const Card = (props: CardProps) => {
  return (
    <div
      className={`${props.appearence}_card ${
        props.padding ? "padding_" + props.padding : ""
      }`}
    >
      {props.children}
    </div>
  );
};

export default Card;
