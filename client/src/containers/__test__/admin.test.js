import { mount, shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import store from '../../store';
import ConnectedAdmin, { Admin } from '../admin';
import RouterProvider from '../router-provider';

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

test('Render loading icon on fetch', () => {
  const component = renderer.create(
    buildSubject({
      session: {
        ...testStore.getState().session,
        isFetching: true,
      },
    })
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render loading icon if session is ready for auth', () => {
  const component = renderer.create(
    buildSubject({
      session: {
        ...testStore.getState().session,
        readyToAuthenticate: true,
      },
    })
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render signin form if deauthenticated', () => {
  const component = renderer.create(subject);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render link form & table if authenticated', () => {
  const component = renderer.create(
    buildSubject({
      session: {
        ...testStore.getState().session,
        isAuthenticated: true,
      },
    })
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Call fetchEntityData on componentWillReceiveProps', () => {
  const props = mount(subject)
    .find(Admin)
    .first()
    .props();
  const fetchEntityData = jest.fn();
  const component = shallow(
    <Admin {...props} fetchEntityData={fetchEntityData} />
  );

  component.setProps({
    session: {
      ...testStore.getState().session,
      isAuthenticated: true,
    },
  });

  expect(fetchEntityData).toHaveBeenCalled();
});

test('Call fetchEntityData on componentDidMount if already authenticated', () => {
  const props = mount(subject)
    .find(Admin)
    .first()
    .props();
  const fetchEntityData = jest.fn();

  const sessionProps = {
    ...testStore.getState().session,
    isAuthenticated: true,
  };

  shallow(
    <Admin
      {...props}
      session={sessionProps}
      fetchEntityData={fetchEntityData}
    />
  );

  expect(fetchEntityData).toHaveBeenCalled();
});
