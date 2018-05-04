
import store from 'store2';
import Client from './api-client';

const credentials = { login: 'foo', password: 'bar' };

test('Throw error if invalid credentials', () => {
  const setTemporaryCredentials = () => {
    Client.setTemporaryCredentials({});
  };

  const saveCredentials = () => {
    Client.saveCredentials({});
  };

  expect(setTemporaryCredentials).toThrow();
  expect(saveCredentials).toThrow();
});

test('Set temporary credentials', () => {
  Client.setTemporaryCredentials(credentials);
  expect(Client.credentials).toEqual(credentials);
});

test('Persist credentials in session storage', () => {
  Client.saveCredentials(credentials);
  expect(Client.credentials).toEqual(credentials);
  expect(store.session.get('credentials')).toEqual(credentials);
});

test('Remove credentials', () => {
  Client.saveCredentials(credentials).resetCredentials();

  expect(Client.credentials).toEqual(null);
  expect(store.session.get('credentials')).toEqual(null);
});

test('Parse params for API request', () => {
  Client.saveCredentials(credentials);

  const params = Client.parseRequestParams({
    endpoint: 'link',
    method: 'GET',
    auth: true,
    query: { active: false },
  });

  expect(params).toEqual({
    url: '/link?active=false',
    method: 'GET',
    body: JSON.stringify({}),
    headers: {
      Authorization: 'Basic Zm9vOmJhcg==',
      'Content-Type': 'application/json',
    },
  });
});


