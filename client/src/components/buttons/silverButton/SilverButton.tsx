import React, { MouseEventHandler } from "react";
import "./closeButton.scss";
import { GrAdd, GrClose } from "react-icons/gr";

interface AddButtonProps {
  handleClick?: MouseEventHandler<any>;
  type?: "close" | "add";
}

const SilverButton: React.FC<AddButtonProps> = ({ handleClick, type }) => (
  <button onClick={handleClick} className="closeButtonCustom">
    {type === "add" ? (
      <GrAdd color="black" size={"23px"} />
    ) : (
      <GrClose color="black" size={"23px"} />
    )}
  </button>
);

export default SilverButton;
