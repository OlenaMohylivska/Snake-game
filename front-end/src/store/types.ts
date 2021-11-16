export enum MovingDirectionActions {
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export enum ChangeNumberCellsActions {
  CHANGE_NUMBER_ROWS = 'ROWS',
  CHANGE_NUMBER_COLUMNS = 'COLUMNS',
}

export const SetPositionAction = 'SET_POSITION';
export const SetDirectionAction = 'SET_DIRECTION';
export const SetFruitPositionAction = 'SET_FRUIT_POSITION';
export const setTimerInfoAction = 'SET_TIMER_INFO';
export const resetStateAction = 'RESET_STATE';
export const resetGameProgressAction = 'RESET_GAME_PROGRESS';
export const setUserInfoAction = 'SET_USER_INFO';
export const setUsersListAction = 'SET_USERS_LIST';
export const setUserBestScoreAction = 'SET_USER_BEST_SCORE';
export const saveUserInfoRequestAction = 'SAVE_USER_INFO_REQUEST';
export const saveUserNameSuccessAction = 'SAVE_USER_NAME_SUCCESS';
export const saveUserInfoFailureAction = 'SAVE_USER_INFO_FAILURE';
export const getUserInfoRequestAction = 'GET_USER_INFO_REQUEST';
export const getUserInfoFailureAction = 'GET_USER_INFO_FAILURE';
export const setStatisticRequestAction = 'SET_STATISTIC_REQUEST';
export const setStatisticSuccessAction = 'SET_STATISTIC_SUCCESS';
export const setStatisticFailureAction = 'SET_STATISTIC_FAILURE';
export const getStatisticRequestAction = 'GET_STATISTIC_REQUEST';
export const getStatisticFailureAction = 'GET_STATISTIC_FAILURE';
export const fetchRandomUserRequestAction = 'FETCH_RANDOM_USER_REQUEST';
export const fetchRandomUserFailureAction = 'FETCH_RANDOM_USER_FAILURE';
export const getAllUsersRequestAction = 'GET_ALL_USERS_REQUEST';
export const getAllUsersFailureAction = 'GET_ALL_USERS_FAILURE';
export const updateUserScoreRequestAction = 'UPDATE_USER_SCORE_REQUEST';
export const updateUserScoreFailureAction = 'UPDATE_USER_SCORE_FAILURE';
