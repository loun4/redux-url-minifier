import apiErrors from '../api-errors';

test('handle API_GET_ERROR', () => {
  const action = {
    type: 'API_GET_ERROR',
    error: { status: 403 },
  };

  expect(apiErrors(undefined, action)).toEqual({
    status: 403,
    type: 'get',
  });
});

test('handle API_SAVE_ERROR', () => {
  const action = {
    type: 'API_SAVE_ERROR',
    error: { status: 500 },
  };

  expect(apiErrors(undefined, action)).toEqual({
    status: 500,
    type: 'save',
  });
});

test('handle API_CLEAR_ERROR', () => {
  const action = {
    type: 'API_CLEAR_ERROR',
  };

  expect(apiErrors({ status: 403, type: 'save' }, action)).toEqual({});
});
