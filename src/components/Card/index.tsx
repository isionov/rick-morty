import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { StyledButton } from './StyledButton';
import { StyledCardContainer } from './StyledCardContainer';
import { StyledImage } from './StyledImage';
import { ReactComponent as Logo } from './close.svg';
import { Character } from '../../Types';
import { ADD_CHARACTER_TO_PARTY } from '../../GQLQueries';
type Props = {
  deleteCharacter: Function;
  card: Character;
};

export const Card = ({ card, deleteCharacter }: Props) => {
  const { id, image } = card;
  const [sendToParty] = useMutation(ADD_CHARACTER_TO_PARTY, {
    variables: { character: card },
  });
  const onDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteCharacter((oldArray: string[]) => [...oldArray, id]);
  };
  const onAdd = () => {
    sendToParty(ADD_CHARACTER_TO_PARTY);
  };

  return (
    <StyledCardContainer onClick={onAdd}>
      <StyledImage imageUrl={image}>Rick</StyledImage>
      <StyledButton type="button" onClick={onDelete}>
        <Logo width="10px" />
      </StyledButton>
    </StyledCardContainer>
  );
};
