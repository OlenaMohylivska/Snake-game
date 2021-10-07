import React from 'react';
import { AppRouter } from './AppRouter';
import { mount, shallow } from 'enzyme';
import { describe, it, expect, jest } from '@jest/globals';
import { MemoryRouter } from 'react-router';
import { Home } from './../views/Home/Home';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Test StartGame component', () => {
  it('should make click and set path to "/play', () => {
    const wrapper = shallow(
      <MemoryRouter initialEntries={['/wrongPath']}>
        <AppRouter />
      </MemoryRouter>
    );
    console.log(Home);

    // const startGameBtn = wrapper.find('.start-button').hostNodes();
    // startGameBtn.simulate('click');
    // expect(mockHistoryPush).toHaveBeenCalledWith('/');
    // expect(wrapper.find(Home)).toBe(1);
    // expect(mockHistoryPush).toHaveBeenCalledWith('');
    expect(wrapper).toBe(1);

    // wrapper.find(AppRouter).html();
  });
});

// describe('RouteNotFound', () => {
//   it('Redirects to correct URL on click', () => {
//     const wrapper = mount(
//       <MemoryRouter initialEntries={['/']}>
//         <AppRouter />
//       </MemoryRouter>,
//     );

//     // fireEvent.click(getByRole('button'));
//     // expect(mockHistoryPush).toHaveBeenCalledWith('/help');
//   });
// });
