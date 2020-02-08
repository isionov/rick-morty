import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Card } from '../Card';
import styled from 'styled-components';
import { Character, Characters } from '../../Types';

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const LocalCharacters = gql`
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

interface CharactersData {
  characters: Characters;
}

interface CharactersVars {
  name: string;
}

export const List = () => {
  const [deletedCharactersId, addDeletedCharactersId] = useState(
    [] as string[]
  );
  const { data } = useQuery<CharactersData, CharactersVars>(LocalCharacters);

  const filteredArray =
    data?.characters.results &&
    data?.characters.results.filter(({ id }: Character) => {
      return deletedCharactersId.indexOf(id) === -1;
    });

  return (
    <ListContainer>
      {filteredArray?.map(card => {
        return (
          <Card
            deleteCharacter={addDeletedCharactersId}
            card={card}
            key={card.id}
          />
        );
      })}
    </ListContainer>
  );
};
