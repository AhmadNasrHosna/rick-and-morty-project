import React from 'react';
import { Flex, Button } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

import * as ROUTES from '../constants/routes';

const Navbar = () => {
  return (
    <Flex
      justifyContent="flex-start"
      width="100%"
      marginBottom="1rem"
      borderBottom="1px solid black"
      padding="1rem"
    >
      <Button colorScheme="blue" marginRight="1rem">
        <NavLink to={ROUTES.EPISODES}>Episodes</NavLink>
      </Button>
      <Button colorScheme="blue">
        <NavLink to={ROUTES.LOCATIONS}>Locations</NavLink>
      </Button>
    </Flex>
  );
};

export default Navbar;
