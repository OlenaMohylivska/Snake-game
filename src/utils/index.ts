export const hasDuplicates = (array: number[]): boolean => {
  return new Set(array).size !== array.length;
};

export const getAllNamesFromLS = (): string[] => {
  const allNames = [];
  for (let i = 0; i < localStorage.length; i++) {
    allNames.push(localStorage.key(i) as string);
  }
  return allNames;
};
