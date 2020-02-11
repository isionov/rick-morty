import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Card } from '../Card';
import styled from 'styled-components';
import { Characters } from '../../Types';
import { LOCAL_CHARACTERS } from '../../GQLQueries';
import { cardFilter } from '../../helpers';

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
  const allCards = data?.characters?.results;
  const filteredArray = cardFilter(allCards, deletedCharactersId);

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
