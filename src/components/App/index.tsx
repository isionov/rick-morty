import React from 'react';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { createHttpLink } from 'apollo-link-http';
import { Search } from '../Search';
import { List } from '../List';

const cache = new InMemoryCache();
const link = createHttpLink({ uri: 'https://rickandmortyapi.com/graphql' });

// cache.writeData({
//   data: {
//     characters: {
//       __typename: 'Characters',
//       results: [{ __typename: 'Character' }],
//     },
//   },
// });

cache.writeData({
  data: {
    name: '1',
  },
});

const client = new ApolloClient({
  cache,
  link,
  resolvers: {
    Query: {
      getLocalCharacter: (_root, variables, { cache, getCacheKey }) => {
        console.log(
          _root,
          '!!!!',
          variables,
          'Ololo!!!',
          getCacheKey({ __typename: 'Characters' })
        );
      },
    },
  },
});

export const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Search />
      {/* <List /> */}
    </ApolloProvider>
  );
};
