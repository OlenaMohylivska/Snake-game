import React from 'react';
import { ScoreInfo } from '../ScoreInfo';
import { shallow } from 'enzyme';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';

describe('Test ScoreInfo component', () => {
  let wrapper: any;
  let props: any;

  beforeEach(() => {
    props = {
      snakePosition: [1, 2, 3],
      userInfo: { name: 'Ivan' },
      error: 'Some error',
      onUnmount: jest.fn(),
    };
    wrapper = shallow(<ScoreInfo {...props} />);
  });

  it('should render component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should exist class "score-info-wrapper"', () => {
    const scoreContainer = wrapper.find('.score-info-wrapper');
    expect(scoreContainer.length).toBe(1);
  });

  it('should display player name "Ivan"', () => {
    const playerContainer = wrapper.find('.player');
    const children = playerContainer.childAt(1);
    expect(children.find('.data').text()).toBe('Ivan');
  });

  it('should display number of score to equal 2', () => {
    const scoreContainer = wrapper.find('.score');
    const children = scoreContainer.childAt(1);
    expect(+children.find('.data').text()).toBe(props.snakePosition.length - 1);
  });

  it('should display error: Some error', () => {
    const errorContainer = wrapper.find('.error');
    expect(errorContainer.text()).toBe(`Error: ${props.error}`);
  });
});
