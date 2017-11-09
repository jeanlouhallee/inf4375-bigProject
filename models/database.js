
var mongodb = require("mongodb");
var config = require('../config.js');

var dbInstance;

//Pris dans les notes de Jacques Berger
var getConnection = function(callback){
  if (dbInstance) {
      return callback(null, dbInstance);
  }else{
      var server = new mongodb.Server(config.dbServer, 27017, {auto_reconnect: true});
      var db = new mongodb.Db(config.mainDb, server, {safe: true});
      if (!db.openCalled) {
          db.open(function(err, db) {
              if (err) {
                  err.myMessage = "Cannot open database.";
                  return callback(err);
              }
              dbInstance = db;
              return callback(err, dbInstance);
          });
      }
  }
};

module.exports.getConnection = getConnection;
