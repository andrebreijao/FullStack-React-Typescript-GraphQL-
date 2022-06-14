import React from "react";
import "./characterCard.scss";

interface CharacterCardProps {
  name: string;
  numberOfFriends?: Number;
  picture_url?: string;
  highlight?: boolean;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  name,
  numberOfFriends,
  picture_url,
  highlight,
}) => {
  return (
    <div className={`cardContainer ${highlight ? "highlight" : ""}`}>
      <img
        src={picture_url ? picture_url : "no-image-icon.png"}
        alt={name}
        className="imagePlanetCard"
        style={{ objectFit: !picture_url ? "contain" : "cover" }}
      />
      <div className="cardInfo">
        <div className="cardName">{name}</div>
        {
          <div className="cardCode">
            {numberOfFriends ? `${numberOfFriends} friends` : "0 friends"}
          </div>
        }
      </div>
    </div>
  );
};

export default CharacterCard;
