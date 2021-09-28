import { createReducer } from '@reduxjs/toolkit';
import {
  SetPositionAction,
  ChangeNumberCellsActions,
  SetDirectionAction,
  SetFruitPositionAction,
  setTimerInfoAction,
  resetStateAction,
  resetGameProgressAction,
  setUserNameAction,
  MovingDirectionActions,
} from './types';

export interface IState {
  position: number[];
  counter: number;
  size: {
    columns: number;
    rows: number;
  };
  direction: MovingDirectionActions;
  fruitPosition: number;
  timerInfo: string;
  userName: {
    name: string;
    error: string;
  };
}

export const initialState: IState = {
  position: [1],
  counter: 0,
  size: {
    columns: 15,
    rows: 15,
  },
  direction: MovingDirectionActions.RIGHT,
  fruitPosition: 0,
  timerInfo: '',
  userName: {
    name: '',
    error: '',
  },
};

export const rootReducer = createReducer(initialState, {
  [SetPositionAction]: (state, action) => {
    return {
      ...state,
      position: action.payload,
    };
  },

  [ChangeNumberCellsActions.CHANGE_NUMBER_COLUMNS]: (state, action) => {
    return {
      ...state,
      size: {
        columns: action.payload,
        rows: state.size.rows,
      },
    };
  },
  [ChangeNumberCellsActions.CHANGE_NUMBER_ROWS]: (state, action) => {
    return {
      ...state,
      size: {
        columns: state.size.columns,
        rows: action.payload,
      },
    };
  },
  [SetDirectionAction]: (state, action) => {
    if (
      (state.direction === 'RIGHT' && action.payload === 'LEFT') ||
      (state.direction === 'LEFT' && action.payload === 'RIGHT') ||
      (state.direction === 'TOP' && action.payload === 'BOTTOM') ||
      (state.direction === 'BOTTOM' && action.payload === 'TOP')
    ) {
      return state;
    }

    return {
      ...state,
      direction: action.payload,
    };
  },
  [SetFruitPositionAction]: (state, action) => {
    return {
      ...state,
      fruitPosition: action.payload,
    };
  },
  [setTimerInfoAction]: (state, action) => {
    return {
      ...state,
      timerInfo: action.payload,
    };
  },
  [resetStateAction]: (state) => {
    return {
      ...initialState,
      userName: state.userName,
    };
  },
  [resetGameProgressAction]: (state) => {
    return {
      ...initialState,
      size: state.size,
      userName: state.userName,
    };
  },
  [setUserNameAction]: (state, action) => {
    return {
      ...state,
      userName: {
        name: action.payload.name,
        error: action.payload.error,
      },
    };
  },
});
