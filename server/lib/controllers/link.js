
const { Router } = require('express');
const basicAuth = require('express-basic-auth');

const { credentials } = require('../config');
const { errorHandler, NotFoundError, NotAuthorizedError } = require('../utils/error');
const shortener = require('../utils/shortener');
const validate = require('../utils/validator');
const LinkPackage = require('../models/link');

const LinkRoutes = (db) => {
  const {
    Link,
    LinkSchema,
    LoadLinks,
    LoadByLinkURL,
    LoadById,
  } = LinkPackage(db);

  const router = Router();

  router.post('/link', validate(LinkSchema), (req, res, next) => (
    LoadByLinkURL(req.body.linkURL)
      .then((link) => {
        if (link !== null) {
          return link;
        }

        const newLink = new Link(req.body);
        return newLink.create();
      })
      .then(link => res.send(link.toJSON()))
      .catch(next)));

  router.get('/link', basicAuth(credentials), (req, res, next) =>
    LoadLinks()
      .then(links => links.map(link => link.toJSON()))
      .then(links => res.send(links))
      .catch(next));

  router.get('/link/:encodedId', (req, res, next) => {
    const id = shortener.decode(req.params.encodedId);
    if (!id) {
      return next({ name: NotAuthorizedError });
    }

    return LoadById(id)
      .then((link) => {
        if (link === null) {
          return Promise.reject(({ name: NotFoundError }));
        }

        return link.incrementVisit().update();
      })
      .then(link => res.redirect(301, link.toJSON().linkURL))
      .catch(next);
  });

  router.delete('/link/:encodedId', basicAuth(credentials), (req, res, next) => {
    const id = shortener.decode(req.params.encodedId);
    if (!id) {
      return next({ name: NotAuthorizedError });
    }

    return LoadById(id)
      .then((link) => {
        if (link === null) {
          return Promise.reject(({ name: NotFoundError }));
        }

        return link.remove();
      })
      .then(() => res.send({}))
      .catch(next);
  });

  router.use(errorHandler);

  return router;
};

module.exports = LinkRoutes;
