import React from 'react';
import { Icon, Heading, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AiFillGithub } from 'react-icons/ai';

export const Logo = () => {
  return (
    <Link to="/">
      <HStack align="center">
        <Icon as={AiFillGithub} w={10} h={10} />
        <Heading size="md">GitHub code viewer</Heading>
      </HStack>
    </Link>
  );
};
