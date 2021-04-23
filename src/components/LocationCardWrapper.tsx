import React, { useState } from 'react';
import { Box, Text, SimpleGrid, Button } from '@chakra-ui/react';

import CharacterFeatureCard from './CharacterFeatureCard';

type EpisodeCardWrapperProps = {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
};

const EpisodeCardWrapper = ({ id, name, type, dimension, residents }: EpisodeCardWrapperProps) => {
  const [loadCount, setLoadCount] = useState(6);
  const [counter, setCounter] = useState(1);

  const totalPage = Math.ceil(residents.length / 6);

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
          This is a {type} located in {dimension}. There are total of {residents.length} residents
          that are originated from here.
        </Text>
      </Box>
      <SimpleGrid columns={3} spacing={4} padding="1rem">
        {residents.slice(0, loadCount).map((resident) => (
          <CharacterFeatureCard key={resident} character={resident} />
        ))}
        <Box />
        <Button
          colorScheme="blue"
          size="lg"
          onClick={handleLoadMore}
          display={counter === totalPage || residents.length === 0 ? 'none' : ''}
        >
          Load More
        </Button>
        <Box />
      </SimpleGrid>
    </Box>
  );
};

export default EpisodeCardWrapper;
