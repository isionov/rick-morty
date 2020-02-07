import React from 'react';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient, gql } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { createHttpLink } from 'apollo-link-http';
import { Search } from '../Search';
import { List } from '../List';
import { Party } from '../Party';
import { Container } from '../Container';

const LocalCharacters = gql`
  query PartyList {
    charactersOnParty @client {
      id
      name
      image
    }
  }
`;

const cache = new InMemoryCache();
const link = createHttpLink({ uri: 'https://rickandmortyapi.com/graphql' });

const typeDefs = gql`
  type Query {
    charactersOnParty: [Character]!
  }
`;

cache.writeData({
  data: {
    characters: {
      __typename: 'Characters',
      results: [],
    },
    charactersOnParty: [],
    partyRick: {
      __typename: 'Character',
    },
    partyMorty: {
      __typename: 'Character',
    },
  },
});

const client = new ApolloClient({
  cache,
  link,
  typeDefs,
  resolvers: {
    Mutation: {
      addCharacterToParty: (_parent, { character }, { cache }) => {
        const { charactersOnParty } = cache.readQuery({
          query: LocalCharacters,
        });
        ~character.name.indexOf('Rick') &&
          cache.writeData({
            data: {
              partyRick: character,
              charactersOnParty: [character, charactersOnParty[1] || null],
            },
          });

        ~character.name.indexOf('Morty') &&
          cache.writeData({
            data: {
              partyMorty: character,
              charactersOnParty: [charactersOnParty[0] || null, character],
            },
          });

        return null;
      },
    },
    Query: {},
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
