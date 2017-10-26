var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var mongo = require('mongodb');
var configs = require('./config');
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

var task = cron.schedule('* * * * *', function(){
    db.getConnection(function(err, res){
        if(err){
            console.log("Can't reach database...")
        }else{
            data.GetDataFromMontrealCityAPI(res, function(err, res){
                if(err){
                    console.log("Can't get data from the city of Montreal website...");
                }
            });
        }
    });
}, false);

task.start();

// var dbServer = new mongo.Server(configs.dbServer, 27017);
// var db = new mongo.Db(configs.mainDb, dbServer, {safe:true});
// db.open(function(err, db){
//     if(err){
//         console.log("Can't open database...");
//     }else{
//         test.GetDataFromMontrealCityAPI(db, function(err, result){
//             if(err){
//                 console.log("Shuting down server...");
//             }else{
//                 console.log("No problema senor!");
//                 console.log(result);
//             }
//             db.close();
//         });
//     }
// });

app.use('/', index);
app.use('/users', users);

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
