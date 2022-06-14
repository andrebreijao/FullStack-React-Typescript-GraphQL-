import React, { MouseEventHandler } from "react";
import "./customButton.scss";

interface CustomButtonProps {
  label: string;
  handleClick?: MouseEventHandler<any>;
  level?: "primary" | "secondary";
  type?: "button" | "submit";
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  handleClick,
  level,
  disabled,
  type,
}) => {
  //todo: get this colocs to global variables
  const PRIMARY_COLOR = "#121C33";
  const SECONDARY_COLOR = "#121C330D";
  const isPrimary = level === "primary";
  const typeUsed = type ? type : "button";

  return (
    <button
      onClick={handleClick}
      type={typeUsed}
      className="customButton"
      disabled={disabled}
      style={{
        color: isPrimary ? "#FFFFFF" : "#121C33",
        backgroundColor: isPrimary ? PRIMARY_COLOR : SECONDARY_COLOR,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {label}
    </button>
  );
};

export default CustomButton;
