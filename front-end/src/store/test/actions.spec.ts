import React from 'react';
import {
  fetchRandomUser,
  getAllUsers,
  saveUserInfoToDB,
  getUserInfo,
  updateUserScore,
  getStatistic,
  createStatistic,
} from '../actions';
import { describe, it, expect, jest } from '@jest/globals';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const user = {
  id: 4,
  score: 22,
  date: '10.11.2021 15:27',
  time: '03:21',
  first_name: 'Arthur',
  last_name: 'Klingbeil',
  best_score: 22,
};

const statistic = {
  id: 3,
  score: 22,
  date: '10.11.2021 15:27',
  time: '03:21',
};

const responseForUser = {
  data: {
    best_score: 22,
    name: 'Arthur Klingbeil',
    user_id: 4,
    first_name: 'Arthur',
    last_name: 'Klingbeil',
    usersList: [
      { first_name: 'Philip', last_name: 'Kristensen', user_id: 7 },
      { first_name: 'Vincent', last_name: 'Addy', user_id: 5 },
    ],
    allUsers: [
      { name: 'Philip Kristensen', id: 7 },
      { name: 'Vincent Addy', id: 5 },
    ],
  },
};

const responseForStatistic = {
  data: {
    date: '11/11/2021 10:13',
    time: '02:55',
    best_score: 22,
    id: 3,
  },
};

describe('Test fetchRandomUser action ', async () => {
  it('should be called with type: "FETCH_RANDOM_USER_REQUEST" when API call is successful', async () => {
    const asyncAction = fetchRandomUser();
    const mock = new MockAdapter(axios);
    mock.onGet('https://randomuser.me/api').reply(200, {
      results: [{ name: { first: 'Olena', last: 'Mohylivska' } }],
    });
    const dispatch = jest.fn();
    await asyncAction(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'FETCH_RANDOM_USER_REQUEST',
      payload: undefined,
    });
  });

  it(`should be called with types: "FETCH_RANDOM_USER_REQUEST", "FETCH_RANDOM_USER_FAILURE", "SET_USER_INFO",
  "SET_USER_INFO" when API call is failed`, async () => {
    const asyncAction = fetchRandomUser();
    const mock = new MockAdapter(axios);
    mock.onGet('https://wrong/api').reply(200);
    const dispatch = jest.fn();
    await asyncAction(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'FETCH_RANDOM_USER_REQUEST',
      payload: undefined,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'FETCH_RANDOM_USER_FAILURE',
      payload: 'Request failed with status code 404',
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_USER_INFO',
      payload: {
        name: 'Default user',
      },
    });
  });
});

describe('Test getAllUsers action', async () => {
  it('should be called with type: "GET_ALL_USERS_REQUEST", "SET_USERS_LIST" when API call is successful', async () => {
    const asyncAction = getAllUsers();
    const mock = new MockAdapter(axios);
    mock.onGet('/api/users').reply(200, responseForUser.data.usersList);
    const dispatch = jest.fn();
    await asyncAction(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'GET_ALL_USERS_REQUEST',
      payload: undefined,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_USERS_LIST',
      payload: responseForUser.data.allUsers,
    });
  });

  it(`should be called with type: "GET_ALL_USERS_REQUEST", "GET_ALL_USERS_FAILURE" 
  when API call is failed`, async () => {
    const asyncAction = getAllUsers();
    const mock = new MockAdapter(axios);
    mock.onGet('/api/wrong').reply(200, responseForUser);
    const dispatch = jest.fn();
    await asyncAction(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'GET_ALL_USERS_REQUEST',
      payload: undefined,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'GET_ALL_USERS_FAILURE',
      payload: 'Request failed with status code 404',
    });
  });
});

describe('Test saveUserInfoToDB action', async () => {
  it(`should be called with type: "SET_USER_INFO_REQUEST", "SET_USER_INFO", 
    "SAVE_USER_NAME_SUCCESS"  when API call is successful`, async () => {
    const asyncAction = saveUserInfoToDB({
      first: user.first_name,
      last: user.last_name,
    });
    const mock = new MockAdapter(axios);
    mock
      .onPost('/api/users', {
        first_name: user.first_name,
        last_name: user.last_name,
      })
      .reply(200, responseForUser.data);

    const dispatch = jest.fn();
    await asyncAction(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SAVE_USER_INFO_REQUEST',
      payload: undefined,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_USER_INFO',
      payload: {
        id: responseForUser.data.user_id,
        name: responseForUser.data.name,
      },
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SAVE_USER_NAME_SUCCESS',
      payload: {
        id: responseForUser.data.user_id,
        name: responseForUser.data.name,
      },
    });
  });

  it(`should be called with type: "SET_USER_INFO_REQUEST", "SAVE_USER_INFO_FAILURE" 
    when API call is failure`, async () => {
    const asyncAction = saveUserInfoToDB({
      first: user.first_name,
      last: user.last_name,
    });
    const mock = new MockAdapter(axios);
    mock
      .onPost('/api/wrong', {
        first_name: user.first_name,
        last_name: user.last_name,
      })
      .reply(200, responseForUser.data);

    const dispatch = jest.fn();
    await asyncAction(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SAVE_USER_INFO_REQUEST',
      payload: undefined,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SAVE_USER_INFO_FAILURE',
      payload: 'Request failed with status code 404',
    });
  });
});

