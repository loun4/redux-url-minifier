import session, { initialState } from '../session';

test('handle REQUEST_AUTHENTICATION', () => {
  const action = { type: 'REQUEST_AUTHENTICATION' };

  expect(session(initialState, action)).toEqual({
    readyToAuthenticate: false,
    isFetching: true,
    isAuthenticated: false,
  });
});

test('handle FAILED_AUTHENTICATION', () => {
  const action = { type: 'FAILED_AUTHENTICATION' };

  expect(session(initialState, action)).toEqual({
    readyToAuthenticate: false,
    isFetching: false,
    isAuthenticated: false,
  });
});

test('handle AUTHENTICATED', () => {
  const action = { type: 'AUTHENTICATED' };

  expect(session(initialState, action)).toEqual({
    readyToAuthenticate: false,
    isFetching: false,
    isAuthenticated: true,
  });
});

test('handle DEAUTHENTICATED', () => {
  const action = { type: 'DEAUTHENTICATED' };

  expect(session(initialState, action)).toEqual({
    readyToAuthenticate: false,
    isFetching: false,
    isAuthenticated: false,
  });
});
