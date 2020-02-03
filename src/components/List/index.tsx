import React, { useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useApolloClient } from '@apollo/react-hooks';

const LocalCharacters = gql`
  query LocalCharacters {
    characters @client
  }
`;

export const List: React.FC = props => {
  const { data } = useQuery(LocalCharacters);
  //   console.log(data);
  useEffect(() => console.log('Trololo'), [data]);
  return <span>HW in List</span>;
  //   return (
  //     characters &&
  //     characters.map(({ name, image, id }) => {
  //       const onClick = event => {
  //         console.log(id);
  //       };

  //       return (
  //         <div id={id}>
  //           <image src={image} />
  //           <button type="button" onClick={onClick}>
  //             close
  //           </button>
  //         </div>
  //       );
  //     })
  //   );
};
