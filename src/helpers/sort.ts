import { TreeEntry } from '../graphql/generated';

export const sort = (data: TreeEntry[]) => {
  return data.sort((a: TreeEntry, b: TreeEntry) => {
    if (a.mode > b.mode) {
      return 1;
    }

    if (a.mode < b.mode) {
      return -1;
    }

    if (a.name > b.name) {
      return 1;
    }

    if (a.name > b.name) {
      return -1;
    }

    return 0;
  });
};
