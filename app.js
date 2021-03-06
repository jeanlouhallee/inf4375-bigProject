/*
 * Copyright 2017 Jean-Lou Hallée.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('heroku-logger');
var cron = require('node-cron');
var database = require('./models/database');
var data_import = require('./data_import');
var index = require('./routes/index');
var doc = require('./routes/doc');
var installations = require('./routes/installations');
var mauvaiseCondition = require('./routes/mauvaise_condition');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var task = cron.schedule('0 0 0 * * *', function(){
    data_import.task(function(err){
        if(err){
            logger.error("Couldn't execute task.", { error: err });
        }
    });
}, false);

task.start();

app.use('/', index);
app.use('/doc', doc);
app.use('/installations', installations);
app.use('/mauvaise_condition', mauvaiseCondition);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.status(err.status || 500);
  if(err.status === 404){
       res.status(404).json({error: 'Not found.'});
  } else if (err.status === 400) {
      res.status(400).json({error: 'Bad request.'});
  } else {
      logger.error('Internal server error 500', { error: err });
      res.status(500).json({error: "Internal server error; don't worry, it's not your fault."});
  }
});

module.exports = app;
