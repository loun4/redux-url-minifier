
const { Router } = require('express');
const basicAuth = require('express-basic-auth');

const { credentials } = require('../config');
const { errorHandler } = require('../middlewares/error');


const AuthenticationRoutes = () => {
  const router = Router();

  router.post('/authentication', basicAuth(credentials), (req, res) => {
    res.send({});
  });

  router.use(errorHandler);

  return router;
};

module.exports = AuthenticationRoutes;
