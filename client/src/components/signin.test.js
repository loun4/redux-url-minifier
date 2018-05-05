
import React from 'react';
import { createStore, combineReducers } from 'redux';
import { createForms } from 'react-redux-form';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Signin from './signin';

let store;
let onSubmit;
let subject;

beforeEach(() => {
  const forms = createForms({
    signinForm: {
      login: '',
      password: '',
    },
  });

  store = createStore(combineReducers(forms));

  onSubmit = jest.fn();

  const props = {
    onSubmit,
    form: store.getState().forms.signinForm,
  };

  subject = (
    <Provider store={store}>
      <Signin {...props} />
    </Provider>
  );
});

test('Render form', () => {
  const component = renderer.create(subject);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Show errors if invalid login & password on submit', () => {
  const component = mount(subject);
  const form = component.find('form').first();

  form.simulate('submit');
  const loginError = component.find('#error-login').first().text();
  const passwordError = component.find('#error-password').first().text();

  expect(loginError).toEqual('login is required');
  expect(passwordError).toEqual('password is required');
});

test('Show errors when form is touched', () => {
  const component = mount(subject);

  const login = component.find('[type="text"]').first();
  const password = component.find('[type="password"]').first();

  login.simulate('blur');
  const loginError = component.find('#error-login').first().text();
  expect(loginError).toEqual('login is required');

  password.simulate('blur');
  const passwordError = component.find('#error-password').first().text();
  expect(passwordError).toEqual('password is required');
});

test('Call onubmit', () => {
  const component = mount(subject);
  const form = component.find('form').first();
  const login = component.find('[type="text"]').first();
  const password = component.find('[type="password"]').first();

  login.simulate('change', { target: { value: 'worngLogin' } });
  password.simulate('change', { target: { value: 'worngPassword' } });
  form.simulate('submit');
  expect(onSubmit).toHaveBeenCalled();
});
