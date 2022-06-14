import React, { MouseEventHandler } from "react";
import "./routeButton.scss";
import { Link } from "react-router-dom";

interface RouteButtonProps {
  label: string;
  handleClick?: MouseEventHandler<any>;
  isActive: boolean;
  link: string;
}

const RouteButton: React.FC<RouteButtonProps> = ({
  label,
  handleClick,
  isActive,
  link,
}) => {
  return (
    <Link to={link}>
      <button
        onClick={handleClick}
        className={`routeButton ${isActive && "active"}`}
      >
        {label}
      </button>
    </Link>
  );
};

export default RouteButton;
