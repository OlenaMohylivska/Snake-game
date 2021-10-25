import React from 'react';
import { GameFieldSize } from '../GameFieldSize';
import { shallow } from 'enzyme';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';

describe('Test GameFieldSize component', () => {
  let wrapper: any;
  let props: any;

  beforeEach(() => {
    props = {
      fieldSize: { columns: 5, rows: 5 },
      dispatch: jest.fn(),
    };
    wrapper = shallow(<GameFieldSize {...props} />);
  });

  it('should render component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should exist class "game-field-form"', () => {
    const formWrapper = wrapper.find('.game-field-form');
    expect(formWrapper.length).toBe(1);
  });

  it('should define autoComplete to "off"', () => {
    const formWrapper = wrapper.find('.game-field-form');
    expect(formWrapper.props().autoComplete).toEqual('off');
  });

  it('should exist child with class "text-field-row"', () => {
    expect(wrapper.childAt(1).hasClass('text-field-row'));
  });

  it('should be default value to equal passed props: fieldSize.columns', () => {
    const secondChild = wrapper.props().children[0];
    expect(secondChild.props.value).toBe(props.fieldSize.columns);
  });

  it('should be default value to equal passed props: fieldSize.rows', () => {
    const secondChild = wrapper.props().children[1];
    expect(secondChild.props.value).toBe(props.fieldSize.rows);
  });
});
