import React from 'react';
import { Box, LinkBox, LinkOverlay, Icon, HStack, VStack, Text } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { RiGitRepositoryLine } from 'react-icons/ri';
import { AiOutlineStar } from 'react-icons/ai';

import { Repository } from '../graphql/generated';
import { numberFormatter } from '../helpers';

type Props = {
  item: Repository;
};

export const RepositoryListItem = ({
  item: { description, nameWithOwner, name, owner, stargazerCount, licenseInfo, primaryLanguage },
}: Props) => {
  return (
    <Box p={4}>
      <HStack align="flex-start">
        <Icon as={RiGitRepositoryLine} mt={1} />

        <VStack align="flex-start" spacing={1}>
          <Box>
            <LinkBox
              color="blue.500"
              fontSize="md"
              fontWeight="semibold"
              lineHeight="tight"
              isTruncated
              cursor="pointer"
            >
              <LinkOverlay as={ReactRouterLink} to={`${owner.login}/${name}`}>
                {nameWithOwner}
              </LinkOverlay>
            </LinkBox>
          </Box>

          <Text fontSize="sm">{description}</Text>

          <HStack>
            <Box display="flex" alignItems="center">
              <Icon as={AiOutlineStar} w={4} h={4} />
              <Text fontSize="xs" ml={1}>
                {numberFormatter(stargazerCount)}
              </Text>
            </Box>

            {primaryLanguage && (
              <Box display="flex" alignItems="center">
                <Box w={3} h={3} borderRadius="full" bgColor={primaryLanguage.color || 'gray'} />
                <Text fontSize="xs" ml={1}>
                  {primaryLanguage.name}
                </Text>
              </Box>
            )}

            {licenseInfo && <Text fontSize="xs">License: {licenseInfo?.name}</Text>}
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};
