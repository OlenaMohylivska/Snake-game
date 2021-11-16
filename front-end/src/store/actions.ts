import {
  SetPositionAction,
  ChangeNumberCellsActions,
  SetDirectionAction,
  SetFruitPositionAction,
  setTimerInfoAction,
  resetStateAction,
  resetGameProgressAction,
  setUserInfoAction,
  setUsersListAction,
  setUserBestScoreAction,
  saveUserInfoFailureAction,
  saveUserInfoRequestAction,
  saveUserNameSuccessAction,
  getUserInfoRequestAction,
  setStatisticRequestAction,
  setStatisticSuccessAction,
  setStatisticFailureAction,
  getStatisticRequestAction,
  getStatisticFailureAction,
  fetchRandomUserFailureAction,
  fetchRandomUserRequestAction,
  getAllUsersRequestAction,
  getAllUsersFailureAction,
  getUserInfoFailureAction,
  updateUserScoreRequestAction,
  updateUserScoreFailureAction,
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
export const setUserInfo = createAction<object>(setUserInfoAction);
export const setUsersList = createAction<object>(setUsersListAction);
export const setUserBestScore = createAction<number>(setUserBestScoreAction);
export const saveUserInfoRequest = createAction(saveUserInfoRequestAction);
export const saveUserNameSuccess = createAction<object>(
  saveUserNameSuccessAction
);
export const saveUserInfoFailure = createAction<string | null>(
  saveUserInfoFailureAction
);
export const getUserInfoRequest = createAction(getUserInfoRequestAction);
export const getUserInfoFailure = createAction<string | null>(
  getUserInfoFailureAction
);
export const setStatisticRequest = createAction(setStatisticRequestAction);
export const setStatisticSuccess = createAction<object>(
  setStatisticSuccessAction
);
export const setStatisticFailure = createAction<string | null>(
  setStatisticFailureAction
);
export const getStatisticRequest = createAction(getStatisticRequestAction);
export const getStatisticFailure = createAction<string | null>(
  getStatisticFailureAction
);
export const fetchRandomUserRequest = createAction(
  fetchRandomUserRequestAction
);
export const fetchRandomUserFailure = createAction<string | null>(
  fetchRandomUserFailureAction
);
export const getAllUsersRequest = createAction(getAllUsersRequestAction);
export const getAllUsersFailure = createAction<string | null>(
  getAllUsersFailureAction
);
export const updateUserScoreRequest = createAction(
  updateUserScoreRequestAction
);
export const updateUserScoreFailure = createAction<string | null>(
  updateUserScoreFailureAction
);

export const fetchRandomUser = () => {
  return (dispatch: (action: any) => void) => {
    dispatch(fetchRandomUserRequest());

    return axios('https://randomuser.me/api')
      .then((res: any) => {
        const userName = res.data.results[0].name;
        dispatch(
          saveUserInfoToDB({ first: userName.first, last: userName.last })
        );
      })
      .catch((error) => {
        dispatch(fetchRandomUserFailure(error.message));
        dispatch(setUserInfo({ name: 'Default user' }));
      });
  };
};

export const getAllUsers = () => {
  return (dispatch: (action: AnyAction) => void) => {
    dispatch(getAllUsersRequest());

    return axios('/api/users')
      .then((res: any) => {
        const allUsers = [];
        for (let i = 0; i < res.data.length; i++) {
          allUsers.push({
            name: `${res.data[i].first_name} ${res.data[i].last_name}`,
            id: res.data[i].user_id,
          });
        }
        dispatch(setUsersList(allUsers));
      })
      .catch((error) => {
        dispatch(getAllUsersFailure(error.message));
      });
  };
};
//
export const saveUserInfoToDB = (user: { first: string; last: string }) => {
  return async (dispatch: (action: any) => void) => {
    dispatch(saveUserInfoRequest());

    return await axios
      .post('/api/users', {
        first_name: user.first,
        last_name: user.last,
      })
      .then((res: any) => {
        dispatch(
          setUserInfo({
            name: `${res.data.first_name} ${res.data.last_name}`,
            id: res.data.user_id,
          })
        );
        dispatch(
          saveUserNameSuccess({
            name: `${res.data.first_name} ${res.data.last_name}`,
            id: res.data.user_id,
          })
        );
      })
      .catch((error) => {
        dispatch(saveUserInfoFailure(error.message));
      });
  };
};

export const getUserInfo = (user: { id: number }) => {
  return async (dispatch: (action: AnyAction) => void) => {
    dispatch(getUserInfoRequest());

    return await axios(`/api/user?id=${user.id}`)
      .then((res: any) => {
        dispatch(
          setUserInfo({
            name: `${res.data.first_name} ${res.data.last_name}`,
            id: res.data.user_id,
          })
        );
        dispatch(setUserBestScore(res.data.best_score));
      })
      .catch((error) => {
        dispatch(getUserInfoFailure(error.message));
      });
  };
};

export const updateUserScore = (user: { id: number; score: number }) => {
  return async (dispatch: (action: AnyAction) => void) => {
    dispatch(updateUserScoreRequest());

    return await axios
      .put('/api/user', {
        user_id: user.id,
        best_score: user.score,
      })
      .then((res: any) => {
        dispatch(setUserBestScore(res.data.best_score));
      })
      .catch((error) => {
        dispatch(updateUserScoreFailure(error.message));
      });
  };
};

export const getStatistic = (user: { id: number }) => {
  return async (dispatch: (action: any) => void) => {
    dispatch(getStatisticRequest());
    return await axios(`/api/statistic?id=${user.id}`)
      .then((res: any) => {
        dispatch(setStatisticSuccess(res.data));
      })
      .catch((error) => {
        dispatch(getStatisticFailure(error.message));
      });
  };
};

export const createStatistic = (user: {
  id: number;
  date: string;
  score: number;
  time: string;
}) => {
  return async (dispatch: (action: any) => void) => {
    dispatch(setStatisticRequest());

    return await axios
      .post('/api/statistic', {
        user_id: user.id,
        date: user.date,
        score: user.score,
        time: user.time,
      })
      .then((res: any) => {
        dispatch(setStatisticSuccess(res.data));
      })
      .catch((error) => {
        dispatch(setStatisticFailure(error.message));
      });
  };
};
