import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { StyledCardContainer, StyledImage } from '../Card/StyledComponents';
import {
  StyledPartyContainer,
  StyledPartyContent,
  StyledTitle,
} from './StyledComponents';
import { PARTY_STATE } from '../../GQLQueries';
import { OnParty } from '../../Types';

export const Party = () => {
  const { data } = useQuery<OnParty, any>(PARTY_STATE);
  const rick = data?.party?.rick?.image;
  const morty = data?.party?.morty?.image;

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
