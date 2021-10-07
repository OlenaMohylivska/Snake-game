import React from 'react';
import { StartGame } from './StartGame';
import { mount } from 'enzyme';
import { describe, it, expect, jest } from '@jest/globals';
import { MemoryRouter } from 'react-router';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Test StartGame component', () => {
  it('should make click and set path to "/play', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <StartGame userName={{ name: 'Ivan', error: '' }} />
      </MemoryRouter>
    );
    const startGameBtn = wrapper.find('.start-button').hostNodes();
    startGameBtn.simulate('click');
    expect(mockHistoryPush).toHaveBeenCalledWith('/play');
  });
});
