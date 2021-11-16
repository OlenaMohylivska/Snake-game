import { createReducer } from '@reduxjs/toolkit';
import {
  SetPositionAction,
  ChangeNumberCellsActions,
  SetDirectionAction,
  SetFruitPositionAction,
  setTimerInfoAction,
  resetStateAction,
  resetGameProgressAction,
  setUserInfoAction,
  MovingDirectionActions,
  setUsersListAction,
  setUserBestScoreAction,
  saveUserInfoRequestAction,
  saveUserNameSuccessAction,
  saveUserInfoFailureAction,
  setStatisticRequestAction,
  setStatisticSuccessAction,
  setStatisticFailureAction,
  fetchRandomUserFailureAction,
  fetchRandomUserRequestAction,
  getAllUsersFailureAction,
  getAllUsersRequestAction,
  getUserInfoRequestAction,
  getUserInfoFailureAction,
  updateUserScoreRequestAction,
  updateUserScoreFailureAction,
  getStatisticFailureAction,
  getStatisticRequestAction,
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
  userInfo: {
    name: string;
    id: number;
  };
  usersList: Array<{ name: string, id: number}>; 
  bestScore: number;
  isLoading: boolean;
  error: string | null;
  statistic: Array<{ date: string, score: number, time: string}>
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
  userInfo: {
    name: '',
    id: 0,
  },
  usersList: [],
  bestScore: 0,
  isLoading: false,
  error: null,
  statistic: [],
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
      userInfo: state.userInfo,
      bestScore: state.bestScore,
    };
  },
  [resetGameProgressAction]: (state) => {
    return {
      ...initialState,
      size: state.size,
      userInfo: state.userInfo,
      bestScore: state.bestScore,
    };
  },
  [setUserInfoAction]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      userInfo: {
        name: action.payload.name,
        id: action.payload.id,
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
  [fetchRandomUserRequestAction]: (state) => {
    return {
      ...state,
      isLoading: true,
    };
  },
  [getAllUsersRequestAction]: (state) => {
    return {
      ...state,
      isLoading: true,
    };
  },
  [getUserInfoRequestAction]: (state) => {
    return {
      ...state,
      isLoading: true,
    };
  },
  [updateUserScoreRequestAction]: (state) => {
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
  [fetchRandomUserFailureAction]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
  },
  [getAllUsersFailureAction]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
  },
  [getUserInfoFailureAction]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
  },
  [updateUserScoreFailureAction]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
  },



  [saveUserInfoFailureAction]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
  },
  [setStatisticRequestAction]: (state, action) => {       
    return {
      ...state,
      isLoading: true,
    };
  },
  [setStatisticSuccessAction]: (state, action) => {  
    let passedData = action.payload;
    
    if (!Array.isArray(passedData)) {
      passedData = [passedData];
    }
    
    return {
      ...state,
      isLoading: false,
      statistic: [...passedData],
    };
  },
  [setStatisticFailureAction]: (state, action) => {       
    return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
  },
  [getStatisticRequestAction]: (state, action) => {       
    return {
      ...state,
      isLoading: true,
    };
  },
  [getStatisticFailureAction]: (state, action) => {       
    return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
  },
});