describe('Test getUserInfo action', async () => {
  it(`should be called with type: "GET_USER_INFO_REQUEST", "SET_USER_INFO", 
    "SET_USER_BEST_SCORE"  when API call is successful`, async () => {
    const asyncAction = getUserInfo(user);
    const mock = new MockAdapter(axios);
    mock.onGet(`/api/user?id=${user.id}`).reply(200, responseForUser.data);

    const dispatch = jest.fn();
    await asyncAction(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'GET_USER_INFO_REQUEST',
      payload: undefined,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_USER_INFO',
      payload: {
        id: responseForUser.data.user_id,
        name: responseForUser.data.name,
      },
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_USER_BEST_SCORE',
      payload: responseForUser.data.best_score,
    });
  });

  it(`should be called with type: "GET_USER_INFO_REQUEST", "GET_USER_INFO_FAILURE"
  when API call is wrong`, async () => {
    const asyncAction = getUserInfo(user);
    const mock = new MockAdapter(axios);
    mock.onGet('/api/wrong').reply(200, responseForUser);

    const dispatch = jest.fn();
    await asyncAction(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'GET_USER_INFO_REQUEST',
      payload: undefined,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'GET_USER_INFO_FAILURE',
      payload: 'Request failed with status code 404',
    });
  });
});

describe('Test updateUserScore action', async () => {
  it(`should be called with type: "UPDATE_USER_SCORE_REQUEST", "SET_USER_INFO", 
    "SET_USER_BEST_SCORE" when API call is successful`, async () => {
    const asyncAction = updateUserScore(user);
    const mock = new MockAdapter(axios);
    const re = mock
      .onPut('/api/user', {
        user_id: user.id,
        best_score: user.score,
      })
      .reply(200, responseForUser.data);

    const dispatch = jest.fn();
    await asyncAction(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'UPDATE_USER_SCORE_REQUEST',
      payload: undefined,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_USER_BEST_SCORE',
      payload: responseForUser.data.best_score,
    });
  });

  it(`should be called with type: "UPDATE_USER_SCORE_REQUEST", "UPDATE_USER_SCORE_FAILURE" 
  when API call is wrong`, async () => {
    const asyncAction = updateUserScore(user);
    const mock = new MockAdapter(axios);
    mock
      .onPut('/api/wrong', {
        user_id: user.id,
        best_score: user.score,
      })
      .reply(200, responseForUser);

    const dispatch = jest.fn();
    await asyncAction(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'UPDATE_USER_SCORE_REQUEST',
      payload: undefined,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'UPDATE_USER_SCORE_FAILURE',
      payload: 'Request failed with status code 404',
    });
  });
});

describe('Test getStatistic action', async () => {
  it(`should be called with type: "GET_STATISTIC_REQUEST", "SET_STATISTIC_SUCCESS"
    when API call is successful`, async () => {
    const asyncAction = getStatistic(statistic);
    const mock = new MockAdapter(axios);
    mock
      .onGet(`/api/statistic?id=${statistic.id}`)
      .reply(200, responseForStatistic);
    const dispatch = jest.fn();
    await asyncAction(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'GET_STATISTIC_REQUEST',
      payload: undefined,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_STATISTIC_SUCCESS',
      payload: responseForStatistic,
    });
  });

  it(`should be called with type: "GET_STATISTIC_REQUEST", "GET_STATISTIC_FAILURE" 
  when API call is wrong`, async () => {
    const asyncAction = getStatistic(statistic);
    const mock = new MockAdapter(axios);
    mock.onGet('/api/statistic/wrong').reply(200, responseForStatistic);

    const dispatch = jest.fn();
    await asyncAction(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'GET_STATISTIC_REQUEST',
      payload: undefined,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'GET_STATISTIC_FAILURE',
      payload: 'Request failed with status code 404',
    });
  });
});

describe('Test createStatistic action', async () => {
  it(`should be called with type: "SET_STATISTIC_REQUEST", 
    "SET_STATISTIC_SUCCESS" when API call is successful`, async () => {
    const asyncAction = createStatistic(statistic);
    const mock = new MockAdapter(axios);
    mock.onPost('/api/statistic').reply(200, responseForStatistic);

    const dispatch = jest.fn();
    await asyncAction(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_STATISTIC_REQUEST',
      payload: undefined,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_STATISTIC_SUCCESS',
      payload: responseForStatistic,
    });
  });

  it(`should be called with type: "SET_STATISTIC_REQUEST", "SET_STATISTIC_FAILURE" 
  when API call is wrong`, async () => {
    const asyncAction = createStatistic(statistic);
    const mock = new MockAdapter(axios);
    mock.onPost('/api/wrong').reply(200, responseForStatistic);

    const dispatch = jest.fn();
    await asyncAction(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_STATISTIC_REQUEST',
      payload: undefined,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_STATISTIC_FAILURE',
      payload: 'Request failed with status code 404',
    });
  });
});
