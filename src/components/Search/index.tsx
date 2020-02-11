import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { StyledInput, StyledInputContainer } from './StyledComponents';
import { Characters, CharactersVars } from '../../Types';
import { GET_CHARACTERS_BY_NAME } from '../../GQLQueries';
import { debouncedFetch } from '../../helpers';

export const Search: React.FC = () => {
  const [name, setName] = useState('');

  const [getCharactersByName] = useLazyQuery<Characters, CharactersVars>(
    GET_CHARACTERS_BY_NAME,
    { fetchPolicy: 'network-only' }
  );

  useEffect(debouncedFetch(getCharactersByName, name), [
    getCharactersByName,
    name,
  ]);

  const onChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const {
      currentTarget: { value },
    } = event;

    setName(value);
  };

  return (
    <StyledInputContainer>
      <StyledInput value={name} type="text" name="name" onChange={onChange} />
    </StyledInputContainer>
  );
};
