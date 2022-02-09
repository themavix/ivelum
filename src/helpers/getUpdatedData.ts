import { NormalizedTreeEntry } from '../types';

export const getUpdatedData = (
  data: NormalizedTreeEntry[],
  id: string,
  children: NormalizedTreeEntry[],
): NormalizedTreeEntry[] => {
  return data.map((entry: NormalizedTreeEntry) => {
    if (entry.oid === id) {
      return {
        ...entry,
        children,
      };
    }

    if (entry.children) {
      return {
        ...entry,
        children: getUpdatedData(entry.children, id, children),
      };
    }

    return entry;
  });
};
