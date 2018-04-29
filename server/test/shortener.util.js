/* eslint-disable */
const test = require('ava');
const shortener = require('../lib/utils/shortener');

test('Encode', t => {
  const encodedId = shortener.encode(20);
  t.is(encodedId, "Rx");
});

test('Decode', t => {
  const decodedId = shortener.decode("Rx");
  t.is(decodedId, 20);
});
