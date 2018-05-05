
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { authenticate, deauthenticate } from '../actions/session';

const mockStore = configureMockStore([thunk]);

test('dispatch REQUEST_AUTHENTICATION then AUTHENTICATED', () => {
  const store = mockStore({});
  fetch.resetMocks();
  fetch.mockResponseOnce(JSON.stringify({}));

  return store.dispatch(authenticate()).then(() => {
    const storeActions = store.getActions();

    const requestAction = storeActions
      .find(({ type }) => type === 'REQUEST_AUTHENTICATION');

    const authAction = storeActions
      .find(({ type }) => type === 'AUTHENTICATED');

    expect(requestAction).toBeTruthy();
    expect(authAction).toBeTruthy();
  });
});

test('dispatch REQUEST_AUTHENTICATION then AUTHENTICATION_FAILURE', () => {
  const store = mockStore({});
  fetch.mockRejectOnce({ status: 401 });

  return store.dispatch(authenticate()).catch(() => {
    const storeActions = store.getActions();

    const requestAction = storeActions
      .find(({ type }) => type === 'REQUEST_AUTHENTICATION');

    const authAction = storeActions
      .find(({ type }) => type === 'FAILED_AUTHENTICATION');

    expect(requestAction).toBeTruthy();
    expect(authAction).toBeTruthy();
  });
});

test('dispatch DEAUTHENTICATED', () => {
  const store = mockStore({});
  store.dispatch(deauthenticate());

  const action = store.getActions()
    .find(({ type }) => type === 'DEAUTHENTICATED');

  expect(action).toBeTruthy();
});
