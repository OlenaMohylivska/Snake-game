import React from 'react';
import { StartGame } from '../StartGame';
import { mount, render, shallow } from 'enzyme';
import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from '@jest/globals';
import { MemoryRouter } from 'react-router';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Test StartGame component', () => {
  it('should make click and set path to "/play"', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <StartGame userName={{ name: 'Ivan', error: '' }} />
      </MemoryRouter>
    );
    const startGameBtn = wrapper.find('.start-button').hostNodes();
    startGameBtn.simulate('click');
    expect(mockHistoryPush).toHaveBeenCalledWith('/play');
  });

  // TODO mock localStorage

  it('should make click and set new name John to LocalStorage', () => {
    const wrapper = shallow(
      <StartGame userName={{ name: 'John', error: '' }} />
    );
    const startGameBtn = wrapper.find('.start-button');
    startGameBtn.simulate('click');
    expect(localStorage.getItem('John')).toEqual('0');
    expect(localStorage.key(1)).toEqual('John');
  });
});
