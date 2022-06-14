import React from "react";
import "./planetCard.scss";

interface PlanetCardProps {
  name: string;
  population: Number;
  PlanetImage: any;
  highlight?: boolean;
}

const PlanetCard: React.FC<PlanetCardProps> = ({
  name,
  population,
  PlanetImage,
  highlight,
}) => {
  return (
    <div className={`cardContainer ${highlight ? "highlight" : ""}`}>
      <img
        src={PlanetImage ? PlanetImage : "no-image-icon.png"}
        alt={name}
        className="imagePlanetCard"
        style={{ objectFit: !PlanetImage ? "contain" : "cover" }}
      />
      <div className="cardInfo">
        <div className="cardName">{name}</div>
        <div className="cardCode">{`Pop: ${population}`}</div>
      </div>
    </div>
  );
};

export default PlanetCard;
