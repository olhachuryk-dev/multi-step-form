import React from "react";
import MultistepForm from "../components/MultistepForm/MultistepForm";
import { useParams } from "react-router-dom";

const FormDisplay = () => {
  const { formId } = useParams();
  const userId = "olhachuryk"; // TODO: store userId in cookies;
  return <MultistepForm formId={formId || "helga_chu"} userId={userId} />;
};

export default FormDisplay;
