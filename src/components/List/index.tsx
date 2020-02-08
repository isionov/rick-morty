import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Card } from '../Card';
import styled from 'styled-components';
import { Character, Characters } from '../../Types';
import { LOCAL_CHARACTERS } from '../../GQLQueries';
const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
  const { data } = useQuery<CharactersData, CharactersVars>(LOCAL_CHARACTERS);

  const filteredArray = data?.characters.results.filter(({ id }: Character) => {
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
