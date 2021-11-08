import {
  SetPositionAction,
  ChangeNumberCellsActions,
  SetDirectionAction,
  SetFruitPositionAction,
  setTimerInfoAction,
  resetStateAction,
  resetGameProgressAction,
  setUserNameAction,
  setUsersListAction,
  setUserBestScoreAction,
  saveUserInfoFailureAction,
  saveUserInfoRequestAction,
  saveUserNameSuccessAction,
  getUserInfoRequestAction,
} from './types';
import { createAction } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import axios from 'axios';

export const setSnakePosition = createAction<number[]>(SetPositionAction);
export const changeNumberOfColumns = createAction<number>(
  ChangeNumberCellsActions.CHANGE_NUMBER_COLUMNS
);
export const changeNumberOfRows = createAction<number>(
  ChangeNumberCellsActions.CHANGE_NUMBER_ROWS
);
export const setDirection = createAction<string>(SetDirectionAction);
export const setFruitPosition = createAction<number>(SetFruitPositionAction);
export const setTimerInfo = createAction<string>(setTimerInfoAction);
export const resetState = createAction(resetStateAction);
export const resetGameProgress = createAction(resetGameProgressAction);
export const setUserName = createAction<object>(setUserNameAction);
export const setUsersList = createAction<object>(setUsersListAction);
export const setUserBestScore = createAction<number>(setUserBestScoreAction);
export const saveUserInfoRequest = createAction(saveUserInfoRequestAction);
export const saveUserNameSuccess = createAction<string>(
  saveUserNameSuccessAction
);
export const saveUserInfoFailure = createAction<string | null>(
  saveUserInfoFailureAction
);
export const getUserInfoRequest = createAction(getUserInfoRequestAction);

export const fetchRandomUser = () => {
  return (dispatch: (action: AnyAction) => void) => {
    dispatch(saveUserInfoRequest()); // ?

    return axios('https://randomuser.me/api')
      .then((res: any) => {
        const userName = res.data.results[0].name;
        dispatch(
          setUserName({
            name: `${userName.first} ${userName.last}`,
            error: '',
          })
        );
        saveUserNameToDB(userName);
      })
      .catch((error) => {
        dispatch(setUserName({ name: 'Default user', error: error.message }));
        dispatch(saveUserInfoFailure(error.message));
      });
  };
};

export const getAllUsersFromDB = () => {
  return (dispatch: (action: AnyAction) => void) => {
    dispatch(saveUserInfoRequest()); // ?

    return axios('/api/users')
      .then((res: any) => {
        const allUsers = [];
        for (let i = 0; i < res.data.length; i++) {
          allUsers.push(`${res.data[i].first_name} ${res.data[i].last_name}`);
        }
        dispatch(setUsersList(allUsers));
      })
      .catch((error) => {
        dispatch(saveUserInfoFailure(error.message));
      });
  };
};

export const saveUserNameToDB = (userName: { first: string; last: string }) => {
  return async (dispatch: (action: AnyAction) => void) => {
    dispatch(saveUserInfoRequest());

    return await axios
      .post('/api/users', {
        first_name: userName.first,
        last_name: userName.last,
      })
      .then((res: any) => {
        dispatch(
          saveUserNameSuccess(`${res.data.first_name} ${res.data.last_name}`)
        );
      })
      .catch((error) => {
        dispatch(saveUserInfoFailure(error.message));
      });
  };
};

export const getUserInfo = (user: { first: string; last: string }) => {
  return async (dispatch: (action: AnyAction) => void) => {
    dispatch(saveUserInfoRequest()); // ?

    return await axios(`/api/user?first=${user.first}&last=${user.last}`)
      .then((res: any) => {
        dispatch(
          setUserName({ name: `${user.first} ${user.last}`, error: '' })
        );
        // should be deleted and add isLoading: false to setUserName
        dispatch(setUserBestScore(res.data.best_score));
      })
      .catch((error) => {
        dispatch(saveUserInfoFailure(error.message));
      });
  };
};

export const updateUserScore = (user: { // DB
  first: string;
  last: string;
  score: number;
}) => {
  return async (dispatch: (action: AnyAction) => void) => {
    dispatch(saveUserInfoRequest());
    
    return await axios
      .put('/api/user', {
        first_name: user.first,
        last_name: user.last,
        best_score: user.score,
      })
      .then((res: any) => {
        console.log(res.data, 'update');
        
        dispatch(setUserBestScore(res.data.best_score));
      })
      .catch((error) => {
        dispatch(saveUserInfoFailure(error.message));
      });
  };
};
