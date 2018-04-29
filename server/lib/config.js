
const fs = require('fs');

const files = {
  developement: 'local.json',
  production: 'production.json',
  test: 'test.json',
};

const env = process.env.NODE_ENV;
const file = `${__dirname}/../config/${files[env]}`;

if (!fs.existsSync(file)) {
  throw new Error(`conf file ${file} not found`);
}

module.exports = JSON.parse(fs.readFileSync(file));
