
const { InternalError } = require('../middlewares/error');
const shortener = require('../utils/shortener');


const linkPackage = (db) => {
  const collection = db.getCollection('links');

  const linkSchema = {
    type: 'object',
    required: ['linkURL'],
    properties: {
      id: {
        type: ['string', 'null'],
        default: null,
      },
      linkURL: {
        type: 'string',
        format: 'url',
        default: '',
      },
      visit: {
        type: 'integer',
        default: 0,
      },
    },
  };

  const { properties: definitions } = linkSchema;

  class Link {
    constructor(raw) {
      const {
        $loki = definitions.id.default, // raw lokiJS ID
        meta = { created: null }, // raw lokiJS meta, include create date
        linkURL = definitions.linkURL.default,
        visit = definitions.visit.default,
      } = raw;

      this.properties = {
        id: shortener.encode($loki),
        visit,
        linkURL,
      };

      this.rawId = $loki;
      this.meta = meta;
    }

    incrementVisit() {
      this.properties.visit += 1;
      return this;
    }

    create() {
      return new Promise((resolve, reject) => {
        const { $loki, visit, ...dbDoc } = this.toDbDocument();
        const doc = collection.insert(dbDoc);
        if (!doc) {
          return reject({ name: InternalError, errors: db.DbInsertError });
        }

        return resolve(new Link(doc));
      });
    }

    update() {
      return new Promise((resolve, reject) => {
        const doc = collection.update(this.toDbDocument());
        if (!doc) {
          return reject({ name: InternalError, errors: db.DbUpdateError });
        }

        return resolve(new Link(doc));
      });
    }

    remove() {
      return new Promise((resolve, reject) => {
        const doc = collection.remove(this.toDbDocument());
        if (!doc) {
          return reject({ name: InternalError, errors: db.DbRemoveError });
        }

        return resolve({});
      });
    }

    toDbDocument() {
      const { id, ...dbProps } = this.properties;

      return {
        ...this.rawId && { $loki: this.rawId },
        ...dbProps,
        meta: this.meta,
      };
    }

    toJSON() {
      return {
        ...this.properties,
        meta: { ...this.meta },
      };
    }
  }

  const loadById = id => (
    new Promise((resolve) => {
      const doc = collection.get(id);
      if (doc === null) {
        return resolve(null);
      }

      return resolve(new Link(doc));
    })
  );

  const loadByLinkURL = linkURL => (
    new Promise((resolve) => {
      const doc = collection.findOne({ linkURL });
      if (doc === null) {
        return resolve(null);
      }

      return resolve(new Link(doc));
    })
  );

  const loadLinks = () => (
    new Promise(resolve =>
      resolve(collection.find().map(doc => new Link(doc))))
  );

  return {
    linkSchema,
    Link,
    loadByLinkURL,
    loadLinks,
    loadById,
  };
};


module.exports = linkPackage;
