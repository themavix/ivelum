import React, { useState } from 'react';
import { Alert, AlertIcon, VStack, Container, Spinner, Center, StackDivider } from '@chakra-ui/react';

import { Search } from '../components/Search';
import { RepositoryListItem } from '../components/RepositoryListItem';
import { Repository, useRepositoriesQuery } from '../graphql/generated';

export const Home = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [result] = useRepositoriesQuery({
    variables: { searchQuery: `${searchValue} is:public stars:>100` },
  });
  const { data, fetching, error } = result;

  return (
    <Container maxW="container.sm">
      <VStack spacing={8} justify="flex-start">
        <Container mt={4}>
          <Search onSearch={setSearchValue} />
        </Container>

        <Container>
          {fetching && (
            <Center>
              <Spinner
                thickness="4px"
                speed="0.65s"
                size="xl"
                color="blue.500"
                emptyColor='gray.200' 
              />
            </Center>
          )}

          {error && !fetching && (
            <Center>
              <Alert status="error" fontSize="md">
                <AlertIcon />
                Something went wrong. Try to search again.
              </Alert>
            </Center>
          )}

          {data?.search?.edges && data.search.edges.length === 0 && (
            <Center>
              <Alert status="info" fontSize="md">
                <AlertIcon />
                No results were found.
              </Alert>
            </Center>
          )}

          {data?.search?.edges && data.search.edges.length > 0 && (
            <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
              {data.search.edges.map(item => (
                <RepositoryListItem key={item?.cursor} item={item?.node as Repository} />
              ))}
            </VStack>
          )}
        </Container>
      </VStack>
    </Container>
  );
};
