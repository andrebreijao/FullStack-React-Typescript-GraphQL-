import PlanetModel from "./PlanetModel";

export default interface CharacterModel {
  id: number;
  name: string;
  picture_url: string;
  friendsCount?: number;
  description: string;
  planet: PlanetModel;
}
