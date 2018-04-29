
const Loki = require('lokijs');
const path = require('path');
const fs = require('fs');
const { db: dbConf } = require('../config');

const DbFileDoesNotExistError = 'db file does not exist';

const initializer = (db) => {
  if (!db.getCollection('links')) {
    db.addCollection('links', { unique: ['id'] });
  }

  return db;
};

/* eslint-disable consistent-return */
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
