import { gql } from "@apollo/client";

// QUERIES
export const GET_CHARACTERS = gql`
  query {
    characters {
      name
      id
      friendsCount
      picture_url
      planet {
        code
      }
    }
  }
`;

export const GET_CHARACTER = gql`
  query getPlanet($planetId: ID!) {
    character(id: $planetId) {
      name
      description
      friendsCount
      friends {
        name
        friendsCount
        picture_url
      }
      planet {
        name
        description
      }
    }
  }
`;

// MUTATIONS
export const ADD_CHARACTER = gql`
  mutation createCharacter(
    $name: String!
    $description: String!
    $planet: String!
    $picture_url: String!
    $listOfFriends: [Int]
  ) {
    createCharacter(
      data: {
        name: $name
        description: $description
        planet: $planet
        picture_url: $picture_url
        listOfFriends: $listOfFriends
      }
    ) {
      id
      name
      description
    }
  }
`;
