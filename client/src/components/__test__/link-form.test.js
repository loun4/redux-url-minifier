import React from 'react';
import { createStore, combineReducers } from 'redux';
import { createForms } from 'react-redux-form';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import LinkForm from '../link-form';

let store;
let onSubmit;
let subject;

beforeEach(() => {
  const forms = createForms({
    linkForm: {
      linkURL: '',
    },
  });

  store = createStore(combineReducers(forms));
  onSubmit = jest.fn();

  const props = {
    onSubmit,
    onReset: jest.fn(),
    form: store.getState().forms.linkForm,
  };

  subject = (
    <Provider store={store}>
      <LinkForm {...props} store={store} />
    </Provider>
  );
});

test('Render form', () => {
  const component = renderer.create(subject);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Render error if invalid link url', () => {
  const component = mount(subject);
  const form = component.find('form').first();
  const input = component.find('input').first();
  const error = component.find('.negative.message').first();

  input.simulate('change', { target: { value: 'worng url' } });
  form.simulate('submit');

  expect(error.html()).toBeTruthy();
  expect(error.text()).toEqual('Please enter a valid url');
});

test('Call onSubmit', () => {
  const component = mount(subject);

  const form = component.find('form').first();
  const input = component.find('input').first();
  const error = component.find('.negative.message').first();
  input.simulate('change', { target: { value: 'http://www.google.fr' } });
  form.simulate('submit');

  expect(error.html()).toBeNull();
  expect(onSubmit).toHaveBeenCalled();
});
