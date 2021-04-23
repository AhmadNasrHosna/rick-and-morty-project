import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Spinner, Text } from '@chakra-ui/react';
import axios from 'axios';

import { EPISODES_URL } from './constants/urls';
import CardWrapper from './components/CardWrapper';
import { axiosEpisodeTypes } from '../type';

function App() {
  const [episodeList, setEpisodeList] = useState<axiosEpisodeTypes>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<axiosEpisodeTypes>(`${EPISODES_URL}`);
        console.log({ data });
        setLoading(false);
        setEpisodeList(data);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchEpisodes();
  }, []);

  if (loading) {
    <Flex width="100%" justifyContent="flex-start" alignItems="center" flexDirection="column">
      <Spinner size="lg" />
    </Flex>;
  }

  if (error) {
    <Flex width="100%" justifyContent="flex-start" alignItems="center" flexDirection="column">
      <Text>{error}</Text>
    </Flex>;
  }

  return (
    <Flex
      width="100%"
      justifyContent="flex-start"
      alignItems="center"
      flexDirection="column"
      padding="1rem"
    >
      <Box borderRadius="0.5rem" border="1px solid black" marginBottom="2rem">
        <Flex
          maxWidth="1100px"
          justifyContent="flex-start"
          width="100%"
          marginBottom="1rem"
          marginTop="1rem"
          borderBottom="1px solid black"
          padding="1rem"
        >
          <Button>Episode</Button>
          <Button>Locations</Button>
        </Flex>
        <Flex flexDirection="column" maxWidth="1100px" padding="1rem">
          {episodeList?.results?.map((episode) => (
            <CardWrapper {...episode} key={`${episode.id}${episode.name}`} />
          ))}
        </Flex>
      </Box>
    </Flex>
  );
}

export default App;
