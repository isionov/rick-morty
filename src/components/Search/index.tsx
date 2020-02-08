import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { useLazyQuery } from '@apollo/react-hooks';
import { StyledInput } from './StyledInput';
import { StyledInputContainer } from './StyledInputContainer';
import { Characters } from '../../Types';
import { GET_CHARACTERS_BY_NAME } from '../../GQLQueries';
import { mayRequest } from '../../helpers';
type CharactersVars = {
  name: string;
};

export const Search: React.FC = () => {
  const [name, setName] = useState('');

  const [getCharactersByName] = useLazyQuery<Characters, CharactersVars>(
    GET_CHARACTERS_BY_NAME,
    { fetchPolicy: 'network-only' }
  );

  useEffect(() => {
    const cb = debounce((value: string) => {
      getCharactersByName({ variables: { name: value } });
    }, 300);

    mayRequest(name) && cb(name);
    return cb.cancel;
  }, [name, getCharactersByName]);

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
