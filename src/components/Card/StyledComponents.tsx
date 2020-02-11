import styled from 'styled-components';

export const StyledButton = styled.button`
  position: absolute;
  display: block;
  top: 20px;
  right: 20px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledImage = styled.div`
  background-image: url(${(props: { imageUrl: string }) => props.imageUrl});
  background-position: center;
  background-size: cover;
  height: 100%;
  width: 100%;
  background-color: lightgrey;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${props => (props.imageUrl ? 0 : 35)}px;
`;

export const StyledCardContainer = styled.div`
  box-sizing: border-box;
  width: 25%;
  height: 250px;
  position: relative;
  padding-bottom: 2%;
  padding-right: ${4 / 3}%;
  padding-left: ${4 / 3}%;
`;
