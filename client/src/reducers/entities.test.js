
import entitiesReducer from './entities';

const links = [
  {
    id: 'anId',
    linkURL: 'http://www.google.fr',
    shortURL: '/link/anId',
    createdAt: null,
  },
  {
    id: 'anId2',
    linkURL: 'http://www.github.com',
    shortURL: '/link/anId2',
    createdAt: null,
  },
];

const newLink = {
  id: 'anId3',
  linkURL: 'http://www.yahoo.com',
  shortURL: '/link/anId3',
  createdAt: null,
};

const updatedLink = {
  id: 'anId3',
  linkURL: 'http://www.gitlab.com',
  shortURL: '/link/anId3',
  createdAt: null,
};

const populatedState = {
  link: {
    isFetching: false,
    isSaving: true,
    models: links,
  },
};

test('handle REQUEST_ALL_DATA', () => {
  const action = { type: 'REQUEST_ALL_DATA', entity: 'link' };

  expect(entitiesReducer(undefined, action)).toEqual({
    link: { isFetching: true, isSaving: false, models: [] },
  });
});

test('handle RECEIVE_ALL_DATA', () => {
  const action = { type: 'RECEIVE_ALL_DATA', entity: 'link', data: links };

  expect(entitiesReducer(undefined, action)).toEqual({
    link: { isFetching: false, isSaving: false, models: links },
  });
});

test('handle REQUEST_SAVE_DATA', () => {
  const action = { type: 'REQUEST_SAVE_DATA', entity: 'link' };

  expect(entitiesReducer(undefined, action)).toEqual({
    link: { isFetching: false, isSaving: true, models: [] },
  });
});

test('handle RECEIVE_NEW_DATA', () => {
  const action = { type: 'RECEIVE_NEW_DATA', entity: 'link', data: newLink };

  expect(entitiesReducer(populatedState, action)).toEqual({
    link: { isFetching: false, isSaving: false, models: [newLink].concat(links) },
  });
});

test('handle RECEIVE_UPDATE_DATA', () => {
  const action = { type: 'RECEIVE_UPDATE_DATA', entity: 'link', data: updatedLink };
  const state = {
    link: {
      ...populatedState.link,
      models: populatedState.link.models.concat(newLink),
    },
  };

  expect(entitiesReducer(state, action)).toEqual({
    link: { isFetching: false, isSaving: false, models: links.concat(updatedLink) },
  });
});

test('handle RECEIVE_REMOVE_DATA', () => {
  const action = { type: 'RECEIVE_REMOVE_DATA', entity: 'link', data: links[0] };
  const state = {
    link: {
      ...populatedState.link,
      models: links,
    },
  };

  expect(entitiesReducer(state, action)).toEqual({
    link: { isFetching: false, isSaving: false, models: links.slice(1) },
  });
});

