import { combineReducers, AnyAction } from 'redux';
import { ChangeDirectionActions } from './types';

const positionHandler = (state = [81], action: AnyAction) => {
  const updatedState = [...state];

  switch (action.type) {
    case ChangeDirectionActions.CHANGE_DIRECTION_TOP:
      updatedState.push(updatedState[updatedState.length - 1] - 15);
      updatedState.shift();

      return updatedState;
    case ChangeDirectionActions.CHANGE_DIRECTION_BOTTOM:
      updatedState.push(updatedState[updatedState.length - 1] + 15);
      updatedState.shift();

      return updatedState;
    case ChangeDirectionActions.CHANGE_DIRECTION_LEFT:
      updatedState.push(updatedState[updatedState.length - 1] - 1);
      updatedState.shift();
        
      return updatedState;
    case ChangeDirectionActions.CHANGE_DIRECTION_RIGHT:
      updatedState.push(updatedState[updatedState.length - 1] + 1);
      updatedState.shift();

      return updatedState;
    default: return state;
  }
}

function scoreCounter(state = 0, action: AnyAction) {
  switch (action.type) {
    case 'INCREASE_SCORE': return state = state + 1;
    default: return state;
  }
}

export const rootReducer = combineReducers({
  position: positionHandler,
  counter: scoreCounter
})