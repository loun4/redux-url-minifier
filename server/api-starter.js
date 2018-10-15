const Db = require('./lib/connectivity/db');
const server = require('./lib/server');

Db.init().then((db) => {
  // eslint-disable-next-line
  console.log('NOTICE', 'Listening on port', process.env.PORT);
  return server(db);
}).catch((e) => {
  // eslint-disable-next-line
  console.log('ERROR', e);
  process.exit();
});
