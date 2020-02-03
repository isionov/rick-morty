import React, { useState, useCallback, useEffect } from 'react';
import { debounce, throttle, Cancelable } from 'lodash';
import { gql } from 'apollo-boost';
import { useQuery, useLazyQuery, useApolloClient } from '@apollo/react-hooks';

interface Character {
  id: number;
  name: string;
  image: string;
}

interface CharactersData {
  rocketInventory: Character[];
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

// const GET_LOCAL_CHARACTERS = gql`
//   query Characters($name: String) {
//     characters(filter: { name: $name }) @client {
//       results @client {
//         name
//         image
//         id
//       }
//     }
//   }
// `;
const GET_FILTER = gql`
  query Filter {
    filter @client
  }
`;

export const Search: React.FC = () => {
  const [cards, setCards] = useState([]);
  const [name, setName] = useState('');

  const [getCharactersByName, { loading, data }] = useLazyQuery<
    CharactersData,
    CharactersVars
  >(GET_CHARACTERS_BY_NAME);

  const localData = useQuery(GET_FILTER);
  console.log('localData', localData);
  console.log('Data', data);
  const client = useApolloClient();
  console.log(
    '--->',
    client.readFragment({
      id: 'characters',
      fragment: gql`
        fragment characters on Characters {
          results
        }
      `,
    })
  );
  console.log('client', client.cache.extract());
  useEffect(() => {
    const cb = debounce((value: string) => {
      client.writeData({ data: { name: value } });
      getCharactersByName({ variables: { name: value } });
    }, 300);

    name.length > 2 && cb(name);
    return cb.cancel;
  }, [name, getCharactersByName, client]);

  const onChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const {
      currentTarget: { value },
    } = event;

    setName(value);
  };

  return <input value={name} type="text" name="name" onChange={onChange} />;
};
