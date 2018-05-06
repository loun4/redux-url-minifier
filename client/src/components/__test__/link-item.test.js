
import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import LinkItem from '../link-item';

let subject;

beforeEach(() => {
  subject = <LinkItem url="/link/Og" />;
});

test('Render link item', () => {
  const component = renderer.create(subject);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Handle shortURL', () => {
  const component = shallow(subject);
  expect(component.find('a').props().href).toEqual('/link/Og');
});

test('Handle copy', () => {
  const component = shallow(subject);

  jest.useFakeTimers();
  component.find('button').simulate('click');
  expect(component.find('button').text()).toEqual('Copied');
  expect(component.state().isCopied).toEqual(true);

  setTimeout(() => {
    component.update();
    expect(component.find('button').text()).toEqual('Copy');
    expect(component.state().isCopied).toEqual(false);
  }, 1000);
  jest.runAllTimers();
});

