import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createRequest } from 'urql';
import { pipe, subscribe } from 'wonka';
import {
  Alert,
  AlertIcon,
  Heading,
  Box,
  Icon,
  Flex,
  Center,
  Spinner,
  useBoolean,
  useToast,
} from '@chakra-ui/react';
import { RiGitRepositoryLine } from 'react-icons/ri';
import { Tree, RepositoryQuery } from '../graphql/generated';

import { Tree as TreeNodes } from '../components/Tree';
import { NodeItem } from '../components/NodeItem';
import { client } from '../index';
import { getUpdatedData, normalizeData } from '../helpers';
import { NormalizedTreeEntry } from '../types';

const Query = `
  query repository($owner: String!, $name: String!, $expression: String!) {
    repository(owner: $owner, name: $name) {
      object(expression: $expression) {
        ... on Tree {
          entries {
            oid
            name
            type
            mode
            object {
              ... on Blob {
                id
                text
                isBinary
              }
            }
          }
        }
      }
    }
  }
`;

export const Repository = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useBoolean(true);
  const [fetchError, setFetchError] = useBoolean();
  const { owner, name } = useParams();
  const [treeData, setTreeData] = useState<NormalizedTreeEntry[]>([]);
  const [selectedTreeEntry, setSelectedTreeEntry] = useState<NormalizedTreeEntry | null>(null);

  const fetchInitialData = (path = '') => {
    setFetchError.off();
    const request = createRequest<RepositoryQuery>(Query, { owner, name, expression: `HEAD:${path}` });

    pipe(
      client.executeQuery(request),
      subscribe(({ data, error }) => {
        if (error) {
          setFetchError.on();
          setIsLoading.off();
        }

        const result = data?.repository?.object as Tree;

        if (result?.entries) {
          setIsLoading.off();
          const normalizedData = normalizeData(result.entries);
          setTreeData(normalizedData);

          const readme = normalizedData.find((entry: NormalizedTreeEntry) => entry.name.toLowerCase() === 'readme.md');

          if (readme) {
            setSelectedTreeEntry(readme);
          }
        }
      }),
    );
  };

  const fetchNode = (id: string, path = '') => {
    const request = createRequest<RepositoryQuery>(Query, { owner, name, expression: `HEAD:${path}` });

    pipe(
      client.executeQuery(request),
      subscribe(({ data, error }) => {
        if (error) {
          setIsLoading.off();
          toast({
            title: 'Something went wrong.',
            position: 'top',
            isClosable: true,
          });
        }

        const result = data?.repository?.object as Tree;

        if (result?.entries) {
          const updatedData = getUpdatedData(treeData, id, normalizeData(result.entries));
          setTreeData(updatedData);
        }
      }),
    );
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  if (isLoading) {
    return (
      <Center>
        <Spinner
          thickness="4px"
          speed="0.65s"
          size="xl"
          color="blue.500"
          emptyColor='gray.200'
        />
      </Center>
    );
  }

  if (fetchError) {
    return (
      <Center>
        <Alert status="error" fontSize="md">
          <AlertIcon />
          Something went wrong.
        </Alert>
      </Center>
    );
  }

  return (
    <Box>
      <Center mb={5}>
        <Heading size="xl" height="40px" display="flex" alignItems="center">
          <Icon as={RiGitRepositoryLine} mt={1} mr={2}/>
          {name}
        </Heading>
      </Center>

      <Flex
        justify="stretch"
        align="flex-start"
        spacing={0}
        p={5}
        width="100vw"
        height="calc(100vh - 140px)"
      >
        <Box flexBasis="200px" flexShrink={0} height="100%" overflow="auto">
          <TreeNodes data={treeData} fetchNode={fetchNode} setSelectedTreeEntry={setSelectedTreeEntry} />
        </Box>

        <Box
          borderRadius="md"
          borderWidth="1px"
          fontSize="xs"
          height="100%"
          overflow="auto"
          flex={1}
        >
          <NodeItem entry={selectedTreeEntry} />
        </Box>
      </Flex>
    </Box>
  );
};
