/* eslint-disable */
const test = require('ava');
const request = require('supertest');
const fs = require('fs');
const path = require('path');
const Db = require("../lib/connectivity/db");
const config = require('../lib/config');
const server = require('../lib/server');
const dbFile = path.resolve(__dirname, `../resources/${config.db.file}`);


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


test('Throw 412 if invalid link data on create', async t => {
  const res = await t.context.app.post('/link').send({});

  t.is(res.status, 412);
  t.deepEqual(res.body, [
    { field: 'linkURL', message: 'should have required property \'linkURL\'' }
  ]);

  const res2 = await t.context.app.post('/link').send({ linkURL: 'invalidUri' });

  t.is(res2.status, 412);
  t.deepEqual(res2.body, [
    { field: 'linkURL', message: 'should match format "uri"' }
  ]);
});

test('Create link', async t => {
  const res = await t.context.app.post('/link').send({ linkURL: 'http://www.google.fr' });

  t.is(res.status, 200);
  t.is(res.body.id, "Og");
  t.is(res.body.linkURL, 'http://www.google.fr');
});

test('Avoid multiple insert for the same link', async t => {
  // first post
  const res = await t.context.app.post('/link').send({ linkURL: 'http://www.fasterize.com' });

  t.is(res.status, 200);
  t.is(res.body.id, "6Q");
  t.is(res.body.linkURL, 'http://www.fasterize.com');

  // second post
  const res2 = await t.context.app.post('/link')
  .send({ linkURL: 'http://www.fasterize.com' });

  t.is(res2.status, 200);
  t.is(res2.body.id, "6Q");
  t.is(res2.body.linkURL, 'http://www.fasterize.com');
});

test('Throw 401 if missing authentication', async t => {
  const res = await t.context.app
  .get('/link')

  t.is(res.status, 401);
});

test('Send all links', async t => {
  const res = await t.context.app.post('/link').send({ linkURL: 'http://www.yahoo.com' });
  const res2 = await t.context.app.post('/link').send({ linkURL: 'http://www.amazon.com' });

  const [login, password] = Object.entries(config.credentials.users).pop();

  const res3 = await t.context.app
  .get('/link')
  .auth(login, password)

  t.true(res3.body.some(({linkURL}) => linkURL === 'http://www.yahoo.com'));
  t.true(res3.body.some(({linkURL}) => linkURL === 'http://www.amazon.com'));
  t.is(res3.status, 200);
});


test.after(t => {
  fs.unlinkSync(dbFile);
});
