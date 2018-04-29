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
  t.context = request(server(db))
});

test('Throw 412 if invalid link data on create', async t => {
  let res = await t.context
  .post('/link')
  .send();

  t.is(res.status, 412);
  t.deepEqual(res.body, [
    { field: 'linkURL', message: 'should have required property \'linkURL\'' }
  ]);

  res = await t.context
  .post('/link')
  .send({ linkURL: 'invalidUri' });

  t.is(res.status, 412);
  t.deepEqual(res.body, [
    { field: 'linkURL', message: 'should match format "uri"' }
  ]);
});

test('Create link', async t => {
  let res = await t.context
  .post('/link')
  .send({ linkURL: 'http://www.google.fr' });

  t.is(res.status, 200);
  t.is(res.body.id, 1);
  t.is(res.body.linkURL, 'http://www.google.fr');
});

test('Avoid multiple insert for the same link', async t => {
  // first post
  let res = await t.context
  .post('/link')
  .send({ linkURL: 'http://www.fasterize.com' });

  t.is(res.status, 200);
  t.is(res.body.id, 2);
  t.is(res.body.linkURL, 'http://www.fasterize.com');

  // second post
  res = await t.context
  .post('/link')
  .send({ linkURL: 'http://www.fasterize.com' });

  t.is(res.status, 200);
  t.is(res.body.id, 2);
  t.is(res.body.linkURL, 'http://www.fasterize.com');
});

test('Create short url', async t => {
  let res = await t.context
  .post('/link')
  .send({ linkURL: 'https://www.amazon.com/gp/goldbox/' });

  t.is(res.status, 200);
  t.is(res.body.shortURL, 'bN');
});

test.after(t => {
  fs.unlinkSync(dbFile);
});







