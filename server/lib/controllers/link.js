
const { Router } = require('express');
const basicAuth = require('express-basic-auth')
const { credentials } = require('../config');
const { Link, LinkSchema, LoadLinks, LoadByLinkURL } = require('../models/link');
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

  router.get('/link', basicAuth(credentials), (req, res) => {
    const linksCollection = db.getCollection('links');
    const links = LoadLinks(linksCollection).map(link => link.toJSON());

    res.send(links);
  });

  router.use(errorHandler);

  return router;
};

module.exports = LinkRoutes;
