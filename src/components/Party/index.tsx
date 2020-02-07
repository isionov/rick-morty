import React, { useState, useCallback, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Title } from './Title';
import { CardContainer } from '../Card/CardContainer';
import { StyledImage } from '../Card/StyledImage';
import { PartyContainer } from './PartyContainer';
import { PartyContant } from './PartyContant';
const GET_RICK = gql`
  query GetRic {
    partyRick @client(always: true) {
      id
      name
      image
    }
  }
`;

const GET_MORTY = gql`
  query GetMorty {
    partyMorty @client(always: true) {
      id
      name
      image
    }
  }
`;

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
  const { data: partyRick } = useQuery(GET_RICK);
  const rick = partyRick && partyRick.partyRick.image;
  const { data: partyMorty } = useQuery(GET_MORTY);
  const morty = partyMorty && partyMorty.partyMorty.image;

  const { data } = useQuery(GET_PARTY);
  console.log('data!!!1', rick);
  console.log('data!!!3', morty);
  console.log('data!!!3', data);
  return (
    <PartyContainer>
      <Title>Party</Title>
      <PartyContant>
        <CardContainer>
          <StyledImage imageUrl={rick}>Rick</StyledImage>
        </CardContainer>
        <CardContainer>
          <StyledImage imageUrl={morty}>Morty</StyledImage>
        </CardContainer>
      </PartyContant>
    </PartyContainer>
  );
};
