import React from 'react';
import { Cell } from './Cell';
import { shallow } from 'enzyme';
import { describe, it, expect } from '@jest/globals';

describe('Test cell component', () => {
  it('should render cell', () => {
    const cell = shallow(<Cell color='green' />);
    const isCell = cell.find('.green');

    expect(isCell.length).toBe(1);
  });
});
