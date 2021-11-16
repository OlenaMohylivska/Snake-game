import React from 'react';
import { Statistic } from '../Statistic';
import { mount, shallow } from 'enzyme';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { MemoryRouter } from 'react-router';
import { ROUTES } from '../../../routes';

const mockHistoryReplace = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    replace: mockHistoryReplace,
  }),
}));


const props: any = {
  dispatch: jest.fn(),
  statistic: [{ date: '11/11/2021 13:25', score: 10, time: '01:25' }],
  error: null,
};

describe('Test Statistic component', () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow(<Statistic {...props} />);
  });

  it('should render component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should exist class "statistic-wrapper"', () => {
    const resultContainer = wrapper.find('.statistic-wrapper');
    expect(resultContainer.length).toBe(1);
  });
});

describe('Test clicks on Statistic component', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/']}>
      <Statistic {...props} />
    </MemoryRouter>
  );

  it('should make click and change path to "/"', () => {
    const statisticWrapper = wrapper.find('.statistic-wrapper');
    statisticWrapper.childAt(1).simulate('click');
    expect(mockHistoryReplace).toBeCalledWith(ROUTES.HOME);
  });
});
