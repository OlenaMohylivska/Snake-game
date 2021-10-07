import React from 'react';
import { hasDuplicates } from './index';
import { expect, it, describe } from '@jest/globals';

describe('Test hasDuplicates function', () => {
  it('should return true with repeating numbers', () => {
    const result = hasDuplicates([1, 2, 1]);
    expect(result).toEqual(true);
  });
  it('should return false without repeating numbers', () => {
    const result = hasDuplicates([1, 2, 3]);
    expect(result).toEqual(false);
  });
  it('should return false with empty array', () => {
    const result = hasDuplicates([]);
    expect(result).toEqual(false);
  });
});
