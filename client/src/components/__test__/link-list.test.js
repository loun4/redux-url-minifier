import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import LinkList from '../link-list';

const links = [
  {
    id: 'anId',
    linkURL: 'http://www.google.fr',
    shortURL: '/link/anId',
    meta: {
      created: null,
    },
  },
  {
    id: 'anId2',
    linkURL: 'http://www.github.com',
    shortURL: '/link/anId2',
    meta: {
      created: null,
    },
  },
];

let subject;

beforeEach(() => {
  const props = {
    link: {
      isFetching: false,
      isSaving: false,
      models: links,
    },
    onRemove: jest.fn(),
  };

  subject = <LinkList {...props} />;
});

test('Render list of links', () => {
  const component = renderer.create(subject);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Update table with received new links', () => {
  const component = mount(subject);
  expect(component.find('.rt-tr-group').length).toEqual(2);

  const link = {
    isFetching: false,
    isSaving: false,
    models: links.concat(links),
  };

  component.setProps({ link });
  expect(component.find('.rt-tr-group').length).toEqual(4);
});
