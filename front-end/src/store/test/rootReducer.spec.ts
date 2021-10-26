import React from 'react';
import { initialState, rootReducer } from '../rootReducer';
import { describe, it, expect } from '@jest/globals';
import { createAction } from '@reduxjs/toolkit';

describe('Test rootReducer', () => {
  it('should change position to [1, 2]', () => {
    const action = createAction<number[]>('SET_POSITION');
    const oldValue = initialState.position;
    const newValue = [...oldValue, 2];
    const expectedResult = { ...initialState, position: [1, 2] };
    expect(rootReducer(initialState, action(newValue))).toEqual(expectedResult);
  });

  it('should change number of columns to 10', () => {
    const action = createAction<number>('COLUMNS');
    const newValue = 10;
    const expectedResult = {
      ...initialState,
      size: { columns: newValue, rows: initialState.size.rows },
    };
    expect(rootReducer(initialState, action(newValue))).toEqual(expectedResult);
  });

  it('should change number of rows to 5', () => {
    const action = createAction<number>('ROWS');
    const newValue = 5;
    const expectedResult = {
      ...initialState,
      size: { columns: initialState.size.columns, rows: newValue },
    };
    expect(rootReducer(initialState, action(newValue))).toEqual(expectedResult);
  });

  it('should set direction to "TOP"', () => {
    const action = createAction<string>('SET_DIRECTION');
    const newValue = 'TOP';
    const expectedResult = { ...initialState, direction: newValue };
    expect(rootReducer(initialState, action(newValue))).toEqual(expectedResult);
  });

  it('should set fruit position to "56"', () => {
    const action = createAction<number>('SET_FRUIT_POSITION');
    const newValue = 56;
    const expectedResult = { ...initialState, fruitPosition: newValue };
    expect(rootReducer(initialState, action(newValue))).toEqual(expectedResult);
  });

  it('should set timer info to "1:23"', () => {
    const action = createAction<string>('SET_TIMER_INFO');
    const newValue = '1:23';
    const expectedResult = { ...initialState, timerInfo: newValue };
    expect(rootReducer(initialState, action(newValue))).toEqual(expectedResult);
  });

  it('should set userName to "Bob"', () => {
    const action = createAction<object>('SET_USER_NAME');
    const newValue = { name: 'Bob', error: '' };
    const expectedResult = { ...initialState, userName: newValue };
    expect(rootReducer(initialState, action(newValue))).toEqual(expectedResult);
  });

  it('should reset position to [1] and keep Bob', () => {
    const actionReset = createAction('RESET_GAME_PROGRESS');
    const actionSetPosition = createAction<number[]>('SET_POSITION');
    const actionSetUserName = createAction<object>('SET_USER_NAME');
    const newUserNameValue = { name: 'Bob', error: '' };
    const newPositionValue = [1, 2];
    const expectedPositionResult = {
      ...initialState,
      position: newPositionValue,
    };
    let newState = rootReducer(
      initialState,
      actionSetPosition(newPositionValue)
    );
    expect(newState).toEqual(expectedPositionResult);

    const expectedUserNameResult = { ...newState, userName: newUserNameValue };
    newState = rootReducer(newState, actionSetUserName(newUserNameValue));
    expect(newState).toEqual(expectedUserNameResult);

    const expectedResetResult = { ...initialState, userName: newUserNameValue };
    expect(rootReducer(newState, actionReset())).toEqual(expectedResetResult);
  });
});
