import React from 'react';
import { Cell } from '../Cell';
import { shallow } from 'enzyme';
import { describe, it, expect } from '@jest/globals';

describe('Test cell component', () => {
  it('should render cell component', () => {
    const wrapper = shallow(<Cell color='green' />);
    expect(wrapper.length).toEqual(1);
  });

  it('should exist class "cell"', () => {
    const wrapper = shallow(<Cell color='green' />);
    const cell = wrapper.find('.cell');
    expect(cell.length).toBe(1);
  });

  it('should contain passed class "green"', () => {
    const wrapper = shallow(<Cell color='green' />);
    const cell = wrapper.find('.cell');
    expect(cell.hasClass('green')).toBe(true);
  });
});
