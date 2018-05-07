
const test = require('ava');
const fs = require('fs');
const path = require('path');
const Db = require('../db');
const config = require('../../config');

const dbFile = path.resolve(__dirname, `../../../resources/${config.db.file}`);

const deleteDbFile = () => {
  if (fs.existsSync(dbFile)) {
    fs.unlinkSync(dbFile);
  }
};

test.before(deleteDbFile);

test('Throw error if missing db file', (t) => {
  return Db.init().catch(e => t.is(e, 'db file does not exist'));
});

test('Init new db with empty links collection', (t) => {
  fs.writeFileSync(dbFile, '');
  return Db.init().then(db => t.is(db.getCollection('links').find().length, 0));
});

test.after(deleteDbFile);
