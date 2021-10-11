import React from 'react';
import { Result } from '../Result';
import { mount, shallow } from 'enzyme';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { MemoryRouter } from 'react-router';
import { ROUTES } from '../../../routes';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Test Result component', () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow(
      <Result
        snakePosition={[1, 2, 3]}
        userName='Pete'
        dispatch={jest.fn()}
        timerInfo='0:25'
      />
    );
  });

  it('should render component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should exist class "result-page"', () => {
    const resultContainer = wrapper.find('.result-page');
    expect(resultContainer.length).toBe(1);
  });
  describe('Test clicks on Result component', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <Result
          snakePosition={[1, 2, 3]}
          userName='Pete'
          dispatch={jest.fn()}
          timerInfo='0:25'
        />
      </MemoryRouter>
    );
    it('should make click and change path to "/"', () => {
      const buttonsWrapper = wrapper.find('.buttons-wrapper');
      buttonsWrapper.childAt(0).simulate('click');
      expect(mockHistoryPush).toBeCalledWith(ROUTES.HOME);
    });

    it('should make click and change path to "/play"', () => {
      const buttonsWrapper = wrapper.find('.buttons-wrapper');
      buttonsWrapper.childAt(1).simulate('click');
      expect(mockHistoryPush).toBeCalledWith(ROUTES.PLAY);
    });
  });
});

describe('Test localStorage in Result component', () => {
  // localStorage
  it('should add new name to localStorage"', () => {
    const wrapper = mount(
      <Result
        snakePosition={[1, 2, 3]}
        userName='Pete'
        dispatch={jest.fn()}
        timerInfo='0:25'
      />
    );

    expect(localStorage.key(0)).toEqual('Pete');
  });
});
