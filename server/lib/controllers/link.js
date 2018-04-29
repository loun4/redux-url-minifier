
const { Router } = require('express');
const { LinkSchema, Link, LoadByLinkURL } = require('../models/link');
const { errorHandler } = require('../utils/error');
const validate = require('../utils/validator');


const LinkRoutes = (db) => {
  const router = Router();

  router.post('/link', validate(LinkSchema), (req, res, next) => {
    const linksCollection = db.getCollection('links');

    let link = LoadByLinkURL(linksCollection, req.body.linkURL);
    if (link !== null) {
      return res.send(link.toJSON());
    }

    link = new Link(req.body);
    return link.save(linksCollection)
      .then(link => res.send(link.toJSON()))
      .catch(next);
  });

  router.use(errorHandler);

  return router;
};

module.exports = LinkRoutes;
