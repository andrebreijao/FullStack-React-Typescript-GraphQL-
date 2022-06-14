import React, { useState } from "react";
import CustomInput from "../../inputs/CustomInput";
import { useForm } from "react-hook-form";
import CustomButton from "../../buttons/customButton/CustomButton";
import { useTemplateContext } from "../../../context/TemplateContext";
import "./newCharacterModal.scss";
import { useMutation } from "@apollo/client";
import CharactersDropdown from "../../charactersDropdown/CharactersDropdown";
import CharacterModel from "../../../models/CharacterModel";
import { ADD_CHARACTER } from "../../../graphQl/charactersGQL";

const NewCharacterModal = () => {
  const { selectedPlanet, setModalContent, setHighlightCharacterId } =
    useTemplateContext();
  const [selectedFriends, setSelectedFriends] = useState<CharacterModel[]>([]);

  const { allCharactersData, allPlanetsData } = useTemplateContext();
  const { refetchCharacters } = allCharactersData;
  const { refetchPlanets } = allPlanetsData;

  // TODO: updated data on cache
  const [createCharacter, { error }] = useMutation(ADD_CHARACTER);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm({
    defaultValues: {
      // Set the default planet if the coming from the planet sidebar
      planet: selectedPlanet ? selectedPlanet : null,
    },
  });

  const onSubmit = async (data: any) => {
    const listOfFriendsIds = selectedFriends.map(
      (friend) => friend && friend.id
    );
    const newCharacterData = { ...data, listOfFriends: listOfFriendsIds };
    const newCharacter = await createCharacter({ variables: newCharacterData });

    // Refetch all characters to update list
    refetchCharacters && refetchCharacters();
    refetchPlanets && refetchPlanets();

    // Highlight new character
    const newCharacterId = newCharacter.data.createCharacter.id;
    setHighlightCharacterId(newCharacterId);

    // Closemodal
    setModalContent("");
  };

  const hasErrosInForm = Object.keys(formErrors).length !== 0;

  return (
    <>
      <h1>Character</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="newCharacterModalContainer"
      >
        <CustomInput
          name="name"
          register={register}
          error={formErrors}
          maxLength={15}
          required
        />
        <CustomInput
          name="planet"
          customName="Planet Code"
          placeholder="e.g. PI-NOE-01"
          register={register}
          error={formErrors}
          required
          pattern={/^[A-Z]{2}-[A-Z]{3}-[0-9]{2}$/}
          patternMessage="The code should have the following pattern XX-XXX-00"
        />
        <CustomInput
          name="picture_url"
          description="Paste the URL of a JPG or PNG of max 20 kb"
          register={register}
          error={formErrors}
          required
          pattern={
            /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi
          }
          patternMessage="Please, insert a valid URL"
        />
        <CustomInput
          name="description"
          register={register}
          error={formErrors}
          required
          minLength={15}
          maxLength={300}
        />
        <CharactersDropdown
          selection={selectedFriends}
          setSelection={setSelectedFriends}
        />
        <div className="addCharacterModalSubmitButtonContainer">
          <CustomButton
            label="cancel"
            level="secondary"
            handleClick={() => {
              setModalContent("");
            }}
          />
          <CustomButton
            label="Create character"
            level="primary"
            type="submit"
            disabled={hasErrosInForm}
          />
        </div>
        {error && <div className="errorMessage">{`${error}`}</div>}
      </form>
    </>
  );
};

export default NewCharacterModal;
