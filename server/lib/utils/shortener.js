
const Hashids = require('hashids');
const { shortenerSecretKey } = require('../config');

const hashids = new Hashids(shortenerSecretKey);

const shortener = {
  encode: (id) => {
    if (!id) {
      return null;
    }

    return hashids.encode(id, id);
  },

  decode: (shortURL) => {
    if (!shortURL) {
      return null;
    }

    return hashids.decode(shortURL).pop();
  },
};

module.exports = shortener;
