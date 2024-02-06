import React from "react";
import { Units } from "./Spacer.types";

interface Props {
  size: number;
  unit?: Units;
  isHorizontal?: boolean;
}

type SpaceProps = {
  size: number;
  unit: Units;
};

const px = (value: number) => `${value}px`;
const pxToUnit = (unit: Units, value: number) => {
  const mapper = {
    [Units.px]: px,
  };
  return mapper[unit](value);
};

const HorizontalSpace = ({ size, unit }: SpaceProps) => (
  <div
    style={{ width: pxToUnit(unit, size), flex: `0 0 ${pxToUnit(unit, size)}` }}
  />
);
const VerticalSpace = ({ size, unit }: SpaceProps) => (
  <div style={{ paddingTop: pxToUnit(unit, size), maxWidth: "90vw" }} />
);

const Spacer: React.FC<Props> = ({
  size,
  isHorizontal = false,
  unit = Units.px,
}) => {
  const Space = isHorizontal ? HorizontalSpace : VerticalSpace;
  return <Space size={size} unit={unit} />;
};

export default Spacer;
