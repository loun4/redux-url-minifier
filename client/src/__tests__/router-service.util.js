
import RouterService from '../utils/router-service';


test('Handle navigate', () => {
  const path = RouterService.navigate('/route1');
  expect(path).toBe('/route1');
  expect(window.location.href).toBe('http://localhost/route1');
});

test('Handle navigate with query', () => {
  const path = RouterService.navigate('/route2', { sort: 'desc', filter_by: 'name' });
  expect(path).toBe('/route2?sort=desc&filter_by=name');
  expect(window.location.href).toBe('http://localhost/route2?sort=desc&filter_by=name');
});

test('Handle replace', () => {
  const path = RouterService.replace('/route3');
  expect(path).toBe('/route3');
  expect(window.location.href).toBe('http://localhost/route3');
});

test('Handle replace with query', () => {
  const path = RouterService.replace('/route4', { sort: 'desc', filter_by: 'name' });
  expect(path).toBe('/route4?sort=desc&filter_by=name');
});
