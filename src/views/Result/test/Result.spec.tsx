import React from 'react';
import { Result } from '../Result';
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

const props: any = {
  snakePosition: [1, 2, 3],
  userName: 'John',
  dispatch: jest.fn(),
  timerInfo: '0:25',
};

describe('Test Result component', () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow(<Result {...props} />);
  });

  it('should render component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should exist class "result-page"', () => {
    const resultContainer = wrapper.find('.result-page');
    expect(resultContainer.length).toBe(1);
  });
});

describe('Test clicks on Result component', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/']}>
      <Result {...props} />
    </MemoryRouter>
  );

  it('should make click and change path to "/"', () => {
    const buttonsWrapper = wrapper.find('.buttons-wrapper');
    buttonsWrapper.childAt(0).simulate('click');
    expect(mockHistoryReplace).toBeCalledWith(ROUTES.HOME);
  });

  it('should make click and change path to "/play"', () => {
    const buttonsWrapper = wrapper.find('.buttons-wrapper');
    buttonsWrapper.childAt(1).simulate('click');
    expect(mockHistoryReplace).toBeCalledWith(ROUTES.PLAY);
  });
});

describe('Test localStorage in Result component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should add new name to localStorage"', () => {
    localStorage.setItem(props.userName, '0');
    const wrapper = mount(<Result {...props} />);

    expect(Number(localStorage.getItem(props.userName))).toEqual(
      props.snakePosition.length - 1
    );
  });
});
