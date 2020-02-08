import { gql } from 'apollo-boost';

export const PARTY_STATE = gql`
  query Party {
    party @client {
      rick {
        id
        name
        image
      }
      morty {
        id
        name
        image
      }
    }
  }
`;

export const ADD_CHARACTER_TO_PARTY = gql`
  mutation AddCharacterToParty($character: Character!) {
    addCharacterToParty(character: $character) @client
  }
`;

export const LOCAL_CHARACTERS = gql`
  query LocalCharacters {
    characters {
      results {
        id @client
        name @client
        image @client
      }
    }
  }
`;

export const GET_CHARACTERS_BY_NAME = gql`
  query Characters($name: String) {
    characters(filter: { name: $name }) @connection(key: "characters") {
      results {
        name
        image
        id
      }
    }
  }
`;
