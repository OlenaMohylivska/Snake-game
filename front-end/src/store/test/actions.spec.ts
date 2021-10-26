import React from 'react';
import { fetchUser } from '../actions';
import { describe, it, expect, jest } from '@jest/globals';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const user = { results: [{ name: { first: 'John', last: 'Smith' } }] };

describe('Test fetchUser action when API call is successful', async () => {
  it(`should be called with type: "SET_USER_NAME", 
      contain name: "John Smith" and empty error in payload`, async () => {
    const asyncAction = fetchUser();
    const mock = new MockAdapter(axios);
    mock.onGet('https://randomuser.me/api').reply(200, user);
    const dispatch = jest.fn();
    await asyncAction(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_USER_NAME',
      payload: {
        error: '',
        name: 'John Smith',
      },
    });
  });
});

describe('Test fetchUser action when API call is failed', async () => {
  it(`should be called with type: "SET_USER_NAME", contain name: "Default user" 
      and error: "Request failed with status code 404" in payload`, async () => {
    const asyncAction = fetchUser();
    const mock = new MockAdapter(axios);
    mock.onGet('https://wrong/api').reply(200, user);
    const dispatch = jest.fn();
    await asyncAction(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_USER_NAME',
      payload: {
        error: 'Request failed with status code 404',
        name: 'Default user',
      },
    });
  });
});
