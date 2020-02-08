export type Character = {
  id: string;
  name: string;
  image: string;
};

export type Characters = {
  results: Character[];
};

export type OnParty = {
  party: {
    rick: {
      image: string;
    };
    morty: {
      image: string;
    };
  };
};
