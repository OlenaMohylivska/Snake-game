import React from 'react';
import { GameButtons } from './../GameButtons';
import { shallow } from 'enzyme';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';

describe('Test GameButtons component', () => {
  const props: any = {
    dispatch: jest.fn(),
  };

  const wrapper = shallow(<GameButtons {...props} />);
  it('should render component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should call function on button-top click', () => {
    wrapper.find('.button-top').simulate('click');
    expect(props.dispatch).toHaveBeenCalledTimes(1);
    expect(props.dispatch).toHaveBeenCalledWith({
      payload: 'TOP',
      type: 'SET_DIRECTION',
    });
  });

  it('should call function on button-bottom click', () => {
    wrapper.find('.button-bottom').simulate('click');
    expect(props.dispatch).toHaveBeenCalledTimes(1);
    expect(props.dispatch).toHaveBeenCalledWith({
      payload: 'BOTTOM',
      type: 'SET_DIRECTION',
    });
  });

  it('should call function on button-left click', () => {
    wrapper.find('.button-left').simulate('click');
    expect(props.dispatch).toHaveBeenCalledTimes(1);
    expect(props.dispatch).toHaveBeenCalledWith({
      payload: 'LEFT',
      type: 'SET_DIRECTION',
    });
  });

  it('should call function on button-right click', () => {
    wrapper.find('.button-right').simulate('click');
    expect(props.dispatch).toHaveBeenCalledTimes(1);
    expect(props.dispatch).toHaveBeenCalledWith({
      payload: 'RIGHT',
      type: 'SET_DIRECTION',
    });
  });
});
