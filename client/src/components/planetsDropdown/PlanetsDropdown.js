import React, { useState } from "react";
import onClickOutside from "react-onclickoutside";
import "./planetsDropdown.scss";
import { useQuery } from "@apollo/client";
import ArrowIcon from "../icons/ArrowIcon";
import { useEffect } from "react";
import CheckIcon from "../icons/CheckIcon";
import CloseIcon from "../icons/CloseIcon";
import { GET_PLANETS } from "../../graphQl/planetsGQL";

function PlanetsDropdown({ selection, setSelection, multiSelect = false }) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);

  const { data } = useQuery(GET_PLANETS);

  const toggle = () => setOpen(!open);
  PlanetsDropdown.handleClickOutside = () => setOpen(false);

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
    const listOfPlanets = data ? data.planets : [];

    // TODO: Do this filtering via api in case of large amounts of characters
    const filteredListByName = listOfPlanets.filter(
      (planet) =>
        planet?.name?.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0
    );
    setItems(filteredListByName);
  }, [data, searchTerm]);

  return (
    <div className="dd-wrapper-planet">
      <div
        tabIndex={0}
        className="dd-header-planet"
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        <div className="dd-header__title-planet">
          {`Planet:   ${selection && selection[0] ? selection[0].name : "All"}`}
        </div>
        {selection && selection[0] && (
          <button onClick={() => setSelection([])}>
            <CloseIcon />
          </button>
        )}
        <div
          className="dd-header__action-planet"
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
            placeholder="Search planets..."
            className="dd-search-planet"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <ul className="dd-list-planet">
            {items.map((item) => (
              <li className="dd-list-item-planet" key={item.id}>
                <button type="button" onClick={() => handleOnClick(item)}>
                  <div className="dd-list__planetSelectCard-planet">
                    <img src={item.picture_url} alt={item.name} />
                    <p>{item.name}</p>
                  </div>

                  <span>{isItemInSelection(item) && <CheckIcon />}</span>
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
  handleClickOutside: () => PlanetsDropdown.handleClickOutside,
};

export default onClickOutside(PlanetsDropdown, clickOutsideConfig);
