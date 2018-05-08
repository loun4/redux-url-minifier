
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchEntityData, removeEntityData, saveEntityData } from '../../actions/api';

const links = [
  {
    id: 'anId',
    linkURL: 'http://www.google.fr',
  },
  {
    id: 'anId2',
    linkURL: 'http://www.github.com',
  },
];

const mockStore = configureMockStore([thunk]);

test('dispatch REQUEST_ALL_DATA then RECEIVE_ALL_DATA after fetch', () => {
  const store = mockStore({});
  fetch.mockResponseOnce(JSON.stringify(links));

  const expectedActions = [
    { type: 'REQUEST_ALL_DATA', entity: 'link' },
    { type: 'RECEIVE_ALL_DATA', entity: 'link', data: links },
  ];

  return store.dispatch(fetchEntityData({ entity: 'link' })).then(() => {
    expect(store.getActions()).toEqual(expectedActions);
  });
});

test('dispatch REQUEST_SAVE_DATA then RECEIVE_NEW_DATA after create', () => {
  const store = mockStore({});
  fetch.mockResponseOnce(JSON.stringify(links[0]));

  const expectedActions = [
    { type: 'REQUEST_SAVE_DATA', entity: 'link' },
    { type: 'RECEIVE_NEW_DATA', entity: 'link', data: links[0] },
  ];

  const payload = { entity: 'link', model: { linkURL: 'http://www.google.fr' } };
  return store.dispatch(saveEntityData(payload)).then(() => {
    expect(store.getActions()).toEqual(expectedActions);
  });
});

test('dispatch REQUEST_SAVE_DATA then RECEIVE_UPDATE_DATA after update', () => {
  const store = mockStore({});
  fetch.mockResponseOnce(JSON.stringify(links[0]));

  const expectedActions = [
    { type: 'REQUEST_SAVE_DATA', entity: 'link' },
    { type: 'RECEIVE_UPDATE_DATA', entity: 'link', data: links[0] },
  ];

  const payload = { entity: 'link', model: links[0] };
  return store.dispatch(saveEntityData(payload)).then(() => {
    expect(store.getActions()).toEqual(expectedActions);
  });
});

test('dispatch REQUEST_SAVE_DATA then RECEIVE_REMOVE_DATA after update', () => {
  const store = mockStore({});
  fetch.mockResponseOnce(JSON.stringify(links[0]));

  const expectedActions = [
    { type: 'REQUEST_SAVE_DATA', entity: 'link' },
    { type: 'RECEIVE_REMOVE_DATA', entity: 'link', data: links[0] },
  ];

  const payload = { entity: 'link', model: links[0] };
  return store.dispatch(removeEntityData(payload)).then(() => {
    expect(store.getActions()).toEqual(expectedActions);
  });
});

test('dispatch API_GET_ERROR on fetch error', () => {
  const store = mockStore({});
  fetch.resetMocks();
  fetch.mockResponse(JSON.stringify({}), { status: 401 });

  const expectedActions = [
    { type: 'REQUEST_ALL_DATA', entity: 'link' },
    { type: 'API_GET_ERROR', error: { status: 401, statusText: 'OK' } },
  ];

  return store.dispatch(fetchEntityData({ entity: 'link' })).then(() => {
    expect(store.getActions()).toEqual(expectedActions);
  });
});

test('dispatch API_SAVE_ERROR on create error', () => {
  const store = mockStore({});
  fetch.resetMocks();
  fetch.mockResponse(JSON.stringify({}), { status: 401 });

  const expectedActions = [
    { type: 'REQUEST_SAVE_DATA', entity: 'link' },
    { type: 'API_SAVE_ERROR', error: { status: 401, statusText: 'OK' } },
  ];

  const payload = { entity: 'link', model: links[0] };
  return store.dispatch(saveEntityData(payload)).then(() => {
    expect(store.getActions()).toEqual(expectedActions);
  });
});

test('dispatch API_SAVE_ERROR on remove error', () => {
  const store = mockStore({});
  fetch.resetMocks();
  fetch.mockResponse(JSON.stringify({}), { status: 401 });

  const expectedActions = [
    { type: 'REQUEST_SAVE_DATA', entity: 'link' },
    { type: 'API_SAVE_ERROR', error: { status: 401, statusText: 'OK' } },
  ];

  const payload = { entity: 'link', model: links[0] };
  return store.dispatch(removeEntityData(payload)).then(() => {
    expect(store.getActions()).toEqual(expectedActions);
  });
});

test('dispatch API_SAVE_ERROR and API_CLEAR_ERROR after setTimeout', () => {
  const store = mockStore({});
  jest.useFakeTimers();
  fetch.resetMocks();
  fetch.mockResponse(JSON.stringify({}), { status: 401 });

  const expectedActions = [
    { type: 'REQUEST_SAVE_DATA', entity: 'link' },
    { type: 'API_SAVE_ERROR', error: { status: 401, statusText: 'OK' } },
  ];

  const payload = { entity: 'link', model: links[0] };

  return store.dispatch(saveEntityData(payload)).then(() => {
    expect(store.getActions()).toEqual(expectedActions);
  }).then(() => {
    setTimeout(() => {
      expect(store.getActions()).toContainEqual({ type: 'API_CLEAR_ERROR' });
    }, 4000);
    jest.runAllTimers();
  });
});
