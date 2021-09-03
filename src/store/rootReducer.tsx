import { combineReducers, AnyAction } from 'redux';

const positionHandler = (state = [81], action: AnyAction) => {
  const updatedState = [...state];
  switch (action.type) {
    case 'TOP':
      updatedState.push(updatedState[updatedState.length - 1] - 15);
      updatedState.shift()  
      return updatedState 
    case 'BOTTOM':
      updatedState.push(updatedState[updatedState.length - 1] + 15);
      updatedState.shift()  
      return updatedState
    case 'LEFT':
      updatedState.push(updatedState[updatedState.length - 1] - 1);
      updatedState.shift()  
      return updatedState
    case 'RIGHT':
      updatedState.push(updatedState[updatedState.length - 1] + 1);
      updatedState.shift()  
      return updatedState
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