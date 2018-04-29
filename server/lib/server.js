
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const config = require('./config');
const LinkRoutes = require('./controllers/link');

const start = (db) => {
  const app = express();
  const router = express.Router();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ limit: '200kb' }));
  app.use(router);
  app.use(LinkRoutes(db));
  http.createServer(app).listen(config.server.port);

  return app;
};

module.exports = start;
