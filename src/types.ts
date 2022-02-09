import { TreeEntry } from './graphql/generated';

export interface NormalizedTreeEntry extends TreeEntry {
  children: NormalizedTreeEntry[];
}
