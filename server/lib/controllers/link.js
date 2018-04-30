
const { Router } = require('express');
const basicAuth = require('express-basic-auth');

const { credentials } = require('../config');
const { errorHandler, NotFoundError } = require('../utils/error');
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

  router.post('/link', validate(LinkSchema), (req, res, next) => {
    let link = LoadByLinkURL(req.body.linkURL);
    if (link !== null) {
      return res.send(link.toJSON());
    }

    link = new Link(req.body);
    return link.create()
      .then(link => res.send(link.toJSON()))
      .catch(next);
  });

  router.get('/link', basicAuth(credentials), (req, res) => {
    const links = LoadLinks().map(link => link.toJSON());
    res.send(links);
  });

  router.delete('/link/:encodedId', basicAuth(credentials), (req, res, next) => {
    const id = shortener.decode(req.params.encodedId);
    if (!id) {
      return next({ name: NotFoundError });
    }

    const link = LoadById(id);
    if (!link) {
      return next({ name: NotFoundError });
    }

    return link.remove()
      .then(() => res.send({}))
      .catch(next);
  });

  router.use(errorHandler);

  return router;
};

module.exports = LinkRoutes;
