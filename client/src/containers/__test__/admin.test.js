
import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import RouterProvider from '../router-provider';
import store from '../../store';
import ConnectedAdmin, { Admin } from '../admin';

let subject;
const testStore = store();

const buildSubject = props => (
  <RouterProvider>
    <Provider store={testStore}>
      <ConnectedAdmin {...props} />
    </Provider>
  </RouterProvider>
);

beforeEach(() => {
  subject = buildSubject();
});

test('Render admin', () => {
  const component = renderer.create(subject);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render loading icon on fetching', () => {
  const s = buildSubject({
    session: {
      ...testStore.getState().session,
      isFetching: true,
    },
  });

  const component = renderer.create(s);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render loading icon if session is ready for auth', () => {
  const s = buildSubject({
    session: {
      ...testStore.getState().session,
      readyToAuthenticate: true,
    },
  });

  const component = renderer.create(s);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render signin form is deauthenticated', () => {
  const component = renderer.create(subject);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render link form & table if authenticated', () => {
  const s = buildSubject({
    session: {
      ...testStore.getState().session,
      isAuthenticated: true,
    },
  });

  const component = renderer.create(s);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render call fetchEntityData', () => {
  const props = mount(subject).find(Admin).first().props();
  const fetchEntityData = jest.fn();
  const component = shallow(<Admin {...props} fetchEntityData={fetchEntityData} />);

  component.setProps({
    session: {
      ...testStore.getState().session,
      isAuthenticated: true,
    },
  });

  expect(fetchEntityData).toHaveBeenCalled();
});
