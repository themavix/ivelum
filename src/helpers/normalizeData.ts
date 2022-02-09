import { sort } from '.';
import { TreeEntry } from '../graphql/generated';
import { NormalizedTreeEntry } from '../types';

export const normalizeData = (data: TreeEntry[]): NormalizedTreeEntry[] => {
  return sort(data).map((node: TreeEntry) => {
    return {
      ...node,
      children: [],
    };
  });
};
