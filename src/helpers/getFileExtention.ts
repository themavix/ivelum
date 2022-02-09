export const getFileExtention = (filename?: string): string | undefined => {
  if (filename) {
    return filename.split('.').pop()?.toLowerCase();
  }

  return undefined;
};
