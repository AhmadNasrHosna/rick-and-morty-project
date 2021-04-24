import { Box, Flex, Heading, Image, Spinner, Text } from '@chakra-ui/react';

import useFetchCharacters from '../hooks/useFetchCharacters';

const CharacterFeatureCard = ({ character }: { character: string }) => {
  const { characterData, error, loading } = useFetchCharacters(character);

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
    <>
      {characterData ? (
        <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center">
          <Image
            fallbackSrc={'/static/images/300x300.png'}
            src={characterData.image}
            loading="lazy"
          />

          <Box>
            <Box d="flex" alignItems="flex-start" maxWidth="300px" padding="1rem">
              <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="xs">
                <Heading fontSize="1rem" data-testid="character-feature-name">
                  {characterData.name}
                </Heading>
                <Text data-testid="character-feature-info">
                  From {characterData.origin.name}, identifies as {characterData.gender} of{' '}
                  {characterData.species} race.
                </Text>
                <Text data-testid="character-feature-status">
                  Current Status {characterData.status}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box data-testid="character-info-not-found">Info not found.</Box>
      )}
    </>
  );
};

export default CharacterFeatureCard;
