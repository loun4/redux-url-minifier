/* eslint-disable no-console */

const Db = require('./lib/connectivity/db');
const server = require('./lib/server');

Db.init().then((db) => {
  console.log('NOTICE', 'Listening on port', process.env.PORT);
  return server(db);
}).catch((e) => {
  console.log('ERROR', e);
  process.exit();
});
