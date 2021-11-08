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
export const setUserNameAction = 'SET_USER_NAME';
export const setUsersListAction = 'SET_USERS_LIST';
export const setUserBestScoreAction = 'SET_USER_BEST_SCORE';
export const saveUserInfoRequestAction = 'SAVE_USER_INFO_REQUEST';
export const saveUserNameSuccessAction = 'SAVE_USER_NAME_SUCCESS';
export const saveUserInfoFailureAction = 'SAVE_USER_INFO_FAILURE';
export const getUserInfoRequestAction = 'GET_USER_INFO_REQUEST';
