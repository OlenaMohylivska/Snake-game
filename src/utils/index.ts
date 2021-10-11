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

export const { innerWidth: screenWidth, innerHeight: screenHeight } = window;
export const maxBoardHeight = screenHeight - 140;

export const useMobileQuery = () =>
  useMediaQuery('(max-width: 720px)', { noSsr: true });

export const useTabletQuery = () =>
  useMediaQuery('(max-width: 1152px)', { noSsr: true });

export const useDesktopQuery = () =>
  useMediaQuery('(min-width: 1200px)', { noSsr: true });
