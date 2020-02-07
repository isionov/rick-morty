import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Title } from './Title';
import { CardContainer } from '../Card/CardContainer';
import { StyledImage } from '../Card/StyledImage';
import { PartyContainer } from './PartyContainer';
import { PartyContant } from './PartyContant';

const GET_PARTY = gql`
  query GetParty {
    charactersOnParty @client(always: true) {
      id
      name
      image
    }
  }
`;

export const Party = () => {
  const { data } = useQuery(GET_PARTY);
  const rickImage =
    data.charactersOnParty[0] && data.charactersOnParty[0].image;
  const mortyImage =
    data.charactersOnParty[1] && data.charactersOnParty[1].image;
  return (
    <PartyContainer>
      <Title>Party</Title>
      <PartyContant>
        <CardContainer>
          <StyledImage imageUrl={rickImage}>Rick</StyledImage>
        </CardContainer>
        <CardContainer>
          <StyledImage imageUrl={mortyImage}>Morty</StyledImage>
        </CardContainer>
      </PartyContant>
    </PartyContainer>
  );
};
