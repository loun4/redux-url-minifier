
import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import RouterProvider from '../../containers/router-provider';
import Header from '../header';

const deauthenticate = jest.fn();

const buildSubject = isAuthenticated => (
  <RouterProvider>
    <Header isAuthenticated={isAuthenticated} deauthenticate={deauthenticate} />
  </RouterProvider>
);

test('Render header before authentication', () => {
  const component = renderer.create(buildSubject(false));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render header after authentication', () => {
  const component = renderer.create(buildSubject(true));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('call deauthenticate', () => {
  const component = mount(buildSubject(true));
  component.find('.sign').simulate('click');
  expect(deauthenticate).toHaveBeenCalled();
});
