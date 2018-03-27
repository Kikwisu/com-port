const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const index = require('./routes/index')
      ,physic = require('./routes/physic')
      ,ping = require('./routes/ping')
      ,multy = require('./routes/multy')
      ,roboto = require('./routes/roboto')
      ,connection = require('./routes/connection');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

let allowCrossDomain = function(req, res, next) {
   res.header('Access-Control-Allow-Origin', "*");
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
   res.header('Access-Control-Allow-Headers', 'Content-Type');
   next();
};

app.use(allowCrossDomain);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/physic', physic);
app.use('/ping', ping);
app.use('/multy', multy);
app.use('/roboto', roboto);
app.use('/connection', connection);


module.exports = app;


