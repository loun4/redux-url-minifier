/* eslint-disable no-console */

const Db = require('./lib/connectivity/db');
const server = require('./lib/server');

Db.init().then((db) => {
  server(db);
  console.log('NOTICE', 'server ready');
}).catch((e) => {
  console.log('ERROR', e);
  process.exit();
});
