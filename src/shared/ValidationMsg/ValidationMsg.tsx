import React from "react";
import styles from "./ValidationMsg.module.scss";

type Props = {
  message: string;
};

const ValidationMsg: React.FC<Props> = ({ message }) => {
  return <span className={styles.error_msg}>{message}</span>;
};

export default ValidationMsg;
