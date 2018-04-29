
const { InternalError } = require('../utils/error');
const shortener = require('../utils/shortener');

const DbInsertError = 'db insert error';

const LinkSchema = {
  type: 'object',
  required: ['linkURL'],
  properties: {
    id: {
      type: ['string', 'null'],
      default: null,
    },
    linkURL: {
      type: 'string',
      format: 'uri',
      default: '',
    },
  },
};

const { properties: definitions } = LinkSchema;

class Link {
  constructor(raw) {
    const {
      $loki = definitions.id.default, // raw lokiJS ID
      meta = { created: null }, // raw lokiJS meta, include create date
      linkURL = definitions.linkURL.default,
    } = raw;

    this.properties = {
      id: shortener.encode($loki),
      linkURL,
    };

    this.meta = meta;
  }

  save(collection) {
    return new Promise((resolve, reject) => {
      const doc = collection.insert(this.properties);
      if (doc !== null) {
        return resolve(new Link(doc));
      }

      return reject({ name: InternalError, errors: DbInsertError });
    });
  }

  toJSON() {
    return {
      ...this.properties,
      meta: { ...this.meta },
    };
  }
}

const LoadByLinkURL = (collection, linkURL) => {
  const doc = collection.findOne({ linkURL });
  return doc === null ? null : new Link(doc);
};

module.exports = {
  LinkSchema,
  Link,
  LoadByLinkURL,
};
