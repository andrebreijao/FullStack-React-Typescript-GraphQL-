import React from "react";
import "./characterSidebar.scss";
import MiniCard from "../miniCard/MiniCard";
import CharacterModel from "../../../models/CharacterModel";
import SilverButton from "../../buttons/silverButton/SilverButton";
import { useQuery } from "@apollo/client";
import { GET_CHARACTER } from "../../../graphQl/charactersGQL";

const CharactersModal = ({
  id,
  setSelectedAsset,
}: {
  id: number;
  setSelectedAsset: React.Dispatch<React.SetStateAction<CharacterModel | null>>;
}) => {
  const { loading, data } = useQuery(GET_CHARACTER, {
    variables: { planetId: id },
  });

  return (
    <div className="charactersModalContainer">
      {loading ? (
        "loading"
      ) : (
        <>
          <div className="charactersModalCloseButtonContainer">
            <SilverButton
              type="close"
              handleClick={() => {
                setSelectedAsset(null);
              }}
            />
          </div>
          <h1>{data?.character?.name}</h1>
          <div className="modalcharacterDescription">
            {data?.character?.description}
          </div>
          <div className="generalInformation">
            <div className={"modalPopulation"}>
              Planet{" "}
              <div className="popNumber">{data?.character?.planet?.name}</div>
            </div>
            <div className={"modalPopulation"}>
              Friends{" "}
              <div className="popNumber">{data?.character?.friendsCount}</div>{" "}
            </div>
          </div>
          <div className="charactersModalCharacterSection">
            <div className="charactersModalCharactersTitle">
              <h3>CHARACTERS</h3>
            </div>
            <div className="charactersModalCharactersList">
              {data?.character?.friends.map((character: CharacterModel) => (
                <MiniCard key={character.id} character={character} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CharactersModal;
