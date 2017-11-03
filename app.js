var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var doc = require('./routes/doc');
var installations = require('./routes/installations');
var mongo = require('mongodb');
var config = require('./config');
var data = require('./models/data');
var db = require('./models/database');
var cron = require('node-cron');

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

var updateDatabase = function(callback){
    db.getConnection(function(err, res){
        if(err){
            return callback(err);
        }else{
            data.GetDataFromMontrealCityAPI(res, function(err, res){
                if(err){
                    return callback(err);
                }
                return callback(null);
            });
        }
    });
}
var task = cron.schedule('0 0 * * *', function(){
    updateDatabase(function(err){
        if(err){
            console.log("Something went terribly wrong...\n\n\n", err);
        }
    });
}, false);

var startUpTasks = function(callback){
    db.getConnection(function(err, db){
        if(err){
            return callback(err);
        }else{
            db.dropDatabase(function(err, res){
                if(err){
                    err.myMessage = "Can't drop database.";
                    return callback(err);
                }else{
                    console.log("Database dropped!\n");
                    updateDatabase(function(err){
                        if(err){
                            return callback(err);
                        }else{
                            console.log("Data updated!\n");
                            return callback(null);
                        }
                    })
                }
            });
        }
    });
}

// startUpTasks(function(err){
//     if(err){
//         console.log(err);
//     }
// });

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
  res.render('error');
});

module.exports = app;
