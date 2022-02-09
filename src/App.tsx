import React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  Flex,
} from '@chakra-ui/react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Logo } from './components/Logo';
import { Home } from './pages/Home';
import { Repository } from './pages/Repository';
import { ColorModeSwitcher } from './components/ColorModeSwitcher';

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box fontSize="xl">
          <Grid>
            <Box padding="4">
              <Flex justify="space-between">
                <Logo />
                <ColorModeSwitcher justifySelf="flex-end" />
              </Flex>
            </Box>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path=":owner/:name" element={<Repository />} />
              <Route
                path="*"
                element={<Navigate to="/" />}
              />
            </Routes>
          </Grid>
        </Box>
    </ChakraProvider>
  );
};
