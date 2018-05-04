
import { isValidURL, isNotEmptyString } from './validator';

test('Validate URL', () => {
  expect(isValidURL('http://www.google.fr')).toBeTruthy();
  expect(isValidURL('https://www.google.fr')).toBeTruthy();
  expect(isValidURL('www.google.fr')).toBeTruthy();
  expect(isValidURL('google.fr')).toBeTruthy();

  expect(isValidURL('')).toBeFalsy();
  expect(isValidURL('google')).toBeFalsy();
  expect(isValidURL('google.f')).toBeFalsy();
  expect(isValidURL('htp://google.f')).toBeFalsy();
});

test('Validate not empty string', () => {
  expect(isNotEmptyString('')).toBeFalsy();
  expect(isNotEmptyString(1)).toBeFalsy();
  expect(isNotEmptyString({})).toBeFalsy();

  expect(isNotEmptyString('bar')).toBeTruthy();
});
