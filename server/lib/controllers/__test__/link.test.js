
const test = require('ava');
const { start, stop } = require('../../setup-test');
const shortener = require('../../utils/shortener');


test.before(start);

test('Throw 412 if invalid link data on create', async (t) => {
  const res = await t.context.app.post('/link').send({});

  t.is(res.status, 412);
  t.deepEqual(res.body, [
    { field: 'linkURL', message: 'should have required property \'linkURL\'' },
  ]);

  const res2 = await t.context.app.post('/link').send({ linkURL: 'invalidUri' });

  t.is(res2.status, 412);
  t.deepEqual(res2.body, [
    { field: 'linkURL', message: 'should match format "url"' },
  ]);
});

test('Create link', async (t) => {
  const res = await t.context.app.post('/link').send({ linkURL: 'http://www.google.fr' });

  t.is(res.status, 200);
  t.is(res.body.linkURL, 'http://www.google.fr');
});

test('Avoid multiple insert for the same link', async (t) => {
  // first post
  const res = await t.context.app.post('/link').send({ linkURL: 'http://www.fasterize.com' });

  t.is(res.status, 200);
  t.is(res.body.linkURL, 'http://www.fasterize.com');

  // second post
  const res2 = await t.context.app.post('/link')
    .send({ linkURL: 'http://www.fasterize.com' });

  t.is(res2.status, 200);
  t.is(res2.body.linkURL, 'http://www.fasterize.com');

  t.is(res.body.id, res2.body.id);
});

test('Throw 401 if missing authentication on get', async (t) => {
  const res = await t.context.app
    .get('/link');

  t.is(res.status, 401);
});

test('Send all links', async (t) => {
  await t.context.app.post('/link').send({ linkURL: 'http://www.yahoo.com' });
  await t.context.app.post('/link').send({ linkURL: 'http://www.amazon.com' });
  const { login, password } = t.context.credentials;
  const res3 = await t.context.app
    .get('/link').auth(login, password);

  t.true(res3.body.some(({ linkURL }) => linkURL === 'http://www.yahoo.com'));
  t.true(res3.body.some(({ linkURL }) => linkURL === 'http://www.amazon.com'));
  t.is(res3.status, 200);
});

test('Throw 404 if wrong id param on delete', async (t) => {
  const { login, password } = t.context.credentials;
  const res = await t.context.app.delete('/link/invalid').auth(login, password);
  t.is(res.status, 404);
});

test('Throw 404 on delete if link not found', async (t) => {
  const { login, password } = t.context.credentials;
  const res = await t.context.app.delete('/link/0MX').auth(login, password);
  t.is(res.status, 404);
});

test('Delete link', async (t) => {
  const { login, password } = t.context.credentials;
  const res = await t.context.app.post('/link').send({ linkURL: 'http://www.github.com' });
  const res2 = await t.context.app.delete(`/link/${res.body.id}`).auth(login, password);

  t.deepEqual(res2.body, {});
  t.is(res2.status, 200);
});

test('Throw 404 if wrong id param on get', async (t) => {
  const res = await t.context.app.get('/link/wrong');
  t.is(res.status, 404);
});

test('Redirect 301 to link url', async (t) => {
  const res = await t.context.app.post('/link').send({ linkURL: 'http://www.github.com' });
  const res2 = await t.context.app.get(`/link/${res.body.id}`);

  t.is(res2.header.location, 'http://www.github.com');
  t.is(res2.status, res2.status);
});

test('Increment visit', async (t) => {
  const res = await t.context.app.post('/link').send({ linkURL: 'https://news.ycombinator.com/' });
  await t.context.app.get(`/link/${res.body.id}`);
  await t.context.app.get(`/link/${res.body.id}`);
  await t.context.app.get(`/link/${res.body.id}`);

  const doc = t.context.db.getCollection('links').get(shortener.decode(res.body.id));
  t.is(doc.visit, 3);
});


test.after(stop);
