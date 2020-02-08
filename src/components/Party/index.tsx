import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Title } from './Title';
import { CardContainer } from '../Card/CardContainer';
import { StyledImage } from '../Card/StyledImage';
import { PartyContainer } from './PartyContainer';
import { PartyContant } from './PartyContant';

const PartyState = gql`
  query Party {
    party @client(always: true) {
      rick {
        id
        name
        image
      }
      morty {
        id
        name
        image
      }
    }
  }
`;
interface OnParty {
  party: {
    rick: {
      image: string;
    };
    morty: {
      image: string;
    };
  };
}

export const Party = () => {
  const { data } = useQuery<OnParty, any>(PartyState);
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
