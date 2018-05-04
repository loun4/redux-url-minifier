
const { Validator } = require('express-json-validator-middleware');

const validator = new Validator({ allErrors: true });

const validate = schema =>
  validator.validate({ body: schema });


module.exports = validate;
