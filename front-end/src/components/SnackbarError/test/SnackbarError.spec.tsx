import React from 'react';
import { SnackbarError } from '../SnackbarError';
import { shallow } from 'enzyme';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';

describe('Test ScoreInfo component', () => {
  let wrapper: any;
  let props: any;

  beforeEach(() => {
    props = {
      error: 'Some error',
      message: 'Some message. ',
    };
    wrapper = shallow(<SnackbarError {...props} />);
  });

  it('should render component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should exist class "snackbar"', () => {
    const snackbar = wrapper.find('.snackbar');
    expect(snackbar.length).toBe(1);
  });

  it('should display error: Some error', () => {
    const snackbar = wrapper.find('.snackbar');
    expect(snackbar.childAt(0).text()).toBe(`${props.message}${props.error}`);
  });
});
