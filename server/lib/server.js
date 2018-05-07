
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const LinkRoutes = require('./controllers/link');
const AuthenticationRoutes = require('./controllers/authentication');
const path = require('path');

const start = (db) => {
  const app = express();
  const router = express.Router();

  app.use(express.static(path.join(__dirname, '../../client/build')));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ limit: '200kb' }));
  app.use(cors());
  app.use(router);
  app.use(LinkRoutes(db));
  app.use(AuthenticationRoutes());

  app.get('*', (_, res) => res.sendFile(path.join(__dirname, '../../client/build/index.html')));

  http.createServer(app).listen(process.env.PORT);
  return app;
};

module.exports = start;
