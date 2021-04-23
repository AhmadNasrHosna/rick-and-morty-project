import React, { useEffect } from 'react';

import axios from 'axios';

import { axiosEpisodeTypes } from '../../type';
import { EPISODES_URL } from '../constants/urls';

type useInitialEpisodesProps = {
  setEpisodeList: React.Dispatch<React.SetStateAction<axiosEpisodeTypes | undefined>>;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const useInitialEpisodes = ({ setEpisodeList, setError, setLoading }: useInitialEpisodesProps) => {
  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<axiosEpisodeTypes>(`${EPISODES_URL}`);
        setLoading(false);
        setEpisodeList(data);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchEpisodes();
  }, []);
};

export default useInitialEpisodes;
