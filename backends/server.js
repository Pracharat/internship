const CONFIG = require('./config'); // Load config (environment)
const express = require('express'); // Load express
const mongoose = require('mongoose'); // Load mongoose
const bodyParser = require('body-parser'); // Load bodyParser
const cors = require('cors'); // Load cors
const hbs = require('hbs');
const helmet = require('helmet');
const db = require('./db');
const routes = require('./routes');
const Prometheus = require('prom-client');
const {responseError, genResponseObj} = require('./errors');
const path = require("path");
//  Create the app
// ============================================================================================
const app = express(db);

app.set('view engine', 'hbs');

app.enable('trust proxy');

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 50000,
}));

app.use(bodyParser.json({
  limit: '50mb',
}));

// Helmet
app.use(helmet());

// Enable CORS on Express server instance
app.use(cors({
  credentials: true,
  origin: true,
  methods: 'GET,POST,PUT,PATCH,DELETE'
}),);

app.use((err, req, res, next) => {
  const connectionStatus = mongoose.connection.readyState;
  if (connectionStatus === 0) {
    mongoose.connect(CONFIG.DB, {
      autoReconnect: true,
      connectTimeoutMS: CONFIG.TIMEOUT.MONGOOSE,
    }, (err) => {
      if (err) {
        responseError(res, genResponseObj(req.get('x-language'), '50002', err, undefined, CONFIG.NODE));
      } else {
        next();
      }
    });
  } else {
    next();
  }
});

app.get('/metrics', (req, res) => {
  res.set('Content-Type', Prometheus.register.contentType);
  res.end(Prometheus.register.metrics());
});

// Configure app routes
app.use('/apigw/api/v1', routes.v1);
app.use("/images", express.static(path.join("backends/images")));

// not found
app.use((req, res) => {
  res.status(404).send();
});

// port
app.listen(CONFIG.PORT);



