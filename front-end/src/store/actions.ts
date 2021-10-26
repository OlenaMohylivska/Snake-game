import {
  SetPositionAction,
  ChangeNumberCellsActions,
  SetDirectionAction,
  SetFruitPositionAction,
  setTimerInfoAction,
  resetStateAction,
  resetGameProgressAction,
  setUserNameAction,
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

export const fetchUser = () => {
  return (dispatch: (action: AnyAction) => void) => {
    return axios('https://randomuser.me/api')
      .then((res: any) => {
        dispatch(
          setUserName({
            name: `${res.data.results[0].name.first} ${res.data.results[0].name.last}`,
            error: '',
          })
        );
      })
      .catch((error) => {
        dispatch(setUserName({ name: 'Default user', error: error.message }));
      });
  };
};
