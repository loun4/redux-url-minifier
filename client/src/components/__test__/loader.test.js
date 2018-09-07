import React from 'react';
import renderer from 'react-test-renderer';
import Loader from '../loader';

test('Render loader', () => {
  const component = renderer.create(<Loader />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
