
import RouterService from './router-service';


test('Handle navigate', () => {
  const path = RouterService.navigate('/route1');
  expect(path).toBe('/route1');
  expect(window.location.href).toContain('/route1');
});

test('Handle navigate with query', () => {
  const path = RouterService.navigate('/route2', { sort: 'desc', filter_by: 'name' });
  expect(path).toBe('/route2?sort=desc&filter_by=name');
  expect(window.location.href).toContain('/route2?sort=desc&filter_by=name');
});

test('Handle replace', () => {
  const path = RouterService.replace('/route3');
  expect(path).toBe('/route3');
  expect(window.location.href).toContain('/route3');
});

test('Handle replace with query', () => {
  const path = RouterService.replace('/route4', { sort: 'desc', filter_by: 'name' });
  expect(path).toBe('/route4?sort=desc&filter_by=name');
});

test('Return full path', () => {
  const fullPath = RouterService.getFullPath('/route1', { sort: 'desc', filter_by: 'name' });
  expect(fullPath).toBe('/route1?sort=desc&filter_by=name');
});

test('Return updated state', () => {
  RouterService.navigate('/route1', { active: true });
  const expectedState = {
    location: '/route1',
    query: { active: 'true' },
    currentPath: '/route1?active=true',
  };

  expect(RouterService.state).toEqual(expectedState);

  RouterService.replace('/route1', { active: false });
  expectedState.currentPath = '/route1?active=false';
  expectedState.query.active = 'false';

  expect(RouterService.state).toEqual(expectedState);
});
