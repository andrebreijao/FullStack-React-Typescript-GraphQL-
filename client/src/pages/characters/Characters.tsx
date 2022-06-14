import React, { useState } from "react";
import "./characters.scss";
import CharacterModal from "../../components/modals/characterSidebar/CharacterSidebar";
import AddButton from "../../components/buttons/addButton/AddButton";
import RouteButton from "../../components/buttons/routeButton/RouteButton";
import { useTemplateContext } from "../../context/TemplateContext";
import CharacterModel from "../../models/CharacterModel";
import CharacterCard from "../../components/cards/CharacterCard";
import PlanetsDropdown from "../../components/planetsDropdown/PlanetsDropdown";
import PlanetModel from "../../models/PlanetModel";
import { useEffect } from "react";
import LoadComponent from "../../components/loadComponent/LoadComponent";

const Characters = () => {
  const { modalContent, setModalContent, highlightCharacterId } =
    useTemplateContext();
  const [selectedCharacter, setSelectedCharacter] =
    useState<CharacterModel | null>(null);

  const [selectedPlanet, setSelectedPlanet] = useState<PlanetModel[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<
    CharacterModel[]
  >([]);

  const { allCharactersData } = useTemplateContext();
  const { itens, loading } = allCharactersData;

  const handleCharacterClick = (character: CharacterModel) => {
    setSelectedCharacter(character);
  };

  useEffect(() => {
    const filteredCharactersLogic = () => {
      const ulfilteredCharacters = itens ? itens : [];

      if (ulfilteredCharacters && selectedPlanet.length) {
        const selectedPlanetCode = selectedPlanet[0].code;

        const filteredCharacters = ulfilteredCharacters.filter(
          (character) => character.planet.code === selectedPlanetCode
        );
        return filteredCharacters;
      }
      return ulfilteredCharacters;
    };

    setFilteredCharacters([...filteredCharactersLogic()]);
  }, [itens, selectedPlanet]);

  return (
    <div style={{ overflow: !!modalContent ? "hidden" : "auto" }}>
      <div
        className="charactersPageContainer"
        style={{ overflow: !!modalContent ? "hidden" : "auto" }}
      >
        <div className="characterListSection">
          <h1 className="pageTitle">Spacious</h1>
          <div className="routeButtonscharacters">
            <RouteButton label="Planets" isActive={false} link="/" />
            <RouteButton
              label="Characters"
              isActive={true}
              link="/characters"
            />
          </div>
          <div className="characterList">
            <div className="characterList__planetsdropdown">
              <PlanetsDropdown
                selection={selectedPlanet}
                setSelection={setSelectedPlanet}
              />
            </div>
            {loading ? (
              <LoadComponent />
            ) : (
              filteredCharacters.map((character) => {
                return (
                  <button
                    className="containerCardButton"
                    onClick={() => handleCharacterClick(character)}
                    key={character.id}
                  >
                    <CharacterCard
                      name={character.name}
                      numberOfFriends={character.friendsCount}
                      picture_url={character.picture_url}
                      key={character.id}
                      highlight={character.id === highlightCharacterId}
                    />
                  </button>
                );
              })
            )}
          </div>
        </div>
        {selectedCharacter && (
          <div className="charactersModalSection">
            <CharacterModal
              id={selectedCharacter.id}
              setSelectedAsset={setSelectedCharacter}
            />
          </div>
        )}
        <div className="addcharacterButton">
          <AddButton
            handleClick={() => {
              setModalContent("addCharacter");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Characters;
