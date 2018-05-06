
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { apiGetError, apiSaveError, apiClearError } from '../../actions/api-errors';

const mockStore = configureMockStore([thunk]);

test('dispatch API_GET_ERROR', () => {
  const store = mockStore({});
  const action = [{ type: 'API_GET_ERROR', error: { status: 401 } }];

  store.dispatch(apiGetError({ status: 401 }));
  expect(store.getActions()).toEqual(action);
});

test('dispatch API_SAVE_ERROR', () => {
  const store = mockStore({});
  const action = [{ type: 'API_SAVE_ERROR', error: { status: 403 } }];

  store.dispatch(apiSaveError({ status: 403 }));
  expect(store.getActions()).toEqual(action);
});

test('dispatch API_CLEAR_ERROR', () => {
  const store = mockStore({});
  const action = [{ type: 'API_CLEAR_ERROR' }];

  store.dispatch(apiClearError());
  expect(store.getActions()).toEqual(action);
});
