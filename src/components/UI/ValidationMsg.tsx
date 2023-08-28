import "./ValidationMsg.scss";

type Props = {
  message: string;
};

const ValidationMsg = ({ message }: Props) => {
  return <span className="error_msg">{message}</span>;
};

export default ValidationMsg;
