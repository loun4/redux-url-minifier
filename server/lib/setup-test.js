// eslint-disable-next-line
const request = require('supertest');
const fs = require('fs');
const path = require('path');
const Db = require('./connectivity/db');
const server = require('./server');
const config = require('./config');

const dbFile = path.resolve(__dirname, `../resources/${config.db.file}`);
const [login, password] = Object.entries(config.credentials.users).pop();

const start = async (t) => {
  if (fs.existsSync(dbFile)) {
    fs.unlinkSync(dbFile);
  }
  fs.writeFileSync(dbFile, '');

  const db = await Db.init();

  // eslint-disable-next-line
  t.context = {
    credentials: { login, password },
    app: request(server(db)),
    db,
  };
};

const stop = () => {
  if (fs.existsSync(dbFile)) {
    fs.unlinkSync(dbFile);
  }
};

module.exports = { start, stop };
