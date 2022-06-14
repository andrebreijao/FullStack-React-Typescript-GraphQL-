import { useQuery } from "@apollo/client";
import React, { createContext, useContext, useState } from "react";
import GenericModal from "../components/modals/GenericModal";
import { GET_PLANETS } from "../graphQl/planetsGQL";
import { GET_CHARACTERS } from "../graphQl/charactersGQL";
import CharacterModel from "../models/CharacterModel";
import PlanetModel from "../models/PlanetModel";

interface TemplateContextModel {
  //Modal
  modalContent: string;
  setModalContent: React.Dispatch<React.SetStateAction<string>>;

  //Planets
  selectedPlanet: string;
  setSelectedPlanet: React.Dispatch<React.SetStateAction<string>>;
  allPlanetsData: {
    itens: PlanetModel[];
    loading?: boolean;
    refetchPlanets?: () => void;
  };
  highlightPlanetCode?: string;
  setHighlightPlanetCode: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;

  //Characters
  allCharactersData: {
    itens: CharacterModel[];
    loading?: boolean;
    refetchCharacters?: () => void;
  };
  highlightCharacterId?: number;
  setHighlightCharacterId: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
}

interface ContextModel {
  children?: React.ReactNode;
}

const TemplateContext = createContext<TemplateContextModel>({
  modalContent: "",
  setModalContent: () => {},
  selectedPlanet: "",
  setSelectedPlanet: () => {},
  allPlanetsData: { itens: [], loading: true, refetchPlanets: () => {} },
  allCharactersData: { itens: [], loading: true, refetchCharacters: () => {} },
  highlightPlanetCode: "",
  setHighlightPlanetCode: () => {},
  highlightCharacterId: undefined,
  setHighlightCharacterId: () => {},
});

const TemplateContextProvider: React.FC<ContextModel> = ({ children }) => {
  // MODAL
  const [modalContent, setModalContent] = useState("");

  //PLANETS
  const [selectedPlanet, setSelectedPlanet] = useState("");
  const {
    loading: loadingPlanet,
    data: dataPlanet,
    refetch: refetchPlanets,
  }: {
    loading?: boolean;
    data?: { planets: PlanetModel[] };
    refetch: () => {};
  } = useQuery(GET_PLANETS);

  const [highlightPlanetCode, setHighlightPlanetCode] = useState<string>();

  //CHARACTERS
  const {
    loading: loadingCharacter,
    data: dataCharacter,
    refetch: refetchCharecters,
  }: {
    loading?: boolean;
    data?: { characters: CharacterModel[] };
    refetch: () => {};
  } = useQuery(GET_CHARACTERS);

  const [highlightCharacter, setHighlightCharacter] = useState<number>();

  return (
    <TemplateContext.Provider
      value={{
        modalContent: modalContent,
        setModalContent: setModalContent,
        selectedPlanet: selectedPlanet,
        setSelectedPlanet: setSelectedPlanet,
        highlightPlanetCode: highlightPlanetCode,
        setHighlightPlanetCode: setHighlightPlanetCode,
        highlightCharacterId: highlightCharacter,
        setHighlightCharacterId: setHighlightCharacter,

        allPlanetsData: {
          itens: dataPlanet ? dataPlanet.planets : [],
          loading: loadingPlanet,
          refetchPlanets: refetchPlanets,
        },
        allCharactersData: {
          itens: dataCharacter ? dataCharacter.characters : [],
          loading: loadingCharacter,
          refetchCharacters: refetchCharecters,
        },
      }}
    >
      {children}
      <GenericModal />
    </TemplateContext.Provider>
  );
};

const useTemplateContext = () => {
  return useContext(TemplateContext);
};

export { TemplateContextProvider, useTemplateContext };
