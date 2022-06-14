import NewPlanetModal from "./newPlanetModal/NewPlanetModal";
import NewCharacterModal from "./newCharacterModal/NewCharacterModal";
import SilverButton from "../buttons/silverButton/SilverButton";
import { useTemplateContext } from "../../context/TemplateContext";
import "./genericModal.scss";

const GenericModal = () => {
  const { modalContent, setModalContent, setSelectedPlanet } =
    useTemplateContext();
  const Content = () => {
    switch (modalContent) {
      case "addPlanet":
        return <NewPlanetModal />;
      case "addCharacter":
        return <NewCharacterModal />;
      default:
        return null;
    }
  };
  return (
    <div
      className="modalContainer"
      // If there is no modalContent selected, the modal should not appear
      style={{ display: modalContent ? "flex" : "none" }}
    >
      <div className="genericModalContainer">
        <div className="genericModalCloseButtonContainer">
          <SilverButton
            type="close"
            handleClick={() => {
              setModalContent("");
              setSelectedPlanet("");
            }}
          />
        </div>
        {Content && <Content />}
      </div>
    </div>
  );
};

export default GenericModal;
