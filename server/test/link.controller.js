/* eslint-disable */
const test = require('ava');
const request = require('supertest');
const fs = require('fs');
const path = require('path');
const Db = require("../lib/connectivity/db");
const config = require('../lib/config');
const server = require('../lib/server');
const shortener = require('../lib/utils/shortener');
const dbFile = path.resolve(__dirname, `../resources/${config.db.file}`);

const [login, password] = Object.entries(config.credentials.users).pop();

test.before(async t => {
  if (fs.existsSync(dbFile)) {
    fs.unlinkSync(dbFile);
  }
  fs.writeFileSync(dbFile, '');

  const db = await Db.init();

  t.context = {
    app: request(server(db)),
    db,
  }
});

test('Throw 412 on create if invalid link data', async t => {
  const res = await t.context.app.post('/link').send({});

  t.is(res.status, 412);
  t.deepEqual(res.body, [
    { field: 'linkURL', message: 'should have required property \'linkURL\'' }
  ]);

  const res2 = await t.context.app.post('/link').send({ linkURL: 'invalidUri' });

  t.is(res2.status, 412);
  t.deepEqual(res2.body, [
    { field: 'linkURL', message: 'should match format "url"' }
  ]);
});

test('Create link', async t => {
  const res = await t.context.app.post('/link').send({ linkURL: 'http://www.google.fr' });

  t.is(res.status, 200);
  t.is(res.body.linkURL, 'http://www.google.fr');
});

test('Avoid multiple insert for the same link', async t => {
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

test('Throw 401 if missing authentication', async t => {
  const res = await t.context.app
  .get('/link')

  t.is(res.status, 401);
});

test('Send all links', async t => {
  const res = await t.context.app.post('/link').send({ linkURL: 'http://www.yahoo.com' });
  const res2 = await t.context.app.post('/link').send({ linkURL: 'http://www.amazon.com' });

  const res3 = await t.context.app
  .get('/link')
  .auth(login, password)

  t.true(res3.body.some(({linkURL}) => linkURL === 'http://www.yahoo.com'));
  t.true(res3.body.some(({linkURL}) => linkURL === 'http://www.amazon.com'));
  t.is(res3.status, 200);
});

test('Throw 401 on delete if wrong id param', async t => {
  const res = await t.context.app.delete('/link/wrong').auth(login, password);
  t.is(res.status, 401);
});

test('Throw 404 on delete if link not found', async t => {
  const res = await t.context.app.delete('/link/0MX').auth(login, password);
  t.is(res.status, 404);
});

test('Delete link', async t => {
  const res = await t.context.app.post('/link').send({ linkURL: 'http://www.github.com' });
  const res2 = await t.context.app.delete(`/link/${res.body.id}`).auth(login, password);

  t.deepEqual(res2.body, {});
  t.is(res2.status, 200);
});

test('Throw 401 on get if wrong id param', async t => {
  const res = await t.context.app.get('/link/wrong');
  t.is(res.status, 401);
});

test('Redirect 301 to link url', async t => {
  const res = await t.context.app.post('/link').send({ linkURL: 'http://www.github.com' });
  const res2 = await t.context.app.get(`/link/${res.body.id}`);

  t.is(res2.header.location, 'http://www.github.com');
  t.is(res2.status, res2.status);
});

test('Increment visit', async t => {
  const res = await t.context.app.post('/link').send({ linkURL: 'https://news.ycombinator.com/' });

  const res2 = await t.context.app.get(`/link/${res.body.id}`);
  const res3 = await t.context.app.get(`/link/${res.body.id}`);
  const res4 = await t.context.app.get(`/link/${res.body.id}`);

  const doc = t.context.db.getCollection("links").get(shortener.decode(res.body.id));
  t.is(doc.visit, 3);
});


test.after(t => {
  fs.unlinkSync(dbFile);
});
