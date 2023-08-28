import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const useSetDefaultChoice = (fieldId: string, defaultValue: string) => {
  const { setValue, getValues } = useFormContext();

  useEffect(() => {
    const currentValue = getValues(fieldId);
    if (currentValue === null || typeof currentValue === "undefined" || currentValue === "") {
      setValue(fieldId, defaultValue);
    }
  }, [setValue, getValues, fieldId, defaultValue]);

  return { setValue, getValues };
};

export default useSetDefaultChoice;
