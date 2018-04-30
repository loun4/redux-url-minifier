
const { InternalError } = require('../utils/error');
const shortener = require('../utils/shortener');

const DbInsertError = 'db insert error';
const DbRemoveError = 'db insert error';

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

    this.rawId = $loki;
    this.meta = meta;
  }

  create(collection) {
    return new Promise((resolve, reject) => {
      const doc = collection.insert(this.toDbDocument());
      if (!doc) {
        return reject({ name: InternalError, errors: DbInsertError });
      }

      return resolve(new Link(doc));
    });
  }

  remove(collection) {
    return new Promise((resolve, reject) => {
      const doc = collection.remove(this.toDbDocument());
      if (!doc) {
        return reject({ name: InternalError, errors: DbRemoveError });
      }

      return resolve({});
    });
  }

  toDbDocument() {
    const { linkURL } = this.properties;

    return {
      ...this.rawId && { $loki: this.rawId },
      linkURL,
    };
  }

  toJSON() {
    return {
      ...this.properties,
      meta: { ...this.meta },
    };
  }
}

const LoadById = (collection, id) => {
  const doc = collection.findOne({ $loki: id });
  return doc === null ? null : new Link(doc);
};

const LoadByLinkURL = (collection, linkURL) => {
  const doc = collection.findOne({ linkURL });
  return doc === null ? null : new Link(doc);
};

const LoadLinks = collection =>
  collection.find().map(doc => new Link(doc));


module.exports = {
  LinkSchema,
  Link,
  LoadByLinkURL,
  LoadLinks,
  LoadById,
};
