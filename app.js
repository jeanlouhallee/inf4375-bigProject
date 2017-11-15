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
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cron = require('node-cron');
var tasks = require('./tasks');
var index = require('./routes/index');
var doc = require('./routes/doc');
var installations = require('./routes/installations');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

///A MODIFIER POUR LA LSITE D'ARRONDISSEMENTS
var task = cron.schedule('0 0 * * *', function(){
    tasks.refreshDatabase(function(err){
        if(err){
            console.log("Something went terribly wrong...\n\n\n", err);
        }
    });
}, false);

tasks.startUpTasks(function(err){
    if(err){
        console.log(err);
    }
});

task.start();

app.use('/', index);
app.use('/doc', doc);
app.use('/installations', installations);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  if(err.status === 404){
      res.render('404');
  }else if (err.status === 403) {
      res.render('403');
  } else if (err.status === 400) {
      res.render('400');
  } else {
      res.render('500');
  }
});

module.exports = app;
