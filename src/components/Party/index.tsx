import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Title } from './Title';
import { CardContainer } from '../Card/CardContainer';
import { StyledImage } from '../Card/StyledImage';
import { PartyContainer } from './PartyContainer';
import { PartyContant } from './PartyContant';
import { PARTY_STATE } from '../../GQLQueries';
import { OnParty } from '../../Types';

export const Party = () => {
  const { data } = useQuery<OnParty, any>(PARTY_STATE);
  const rick = data && data.party.rick.image;
  const morty = data && data.party.morty.image;

  return (
    <PartyContainer>
      <Title>Party</Title>
      <PartyContant>
        <CardContainer>
          <StyledImage imageUrl={rick || ''}>Rick</StyledImage>
        </CardContainer>
        <CardContainer>
          <StyledImage imageUrl={morty || ''}>Morty</StyledImage>
        </CardContainer>
      </PartyContant>
    </PartyContainer>
  );
};
