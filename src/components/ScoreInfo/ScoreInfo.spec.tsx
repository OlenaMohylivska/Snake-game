import React from 'react';
import { ScoreInfo } from './ScoreInfo';
import { shallow } from 'enzyme';
import { describe, it, expect } from '@jest/globals';

describe('Test ScoreInfo component', () => {
  const wrapper = shallow(
    <ScoreInfo
      snakePosition={[1, 2, 3]}
      userName={{ name: 'Ivan', error: '' }}
      onUnmount={(a, b) => {
        console.log(a, b);
      }}
    />
  );

  it('should render component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should exist class "score-info-wrapper"', () => {
    const cell = wrapper.find('.score-info-wrapper');
    expect(cell.length).toBe(1);
  });

  it('should display player name "Ivan"', () => {
    const playerContainer = wrapper.find('.player');
    const children = playerContainer.childAt(1);
    expect(children.find('.data').text()).toBe('Ivan');
  });

  it('should display number of score to equal 2', () => {
    const scoreContainer = wrapper.find('.score');
    const children = scoreContainer.childAt(1);
    expect(children.find('.data').text()).toBe('2');
  });
});

// it('should display timer to equal "0:52"', () => {
//   const scoreContainer = wrapper.find('.time');
// const onUnmountFunc = wrapper.invoke('onUnmount')('0', '52').then((result: any) => {
// expect(wrapper.instance().props).toEqual('onUnmount');
// });
// const res = onUnmountFunc('0', '52');
// expect(res.toBe('0:52'));

// const scoreContainer = wrapper.find('.score');
// const children = scoreContainer.childAt(1);
// expect(children.find('.data').text()).toBe('2');
//   console.log(wrapper);

// expect(wrapper).toEqual([1, 2, 3]);
// });
