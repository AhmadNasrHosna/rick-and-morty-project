import React, { useCallback, useEffect, useState } from 'react';
import { Box, Flex, Heading, Image, Spinner, Text } from '@chakra-ui/react';
import axios from 'axios';

import { axiosCharactersTypes } from '../../type';

const FeatureCard = ({ character }: { character: string }) => {
  const [characterData, setCharacterData] = useState<axiosCharactersTypes>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const fetchCharacters = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<axiosCharactersTypes>(character);
      setLoading(false);
      setCharacterData(data);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCharacters();
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
    <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center">
      <Image fallbackSrc={'/static/images/300x300.png'} src={characterData?.image} loading="lazy" />

      <Box>
        <Box
          d="flex"
          alignItems="flex-start"
          maxWidth="300px"
          padding="1rem"
          borderX="0.3px solid black"
          borderBottom="1px solid black"
        >
          <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="xs">
            <Heading fontSize="1rem">{characterData?.name}</Heading>
            <Text>
              From {characterData?.origin.name}, identifies as {characterData?.gender} of{' '}
              {characterData?.species} race.
            </Text>
            <Text>Current Status {characterData?.status}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FeatureCard;
