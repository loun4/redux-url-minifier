
import entitiesReducer from '../reducers/entities';

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

const newLink = {
  id: 'anId3',
  linkURL: 'http://www.yahoo.com',
};

const updatedLink = {
  id: 'anId3',
  linkURL: 'http://www.gitlab.com',
};

const populatedState = {
  link: {
    isFetching: false,
    isSaving: true,
    data: links,
  },
};

test('handle REQUEST_ALL_DATA', () => {
  const loadingAction = { type: 'REQUEST_ALL_DATA', entity: 'link' };

  expect(entitiesReducer(undefined, loadingAction)).toEqual({
    link: { isFetching: true, isSaving: false, data: [] },
  });
});

test('handle RECEIVE_ALL_DATA', () => {
  const receivingAction = { type: 'RECEIVE_ALL_DATA', entity: 'link', data: links };

  expect(entitiesReducer(undefined, receivingAction)).toEqual({
    link: { isFetching: false, isSaving: false, data: links },
  });
});

test('handle REQUEST_SAVE_DATA', () => {
  const savingAction = { type: 'REQUEST_SAVE_DATA', entity: 'link' };

  expect(entitiesReducer(undefined, savingAction)).toEqual({
    link: { isFetching: false, isSaving: true, data: [] },
  });
});

test('handle RECEIVE_NEW_DATA', () => {
  const receivingAction = { type: 'RECEIVE_NEW_DATA', entity: 'link', data: newLink };

  expect(entitiesReducer(populatedState, receivingAction)).toEqual({
    link: { isFetching: false, isSaving: false, data: links.concat(newLink) },
  });
});

test('handle RECEIVE_UPDATE_DATA', () => {
  const receivingAction = { type: 'RECEIVE_UPDATE_DATA', entity: 'link', data: updatedLink };
  const state = {
    link: {
      ...populatedState.link,
      data: populatedState.link.data.concat(newLink),
    },
  };

  expect(entitiesReducer(state, receivingAction)).toEqual({
    link: { isFetching: false, isSaving: false, data: links.concat(updatedLink) },
  });
});

test('handle RECEIVE_REMOVE_DATA', () => {
  const receivingAction = { type: 'RECEIVE_REMOVE_DATA', entity: 'link', data: links[0] };
  const state = {
    link: {
      ...populatedState.link,
      data: links,
    },
  };

  expect(entitiesReducer(state, receivingAction)).toEqual({
    link: { isFetching: false, isSaving: false, data: links.slice(1) },
  });
});

