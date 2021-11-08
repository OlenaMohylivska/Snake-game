import { useMediaQuery } from '@material-ui/core';
import { useState, useEffect } from 'react';

export const useWindowDimensions = () => {
  const hasWindow = typeof window !== 'undefined';

  const getWindowDimensions = () => {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height,
    };
  };

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    if (hasWindow) {
      const handleResize = () => {
        setWindowDimensions(getWindowDimensions());
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow]);

  return windowDimensions;
};

export const hasDuplicates = (array: number[]): boolean => {
  return new Set(array).size !== array.length;
};

export const useMobileQuery = () =>
  useMediaQuery('(max-width: 720px)', { noSsr: true });

export const useTabletQuery = () =>
  useMediaQuery('(max-width: 1152px)', { noSsr: true });

export const useDesktopQuery = () =>
  useMediaQuery('(min-width: 1200px)', { noSsr: true });

export const splitFullName = (passedName: string) => {
  const name = passedName.split(' ');
  return { firstName: name[0], lastName: name[1] };
};