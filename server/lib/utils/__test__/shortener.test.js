
const test = require('ava');
const shortener = require('../shortener');

test('Encode', (t) => {
  const encodedId = shortener.encode(20);
  t.is(encodedId, 'znc0');
});

test('Decode', (t) => {
  const decodedId = shortener.decode('znc0');
  t.is(decodedId, 20);
});
