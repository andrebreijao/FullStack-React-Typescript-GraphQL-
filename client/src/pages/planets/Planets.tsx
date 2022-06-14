import React, { useState } from "react";
import "./planets.scss";
import PlanetModel from "../../models/PlanetModel";
import PlanetCard from "../../components/cards/PlanetCard";
import PlanetsModal from "../../components/modals/planetsSidebar/PlanetsSidebar";
import AddButton from "../../components/buttons/addButton/AddButton";
import RouteButton from "../../components/buttons/routeButton/RouteButton";
import { useTemplateContext } from "../../context/TemplateContext";
import LoadComponent from "../../components/loadComponent/LoadComponent";

const Planets = () => {
  const { modalContent, setModalContent } = useTemplateContext();
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetModel | null>(
    null
  );

  const { allPlanetsData, highlightPlanetCode } = useTemplateContext();
  const { itens, loading } = allPlanetsData;

  const handlePlanetClick = (planet: PlanetModel) => {
    setSelectedPlanet(planet);
  };

  return (
    <>
      <div
        className="planetsPageContainer"
        style={{ overflow: !!modalContent ? "hidden" : "auto" }}
      >
        <div className="planetListSection">
          <h1 className="pageTitle">Spacious</h1>
          <div className="routeButtonsPlanets">
            <RouteButton label="Planets" isActive={true} link="/" />
            <RouteButton
              label="Characters"
              isActive={false}
              link="/characters"
            />
          </div>
          <div className="planetList">
            {loading ? (
              <LoadComponent />
            ) : (
              itens.map((planet) => {
                return (
                  <button
                    className="containerCardButton"
                    onClick={() => handlePlanetClick(planet)}
                    key={planet.id}
                  >
                    <PlanetCard
                      name={planet.name}
                      population={planet.population}
                      PlanetImage={planet.picture_url}
                      highlight={planet.code === highlightPlanetCode}
                    />
                  </button>
                );
              })
            )}
          </div>
        </div>
        {selectedPlanet && (
          <div className="planetsModalSection">
            <PlanetsModal
              id={selectedPlanet.id}
              setSelectedAsset={setSelectedPlanet}
            />
          </div>
        )}
        <div className="addPlanetButton">
          <AddButton
            handleClick={() => {
              setModalContent("addPlanet");
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Planets;
