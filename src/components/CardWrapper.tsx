import React, { useState } from 'react';
import { Box, Text, SimpleGrid, Button } from '@chakra-ui/react';

import FeatureCard from './FeatureCard';

type CardWrapperProps = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url?: string;
  created?: string;
};

const CardWrapper = ({ id, name, air_date, episode, characters }: CardWrapperProps) => {
  const [loadCount, setLoadCount] = useState(6);
  const [counter, setCounter] = useState(1);

  const totalPage = Math.ceil(characters.length / 6);

  const handleLoadMore = () => {
    if (counter < totalPage) {
      setLoadCount((prevState) => prevState + 6);
      setCounter((prevState) => prevState + 1);
    }
  };

  return (
    <Box borderRadius="0.3rem" border="1px solid black" marginBottom="2rem">
      <Box borderBottom="1px solid black" padding="1rem">
        <Text>
          #{id}-{name}
        </Text>
      </Box>
      <Box padding="1rem">
        <Text>
          This is {episode}st episode in {id}st session. It was aired on {air_date}. There are total
          of {characters.length} featured characters in this episode.
        </Text>
      </Box>
      <SimpleGrid columns={3} spacing={4} padding="1rem">
        {characters.slice(0, loadCount).map((character) => (
          <FeatureCard key={character} character={character} />
        ))}
        <Box />
        <Button
          colorScheme="blue"
          size="lg"
          onClick={handleLoadMore}
          display={counter === totalPage ? 'none' : ''}
        >
          Load More
        </Button>
        <Box />
      </SimpleGrid>
    </Box>
  );
};

export default CardWrapper;
