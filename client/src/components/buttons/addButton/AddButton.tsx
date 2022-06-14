import React, { MouseEventHandler } from "react";
import "./addButton.scss";
import { FiPlus } from "react-icons/fi";

interface addButtonProps {
  handleClick?: MouseEventHandler<any>;
}

const AddButton: React.FC<addButtonProps> = ({ handleClick }) => (
  <button onClick={handleClick} className="addButton">
    <FiPlus color="white" size={"32px"} />
  </button>
);

export default AddButton;
