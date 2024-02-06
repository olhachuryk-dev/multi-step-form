import { useEffect } from "react";
import { IField } from "../../redux/formTypes";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { displayChildFields } from "../../redux/fieldsSlice";
import { useFormContext } from "react-hook-form";
import useSetDefaultChoice from "../../hooks/useSetDefaultChoice";
import styles from "./ToggleInput.module.scss";

const ToggleInput = (props: IField) => {
  const { register, setValue, getValues } = useFormContext();
  useSetDefaultChoice(props.id, props.options?.[0].label || "");
  const dispatch = useAppDispatch();

  const toggledLeft = getValues(props.id) === props.options?.[0].label;

  useEffect(() => {
    dispatch(
      displayChildFields({
        parentFieldId: props.id,
        toggledOption:
          props.options?.find(
            (option) => option.label === getValues(props.id)
          ) || props.options?.[0],
      })
    );
  }, [props.id, props.options, dispatch, getValues]);

  function toggleClickHandler() {
    const option =
      props.options?.find((option) => option.label !== getValues(props.id)) ||
      props.options?.[0];
    setValue(props.id, option?.label);
    dispatch(
      displayChildFields({
        parentFieldId: props.id,
        toggledOption: option,
      })
    );
  }
  return (
    <div className={styles.toggle_container}>
      <span className={toggledLeft ? styles.active : ""}>
        {props.options?.[0].label}
      </span>
      <button
        onClick={toggleClickHandler}
        type="button"
        {...register(props.id)}
      >
        <div className={toggledLeft ? styles.left : styles.right}></div>
      </button>
      <span className={toggledLeft ? "" : styles.active}>
        {props.options?.[1].label}
      </span>
    </div>
  );
};

export default ToggleInput;
