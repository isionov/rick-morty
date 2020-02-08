import styled from 'styled-components';

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
