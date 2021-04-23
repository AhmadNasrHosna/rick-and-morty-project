export type axiosEpisodeTypes = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: [
    {
      id: number;
      name: string;
      air_date: string;
      episode: string;
      characters: string[];
      url: string;
      created: string;
    },
  ];
};

export type axiosCharactersTypes = {
  id: number;
  name: string;
  origin: {
    name: string;
  };
  gender: string;
  species: string;
  status: string;
  image: string;
};
