import React from 'react';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient, gql } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { createHttpLink } from 'apollo-link-http';
import { Search } from '../Search';
import { List } from '../List';
import { Party } from '../Party';
import { Container } from '../StyledContainer';
import { PARTY_STATE } from '../../GQLQueries';
import { Character } from '../../Types';
import { isOurPartyPerson } from '../../helpers';

const cache = new InMemoryCache();
const link = createHttpLink({ uri: 'https://rickandmortyapi.com/graphql' });

const typeDefs = gql`
  type Query {
    charactersOnParty: [Character]!
    party: Party!
  }
  type Party {
    rick: Character!
    morty: Character!
  }
`;

cache.writeData({
  data: {
    characters: {
      __typename: 'Characters',
      results: [],
    },
    party: {
      __typename: 'Party',
      rick: {
        __typename: 'Character',
        id: 'rickInitial',
        name: null,
        image: null,
      },
      morty: {
        __typename: 'Character',
        id: 'mortyInitial',
        name: null,
        image: null,
      },
    },
  },
});

const client = new ApolloClient({
  cache,
  link,
  typeDefs,
  resolvers: {
    Mutation: {
      addCharacterToParty: (
        _parent,
        { character }: { character: Character },
        { cache }
      ) => {
        const data = cache.readQuery({
          query: PARTY_STATE,
        });
        isOurPartyPerson(character.name, 'Rick') &&
          cache.writeData({
            data: {
              party: { ...data.party, rick: character },
            },
          });

        isOurPartyPerson(character.name, 'Morty') &&
          cache.writeData({
            data: {
              party: { ...data.party, morty: character },
            },
          });

        return null;
      },
    },
  },
});

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <Container>
        <Search />
        <List />
        <Party />
      </Container>
    </ApolloProvider>
  );
};
