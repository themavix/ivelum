import React, { ChangeEvent } from 'react';
import { Input } from '@chakra-ui/react';
import debounce from 'debounce';

type Props = {
  onSearch(value: string): void;
};

export const Search = ({ onSearch }: Props) => {
  return (
    <Input
      size="lg"
      variant="filled"
      placeholder="Search for public repositories"
      onChange={debounce((e: ChangeEvent<HTMLInputElement>) => onSearch(e.target.value), 500)}
    />
  );
};
