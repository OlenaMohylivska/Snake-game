import { useMediaQuery } from '@material-ui/core';

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

export const useMobileQuery = () =>
  useMediaQuery('(max-width: 600px)', { noSsr: true });
export const useHorizontalMobileQuery = () =>
  useMediaQuery('(max-height:600px)', { noSsr: true });
export const useTabletQuery = () =>
  useMediaQuery('(max-width: 768px)', { noSsr: true });
