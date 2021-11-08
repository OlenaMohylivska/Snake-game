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
  setUsersListAction,
  setUserBestScoreAction,
  saveUserInfoRequestAction,
  saveUserNameSuccessAction,
  saveUserInfoFailureAction
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
  usersList: string[]; 
  bestScore: number;
  isLoading: boolean;
  error: string | null;
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
  usersList: [],
  bestScore: 0,
  isLoading: false,
  error: null,
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
      bestScore: state.bestScore,
    };
  },
  [resetGameProgressAction]: (state) => {
    return {
      ...initialState,
      size: state.size,
      userName: state.userName,
      bestScore: state.bestScore,
    };
  },
  [setUserNameAction]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      userName: {
        name: action.payload.name,
        error: action.payload.error,
      },
    };
  },
  [setUsersListAction]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      usersList: [...action.payload],
    };
  },
  [setUserBestScoreAction]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      bestScore: action.payload,
    };
  },
  [saveUserInfoRequestAction]: (state) => {
    return {
      ...state,
      isLoading: true,
    };
  },
  [saveUserNameSuccessAction]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      usersList: [...state.usersList, action.payload],
    };
  },
  [saveUserInfoFailureAction]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
  },
});
