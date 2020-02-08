import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { StyledTitle } from './StyledTitle';
import { StyledCardContainer } from '../Card/StyledCardContainer';
import { StyledImage } from '../Card/StyledImage';
import { StyledPartyContainer } from './StyledPartyContainer';
import { StyledPartyContent } from './StyledPartyContent';
import { PARTY_STATE } from '../../GQLQueries';
import { OnParty } from '../../Types';

export const Party = () => {
  const { data } = useQuery<OnParty, any>(PARTY_STATE);
  const rick = data && data.party.rick.image;
  const morty = data && data.party.morty.image;

  return (
    <StyledPartyContainer>
      <StyledTitle>Party</StyledTitle>
      <StyledPartyContent>
        <StyledCardContainer>
          <StyledImage imageUrl={rick || ''}>Rick</StyledImage>
        </StyledCardContainer>
        <StyledCardContainer>
          <StyledImage imageUrl={morty || ''}>Morty</StyledImage>
        </StyledCardContainer>
      </StyledPartyContent>
    </StyledPartyContainer>
  );
};
