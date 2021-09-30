import React from 'react';
import { hasDuplicates } from './index';
import { expect, test } from '@jest/globals';

test('should return boolean', () => {
  const result = hasDuplicates([1, 2, 1]);
  expect(result).toEqual(true);
});
