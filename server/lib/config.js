
const fs = require('fs');

const files = {
  developement: 'conf.json',
  production: 'conf.json',
  test: 'test.json',
};

const env = process.env.NODE_ENV;
const file = `${__dirname}/../config/${files[env]}`;

if (!fs.existsSync(file)) {
  throw new Error(`conf file ${file} not found`);
}

const conf = JSON.parse(fs.readFileSync(file));
if (env === 'production') {
  conf.db.file = 'db.production.json';
}

module.exports = conf;
