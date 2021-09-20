import { createReducer } from '@reduxjs/toolkit';
import { ChangeDirectionActions, 
  ChangeNumberCellsActions, 
  SetDirectionAction, 
  SetFruitPositionAction, 
  setTimerInfoAction } from './types';
export interface IState {
  position: number[],
  counter: number,
  size: {
    columns: number,
    rows: number
  },
  direction: string,
  fruitPosition: number,
  timerInfo: string,
}

export const initialState: IState = {
  position: [1],
  counter: 0,
  size: {
    columns: 15,
    rows: 15
  },
  direction: 'RIGHT',
  fruitPosition: 0,
  timerInfo: '',
}

export const rootReducer = createReducer(initialState, {
  [ChangeDirectionActions.CHANGE_DIRECTION_TOP]: (state) => {
    const positionCopy = [...state.position];
    positionCopy.push(positionCopy[positionCopy.length - 1] - state.size.columns);
    
    if(!positionCopy.find(el => el === state.fruitPosition)) {
      positionCopy.shift();
    }

    return {
      ...state,
      position: positionCopy
    };
  },
  [ChangeDirectionActions.CHANGE_DIRECTION_BOTTOM]: (state) => {
    const positionCopy = [...state.position];
    positionCopy.push(positionCopy[positionCopy.length - 1] + state.size.columns);

    if(!positionCopy.find(el => el === state.fruitPosition)) {
      positionCopy.shift();
    }

    return {
      ...state,
      position: positionCopy
    };
  },
  [ChangeDirectionActions.CHANGE_DIRECTION_LEFT]: (state) => {
    const positionCopy = [...state.position];
    positionCopy.push(positionCopy[positionCopy.length - 1] - 1);
    
    if(!positionCopy.find(el => el === state.fruitPosition)) {
      positionCopy.shift();
    }

    return {
      ...state,
      position: positionCopy
    };
  },
  [ChangeDirectionActions.CHANGE_DIRECTION_RIGHT]: (state) => {
    const positionCopy = [...state.position];
    positionCopy.push(positionCopy[positionCopy.length - 1] + 1);
   
    if(!positionCopy.find(el => el === state.fruitPosition)) {
      positionCopy.shift();
    }

    return {
      ...state,
      position: positionCopy,
      isMoving: true
    };
  },
  [ChangeNumberCellsActions.CHANGE_NUMBER_COLUMNS]: (state, action) => {
    
    return {
      ...state,
      size: {
        columns: action.payload,
        rows: state.size.rows
      }
    };
  },
  [ChangeNumberCellsActions.CHANGE_NUMBER_ROWS]: (state, action) => {
    
    return {
      ...state,
      size: {
        columns: state.size.columns,
        rows: action.payload
      }
    };
  },
  [SetDirectionAction]: (state, action) => {

    if ((state.direction === 'RIGHT' && action.payload === 'LEFT')
      || (state.direction === 'LEFT' && action.payload === 'RIGHT')
      || (state.direction === 'TOP' && action.payload === 'BOTTOM')
      || (state.direction === 'BOTTOM' && action.payload === 'TOP')) {

      return;
    }

    return {
      ...state,
      direction: action.payload
    };
  },
  [SetFruitPositionAction]: (state, action) => {
    
    return {
      ...state,
      fruitPosition: action.payload
    };
  },
  [setTimerInfoAction]: (state, action) => {
    
    return {
      ...state,
      timerInfo: action.payload
    };
  },
})
