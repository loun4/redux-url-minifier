
const Loki = require('lokijs');
const path = require('path');
const fs = require('fs');
const { db: dbConf } = require('../config');

const DbFileDoesNotExistError = 'db file does not exist';
const DbInsertError = 'db insert error';
const DbRemoveError = 'db remove error';
const DbUpdateError = 'db update error';

const initializer = (db) => {
  if (!db.getCollection('links')) {
    db.addCollection('links', { unique: ['id'] });
  }

  // eslint-disable-next-line
  db.DbInsertError = DbInsertError;
  db.DbRemoveError = DbRemoveError;
  db.DbUpdateError = DbUpdateError;

  return db;
};

// eslint-disable-next-line
const connector = () => new Promise((resolve, reject) => {
  const dbFile = path.resolve(__dirname, `../../resources/${dbConf.file}`);
  if (!fs.existsSync(dbFile)) {
    return reject(DbFileDoesNotExistError);
  }

  const db = new Loki(dbFile, {
    ...dbConf.options,
    autoloadCallback: () => resolve(initializer(db)),
  });
});

module.exports = {
  init: connector,
};
