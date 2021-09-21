import { ChangeDirectionActions, 
  ChangeNumberCellsActions, 
  SetDirectionAction, 
  SetFruitPositionAction, 
  setTimerInfoAction, 
  resetStateAction, 
  resetGameProgressAction,
  setUserNameAction } from './types'
import { createAction } from '@reduxjs/toolkit';

export const moveTopAction = createAction(ChangeDirectionActions.CHANGE_DIRECTION_TOP);
export const moveBottomAction = createAction(ChangeDirectionActions.CHANGE_DIRECTION_BOTTOM);
export const moveLeftAction = createAction(ChangeDirectionActions.CHANGE_DIRECTION_LEFT);
export const moveRightAction = createAction(ChangeDirectionActions.CHANGE_DIRECTION_RIGHT);
export const changeNumberOfColumns = createAction<number>(ChangeNumberCellsActions.CHANGE_NUMBER_COLUMNS);
export const changeNumberOfRows = createAction<number>(ChangeNumberCellsActions.CHANGE_NUMBER_ROWS);
export const setDirection = createAction<string>(SetDirectionAction);
export const setFruitPosition = createAction<number>(SetFruitPositionAction);
export const setTimerInfo = createAction<string>(setTimerInfoAction);
export const resetState = createAction(resetStateAction);
export const resetGameProgress = createAction(resetGameProgressAction);
export const setUserName = createAction<string>(setUserNameAction);
