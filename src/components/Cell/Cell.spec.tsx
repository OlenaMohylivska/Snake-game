import React from 'react';
import { Cell } from './Cell';
import { shallow } from 'enzyme';
import { describe, it, expect } from '@jest/globals';

describe('Test cell component', () => {
  const wrapper = shallow(<Cell color='green' />);

  it('should render cell component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should exist class "cell"', () => {
    const cell = wrapper.find('.cell');
    expect(cell.length).toBe(1);
  });

  it('should contain passed class "green"', () => {
    const cell = wrapper.find('.cell');
    expect(cell.hasClass('green')).toBe(true);
  });
});
