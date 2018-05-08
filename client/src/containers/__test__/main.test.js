
import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import RouterProvider from '../router-provider';
import store from '../../store';
import Main from '../main';

let subject;
const testStore = store();

const buildSubject = props => (
  <RouterProvider>
    <Provider store={testStore}>
      <Main {...props} />
    </Provider>
  </RouterProvider>
);

beforeEach(() => {
  subject = buildSubject();
});

test('Render main', () => {
  const component = renderer.create(subject);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render loading icon on fetching', () => {
  subject = buildSubject({
    link: {
      ...testStore.getState().link,
      isFetching: true,
    },
  });

  const component = renderer.create(subject);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render link preview', () => {
  subject = buildSubject({
    link: {
      ...testStore.getState().link,
      models: [{
        id: 'anId',
        linkURL: 'http://www.google.fr',
        shortURL: '/link/anId',
      }],
    },
  });

  const component = renderer.create(subject);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
