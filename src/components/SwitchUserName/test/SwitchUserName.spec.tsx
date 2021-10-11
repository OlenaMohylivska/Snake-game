import React from 'react';
import { mount, shallow } from 'enzyme';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { SwitchUserName } from '../SwitchUserName';

describe('Test SwitchUserName component', () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow(<SwitchUserName dispatch={() => jest.fn()} />);
  });

  it('should render component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should exist class "fieldset"', () => {
    const formWrapper = wrapper.find('.fieldset');
    expect(formWrapper.length).toBe(1);
  });

  it('should render TextField with label "Enter your name" on radio change "Enter name"', () => {
    wrapper.find('.radio').simulate('change', { target: { value: 'enter' } });
    const formWrapper = wrapper.find({ label: 'Enter your name' });
    expect(formWrapper.length).toBe(1);
  });

  it('should render InputLabel with className "select-label" on radio change "Select name"', () => {
    wrapper.find('.radio').simulate('change', { target: { value: 'select' } });
    const formWrapper = wrapper.find('.select-label');
    expect(formWrapper.length).toBe(1);
  });
});
