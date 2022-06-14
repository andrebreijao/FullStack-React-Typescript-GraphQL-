import React from "react";
import "./planetsSidebar.scss";
import MiniCard from "../miniCard/MiniCard";
import CharacterModel from "../../../models/CharacterModel";
import SilverButton from "../../buttons/silverButton/SilverButton";
import { useQuery } from "@apollo/client";
import PlanetModel from "../../../models/PlanetModel";
import { useTemplateContext } from "../../../context/TemplateContext";
import { GET_PLANET } from "../../../graphQl/planetsGQL";

const PlanetsModal = ({
  id,
  setSelectedAsset,
}: {
  id: number;
  setSelectedAsset: React.Dispatch<React.SetStateAction<PlanetModel | null>>;
}) => {
  //TODO: refetch data on planet created via character to planet button
  const { loading, data } = useQuery(GET_PLANET, {
    variables: { planetId: id },
  });
  const { setSelectedPlanet, setModalContent } = useTemplateContext();

  const createNewCharacter = () => {
    setSelectedPlanet(data?.planet?.code);
    setModalContent("addCharacter");
  };

  return (
    <div className="planetsModalContainer">
      {loading ? (
        "loading"
      ) : (
        <>
          <div className="planetsModalCloseButtonContainer">
            <SilverButton
              type="close"
              handleClick={() => {
                setSelectedAsset(null);
              }}
            />
          </div>
          <h1>{data.planet.name}</h1>
          <div className="modalPlanetDescription">
            {data.planet.description}
          </div>
          <div className={"modalPopulation"}>
            Population <div className="popNumber">{data.planet.population}</div>{" "}
          </div>
          <div className="planetsModalCharacterSection">
            <div className="planetsModalCharactersTitle">
              <h3>CHARACTERS</h3>
              <SilverButton
                type="add"
                handleClick={() => {
                  createNewCharacter();
                }}
              />
            </div>
            <div className="planetsModalCharactersList">
              {data.planet.characters.map((character: CharacterModel) => (
                <MiniCard key={character.id} character={character} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PlanetsModal;
