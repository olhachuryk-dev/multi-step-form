import React from "react";
import styles from "./ButtonsGroup.module.scss";

type Props = {
  children: JSX.Element | JSX.Element[];
};

const ButtonsGroup: React.FC<Props> = ({ children }) => {
  return <div className={styles.buttons_group}>{children}</div>;
};

export default ButtonsGroup;
