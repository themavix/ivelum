import React from 'react';
import { Box, Center, Alert, AlertIcon } from '@chakra-ui/react';

import { Blob } from '../graphql/generated';
import { NormalizedTreeEntry } from '../types';

type Props = {
  entry: NormalizedTreeEntry | null;
};

export const NodeItem = ({ entry }: Props) => {
  const node = entry?.object as Blob;

  if (node?.isBinary) {
    return (
      <Center>
        <Alert status="info" fontSize="md">
          <AlertIcon />
          Binary files preview is not implemented.
        </Alert>
      </Center>
    );
  }

  return <Box p={3}>{node?.text && <pre>{node.text}</pre>}</Box>;
};
