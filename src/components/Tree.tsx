import React from 'react';
import { 
  Accordion, 
  AccordionItem,
  AccordionButton, 
  AccordionPanel, 
  VStack, 
  Text, 
  Icon,
  Box,
} from '@chakra-ui/react';
import { AiOutlineFile, AiOutlineFolder } from 'react-icons/ai';
import { NormalizedTreeEntry } from '../types';

type Props = {
  data: NormalizedTreeEntry[];
  path?: string;
  setSelectedTreeEntry(entry: NormalizedTreeEntry): void;
  fetchNode(path: string, id: string): void;
};

export const Tree = ({ data, path = '', setSelectedTreeEntry, fetchNode }: Props) => {
  if (!data) {
    return null;
  }

  return (
    <VStack spacing={1} alignItems="flex-start">
      {data.map((entry: NormalizedTreeEntry) => {
        if (entry.type === 'tree') {
          const newPath = path ? `${path}/${entry.name}` : entry.name;

          return (
            <Accordion
              key={entry.name}
              w={'100%'}
              allowMultiple
              onChange={() => {
                fetchNode(entry.oid, newPath);
              }}
            >
              <AccordionItem border={0}>
                <AccordionButton
                  p={0}
                  m={0}
                  fontSize="sm"
                  w="100%"
                  boxShadow="unset"
                  _focus={{ boxShadow: 'none' }}
                  alignItems="flex-start"
                >
                  <Icon as={AiOutlineFolder} mt={1} />
                  <Text ml={1} whiteSpace="nowrap">
                    {entry.name}
                  </Text>
                </AccordionButton>

                <AccordionPanel p={1} pl={3}>
                  {entry.children && (
                    <Tree
                      fetchNode={fetchNode}
                      data={entry.children}
                      setSelectedTreeEntry={setSelectedTreeEntry}
                      path={newPath}
                    />
                  )}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          );
        }

        return (
          <Box
            key={entry.name}
            display="flex"
            alignItems="flex-start"
            onClick={() => {
              if (entry) {
                setSelectedTreeEntry(entry);
              }
            }}
            fontSize="sm"
            cursor="pointer"
            w="100%"
            _hover={{ background: 'blackAlpha.50' }}
          >
            <Icon as={AiOutlineFile} mt={1} />
            <Text ml={1}>{entry.name}</Text>
          </Box>
        );
      })}
    </VStack>
  );
};
