import React from "react";
import "./miniCard.scss";
import CharacterModel from "../../../models/CharacterModel";

const MiniCard = (props: { character: CharacterModel }) => {
  const { name, picture_url, friendsCount } = props.character;

  return (
    <div className="miniCardContainer">
      <img
        alt={name}
        className="characterMiniCardImage"
        style={{ objectFit: !picture_url ? "contain" : "cover" }}
        src={picture_url ? picture_url : "no-image-icon.png"}
      />
      <div className="miniCardInfo">
        <div className="miniCardName">{name}</div>
        <div className="miniCardFriendsNumber">
          {friendsCount
            ? `${friendsCount} friend${friendsCount === 1 ? "" : "s"}`
            : "0 friends"}
        </div>
      </div>
    </div>
  );
};

export default MiniCard;
