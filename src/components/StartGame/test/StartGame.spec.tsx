import React from 'react';
import { StartGame } from '../StartGame';
import { mount, render, shallow } from 'enzyme';
import { describe, it, expect, jest } from '@jest/globals';
import { MemoryRouter } from 'react-router';

const mockHistoryReplace = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    replace: mockHistoryReplace,
  }),
}));

const localStorageMock = (function () {
  let store: { [key: string]: any } = {};

  return {
    getItem(key: string) {
      return store[key];
    },

    setItem(key: string, value: any) {
      store[key] = value;
    },

    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Test StartGame component', () => {
  it('should make click and set path to "/play"', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <StartGame userName={{ name: 'Ivan', error: '' }} />
      </MemoryRouter>
    );
    const startGameBtn = wrapper.find('.start-button').hostNodes();
    startGameBtn.simulate('click');
    expect(mockHistoryReplace).toHaveBeenCalledWith('/play');
  });

  describe('Test localStorage', () => {
    const props: any = {
      userName: { name: 'John', error: '' },
    };
    it('should make click and set new name John to LocalStorage', () => {
      localStorage.clear();
      const wrapper = shallow(<StartGame {...props} />);

      const startGameBtn = wrapper.find('.start-button');
      startGameBtn.simulate('click');
      expect(localStorage.getItem(props.userName.name)).toEqual('0');
    });
  });
});
