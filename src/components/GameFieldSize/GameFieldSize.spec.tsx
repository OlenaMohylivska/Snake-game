import configureStore from 'redux-mock-store';
import { it, expect } from '@jest/globals';

const middlewares: [] = [];
const mockStore = configureStore(middlewares);

const CHANGE_NUMBER_ROWS = () => ({ type: 'ROWS' });

it('should dispatch action', () => {
  const initialState = {};
  const store = mockStore(initialState);

  store.dispatch(CHANGE_NUMBER_ROWS());

  const actions = store.getActions();
  const expectedPayload = { type: 'ROWS' };
  expect(actions).toEqual([expectedPayload]);
});
