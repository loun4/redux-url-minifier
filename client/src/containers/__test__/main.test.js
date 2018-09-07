import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import store from '../../store';
import Main from '../main';
import RouterProvider from '../router-provider';

test('Render main', () => {
  const subject = (
    <RouterProvider>
      <Provider store={store()}>
        <Main />
      </Provider>
    </RouterProvider>
  );

  const component = renderer.create(subject);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
