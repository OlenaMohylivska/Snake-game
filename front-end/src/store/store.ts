import { createStore, applyMiddleware } from 'redux';
import { initialState, rootReducer } from './rootReducer';
import thunk from 'redux-thunk';

export const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
);
