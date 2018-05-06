
import React from 'react';
import { mount } from 'enzyme';
import RouterService from '../utils/router-service';
import LinkRoute from './link-route';

let subject;

beforeEach(() => {
  subject = (
    <LinkRoute to="/myRoute" query={{ active: true, sort: 'desc' }}>
      Link
    </LinkRoute>
  );
});

test('Create link', () => {
  const component = mount(subject, { context: { router: RouterService } });
  expect(component.find('a').props().href).toBe('/myRoute?active=true&sort=desc');
});

test('Go to route on click', () => {
  const component = mount(subject, { context: { router: RouterService } });
  component.find('a').simulate('click');
  expect(window.location.href).toContain('/myRoute?active=true&sort=desc');
});

test('Handle active class if route match', () => {
  RouterService.navigate('/myRoute', { active: true, sort: 'desc' });
  const component = mount(subject, { context: { router: RouterService } });

  expect(component.find('a').props().className).toBe('active');
});

