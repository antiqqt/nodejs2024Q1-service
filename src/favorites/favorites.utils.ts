export const transformExcludeIsFavorite = <T extends { isFavorite: boolean }>(obj: T) => {
  const { isFavorite, ...rest } = obj;
  return rest;
};
