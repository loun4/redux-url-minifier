import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { authenticate, deauthenticate } from '../../actions/session';

const mockStore = configureMockStore([thunk]);

test('dispatch REQUEST_AUTHENTICATION then AUTHENTICATED', () => {
  const store = mockStore({});
  fetch.resetMocks();
  fetch.mockResponseOnce(JSON.stringify({}));

  return store.dispatch(authenticate()).then(() => {
    const storeActions = store.getActions();

    expect(storeActions).toContainEqual({ type: 'REQUEST_AUTHENTICATION' });
    expect(storeActions).toContainEqual({ type: 'AUTHENTICATED' });
    expect(storeActions).toContainEqual({ type: 'API_CLEAR_ERROR' });
  });
});

test('dispatch REQUEST_AUTHENTICATION then FAILED_AUTHENTICATION', () => {
  const store = mockStore({});
  fetch.mockRejectOnce({ status: 401 });

  return store.dispatch(authenticate()).catch(() => {
    const storeActions = store.getActions();

    expect(storeActions).toContainEqual({ type: 'REQUEST_AUTHENTICATION' });
    expect(storeActions).toContainEqual({ type: 'FAILED_AUTHENTICATION' });
    expect(storeActions).toContainEqual({ type: 'API_CLEAR_ERROR' });
  });
});

test('dispatch DEAUTHENTICATED', () => {
  const store = mockStore({});
  store.dispatch(deauthenticate());
  const storeActions = store.getActions();

  expect(storeActions).toContainEqual({ type: 'DEAUTHENTICATED' });
  expect(storeActions).toContainEqual({ type: 'API_CLEAR_ERROR' });
});
