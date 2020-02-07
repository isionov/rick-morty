import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';
import { StyledInput } from './StyledInput';
import { InputContainer } from './InputContainer';
interface Character {
  id: number;
  name: string;
  image: string;
}

interface CharactersData {
  results: Character[];
}

interface CharactersVars {
  name: string;
}

const GET_CHARACTERS_BY_NAME = gql`
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

export const Search: React.FC = () => {
  const [name, setName] = useState('');

  const [getCharactersByName] = useLazyQuery<CharactersData, CharactersVars>(
    GET_CHARACTERS_BY_NAME,
    { fetchPolicy: 'network-only' }
  );

  useEffect(() => {
    const cb = debounce((value: string) => {
      getCharactersByName({ variables: { name: value } });
    }, 300);

    name.length > 2 && cb(name);
    return cb.cancel;
  }, [name, getCharactersByName]);

  const onChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const {
      currentTarget: { value },
    } = event;

    setName(value);
  };

  return (
    <InputContainer>
      <StyledInput value={name} type="text" name="name" onChange={onChange} />
    </InputContainer>
  );
};
