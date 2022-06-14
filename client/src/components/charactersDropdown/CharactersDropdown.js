import React, { useState } from "react";
import onClickOutside from "react-onclickoutside";
import "./charactersDropdown.scss";
import ArrowIcon from "../icons/ArrowIcon";
import { useEffect } from "react";
import CheckIcon from "../icons/CheckIcon";
import CloseIcon from "../icons/CloseIcon";
import { useTemplateContext } from "../../context/TemplateContext";

function Dropdown({ selection, setSelection, multiSelect = true }) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);

  // const { data } = useQuery(GET_CHARACTERS);
  const { allCharactersData } = useTemplateContext();
  const { itens } = allCharactersData;

  const toggle = () => setOpen(!open);
  Dropdown.handleClickOutside = () => setOpen(false);

  const handleOnClick = (item) => {
    if (!selection.some((current) => current.id === item.id)) {
      if (!multiSelect) {
        setSelection([item]);
      } else if (multiSelect) {
        setSelection([...selection, item]);
      }
    } else {
      let selectionAfterRemoval = selection;
      selectionAfterRemoval = selectionAfterRemoval.filter(
        (current) => current.id !== item.id
      );
      setSelection([...selectionAfterRemoval]);
    }
  };

  const isItemInSelection = (item) => {
    if (selection.some((current) => current.id === item.id)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const listOfCharacters = itens;

    // TODO: Do this filtering via api in case of large amounts of characters
    const filteredListByName = listOfCharacters.filter(
      (caracter) =>
        caracter.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0
    );
    setItems(filteredListByName);
  }, [itens, searchTerm]);

  return (
    <div className="dd-wrapper">
      <div className="friendsDropDownLabel">Friends</div>
      <div tabIndex={0} className="dd-header" role="button">
        <div
          className="dd-header__background-click"
          onKeyPress={() => toggle(!open)}
          onClick={() => toggle(!open)}
        ></div>
        <div className="dd-header__title">
          {selection.map((character) => {
            return (
              <div className="selectedCharacterCard" key={character.id}>
                <img src={character.picture_url} alt={character.name} />
                <p>{character.name}</p>
                <button onClick={() => handleOnClick(character)}>
                  <CloseIcon />
                </button>
              </div>
            );
          })}
        </div>
        <div
          className="dd-header__action"
          onKeyPress={() => toggle(!open)}
          onClick={() => toggle(!open)}
        >
          <div className={open ? "rotate" : ""}>{<ArrowIcon />}</div>
        </div>
      </div>

      {open && (
        <>
          <input
            type="text"
            placeholder="Search for specific names..."
            className="dd-search"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <ul className="dd-list">
            {items.map((character) => (
              <li className="dd-list-item" key={character.id}>
                <button type="button" onClick={() => handleOnClick(character)}>
                  <div className="dd-list__characterSelectCard">
                    <img src={character.picture_url} alt={character.name} />
                    <p>{character.name}</p>
                  </div>

                  <span>{isItemInSelection(character) && <CheckIcon />}</span>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => Dropdown.handleClickOutside,
};

export default onClickOutside(Dropdown, clickOutsideConfig);
