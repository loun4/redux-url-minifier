
const test = require('ava');
const { start, stop } = require('../../setup-test');


test.before(start);

test('Throw 401 if wrong credentials', async (t) => {
  const res = await t.context.app.post('/authentication');
  t.is(res.status, 401);
});

test('authenticate', async (t) => {
  const { login, password } = t.context.credentials;
  const res = await t.context.app.post('/authentication').auth(login, password);
  t.is(res.status, 200);
});

test.after(stop);
