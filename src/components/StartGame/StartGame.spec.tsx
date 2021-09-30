import React from 'react';
import configureStore from 'redux-mock-store';
import { StartGame } from './StartGame';
import { mount, shallow } from 'enzyme';
import { describe, it, expect } from '@jest/globals';
import { Provider } from 'react-redux';

const mockStore = configureStore();
const store = mockStore({
  userName: { name: 'Ivan', error: '' },
});
describe('Test cell component', () => {
  it('should make click', () => {
    const startGameComponent = mount(
      <Provider store={store}>
        <StartGame />
      </Provider>
    );
    const startGameBtn = startGameComponent.find('.start-button');
    expect(startGameBtn.length).toBe(1);
    // startGameBtn.simulate('click');
    // const board = startGameComponent.find('.board');

    // expect(board.length).toBe(1);
  });
});
