import React from 'react';
import { StartGame } from '../StartGame';
import { mount, shallow } from 'enzyme';
import { describe, it, expect, jest } from '@jest/globals';
import { MemoryRouter } from 'react-router';

const mockHistoryReplace = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    replace: mockHistoryReplace,
  }),
}));

describe('Test StartGame component', () => {
  it('should make click and set path to "/play"', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <StartGame userInfo={{ name: 'Ivan' }} />
      </MemoryRouter>
    );
    const startGameBtn = wrapper.find('.start-button').hostNodes();
    startGameBtn.simulate('click');
    expect(mockHistoryReplace).toHaveBeenCalledWith('/play');
  });
});
