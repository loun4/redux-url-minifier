
import React from 'react';
import renderer from 'react-test-renderer';
import RouterService from '../../utils/router-service';
import Routes from '../routes';

const buildSubject = () =>
  <Routes {...RouterService.state} />;

test('Render app', () => {
  const component = renderer.create(buildSubject());
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('/ render main component', () => {
  RouterService.navigate('/');
  const component = renderer.create(buildSubject());
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('/admin render main component', () => {
  RouterService.navigate('/admin');
  const component = renderer.create(buildSubject());
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
