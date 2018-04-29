/* eslint-disable no-console */

const Db = require('./lib/connectivity/db');
const server = require('./lib/server');

Db.init().then((db) => {
  console.log('NOTICE', 'server ready');
  return server(db);
}).catch((e) => {
  console.log('ERROR', e);
  process.exit();
});
