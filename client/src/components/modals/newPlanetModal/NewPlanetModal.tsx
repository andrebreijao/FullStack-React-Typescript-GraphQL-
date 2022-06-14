import React from "react";
import CustomInput from "../../inputs/CustomInput";
import { useForm } from "react-hook-form";
import CustomButton from "../../buttons/customButton/CustomButton";
import { useTemplateContext } from "../../../context/TemplateContext";
import "./newPlanetModal.scss";
import { useMutation } from "@apollo/client";
import { ADD_PLANET } from "../../../graphQl/planetsGQL";

const NewPlanetModal = () => {
  const { setModalContent, setHighlightPlanetCode } = useTemplateContext();

  // TODO: updated data directly on cash
  const [createPlanet, { error }] = useMutation(ADD_PLANET);

  const { allPlanetsData } = useTemplateContext();
  const { refetchPlanets } = allPlanetsData;

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const newPlanetData = await createPlanet({ variables: data });

    // Refetch all characters to update list
    refetchPlanets && refetchPlanets();

    // Highlight new character
    const newPlanetCode = newPlanetData.data.createPlanet.code;
    setHighlightPlanetCode(newPlanetCode);

    // Closemodal
    setModalContent("");
  };

  const hasErrosInForm = Object.keys(formErrors).length !== 0;

  return (
    <>
      <h1>Planet</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="newPlanetModalContainer"
      >
        <CustomInput
          name="name"
          register={register}
          error={formErrors}
          maxLength={20}
          required
        />
        <CustomInput
          name="code"
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
          minLength={10}
        />
        <div className="addPlanetModalSubmitButtonContainer">
          <CustomButton
            label="cancel"
            level="secondary"
            handleClick={() => {
              setModalContent("");
            }}
          />
          <CustomButton
            label="Create planet"
            level="primary"
            type="submit"
            disabled={hasErrosInForm}
          />
        </div>
      </form>
      {error && <div className="errorMessage">{`${error}`}</div>}
    </>
  );
};

export default NewPlanetModal;
