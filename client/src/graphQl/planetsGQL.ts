import { gql } from "@apollo/client";

// QUERIES
export const GET_PLANETS = gql`
  query {
    planets {
      name
      population
      id
      picture_url
      code
    }
  }
`;

export const GET_PLANET = gql`
  query getPlanet($planetId: ID!) {
    planet(id: $planetId) {
      name
      population
      description
      code
      characters {
        name
        id
        friendsCount
        picture_url
      }
    }
  }
`;

// MUTATIONS
export const ADD_PLANET = gql`
  mutation createPlanet(
    $name: String!
    $description: String!
    $code: String!
    $picture_url: String!
  ) {
    createPlanet(
      data: {
        name: $name
        description: $description
        code: $code
        picture_url: $picture_url
      }
    ) {
      id
      name
      description
      code
      picture_url
    }
  }
`;
