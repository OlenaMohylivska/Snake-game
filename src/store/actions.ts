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
