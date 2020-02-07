import React from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { CustomButton } from './CustomButton';
import { CardContainer } from './CardContainer';
import { StyledImage } from './StyledImage';
import { ReactComponent as Logo } from './close.svg';
type Card = {
  id: number;
  name: string;
  image: string;
};

type Props = {
  deleteCharacter: Function;
  card: Card;
};

const ADD_CHARACTER_TO_PARTY = gql`
  mutation AddCharacterToParty($character: Character!) {
    addCharacterToParty(character: $character) @client
  }
`;

export const Card = ({ card, deleteCharacter }: Props) => {
  const { id, image } = card;
  const [sendToParty] = useMutation(ADD_CHARACTER_TO_PARTY, {
    variables: { character: card },
  });
  const onDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteCharacter((oldArray: []) => [...oldArray, id]);
  };
  const onAdd = () => {
    sendToParty(ADD_CHARACTER_TO_PARTY);
  };

  return (
    <CardContainer onClick={onAdd}>
      <StyledImage imageUrl={image}>Rick</StyledImage>
      <CustomButton type="button" onClick={onDelete}>
        <Logo width="10px" />
      </CustomButton>
    </CardContainer>
  );
};
