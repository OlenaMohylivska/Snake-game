import { ChangeDirectionActions, ChangeNumberCellsActions, SetDirectionActions } from './types'
import { createAction } from '@reduxjs/toolkit';

export const moveTopAction = createAction(ChangeDirectionActions.CHANGE_DIRECTION_TOP);
export const moveBottomAction = createAction(ChangeDirectionActions.CHANGE_DIRECTION_BOTTOM);
export const moveLeftAction = createAction(ChangeDirectionActions.CHANGE_DIRECTION_LEFT);
export const moveRightAction = createAction(ChangeDirectionActions.CHANGE_DIRECTION_RIGHT);
export const changeNumberOfColumns = createAction<number>(ChangeNumberCellsActions.CHANGE_NUMBER_COLUMNS);
export const changeNumberOfRows = createAction<number>(ChangeNumberCellsActions.CHANGE_NUMBER_ROWS);

export const setDirectionTop = createAction<string>(SetDirectionActions.SET_DIRECTION_TOP);
export const setDirectionBottom = createAction<string>(SetDirectionActions.SET_DIRECTION_BOTTOM);
export const setDirectionLeft = createAction<string>(SetDirectionActions.SET_DIRECTION_LEFT);
export const setDirectionRight = createAction<string>(SetDirectionActions.SET_DIRECTION_RIGHT);
