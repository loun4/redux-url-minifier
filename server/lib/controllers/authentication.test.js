/* eslint-disable */
const test = require('ava');
const request = require('supertest');
const fs = require('fs');
const path = require('path');
const Db = require("../connectivity/db");
const server = require('../server');
const config = require('../config');

const dbFile = path.resolve(__dirname, `../../resources/${config.db.file}`);

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

test('Throw 401 if wrong credentials', async t => {
  const res = await t.context.app.get('/authentication');
  t.is(res.status, 401);
});

test('authenticate', async t => {
  const res = await t.context.app.get('/authentication').auth(login, password);
  t.is(res.status, 200);
});

test.after(t => {
  if (fs.existsSync(dbFile)) {
    fs.unlinkSync(dbFile);
  }}
);
