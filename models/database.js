//Pris dans les notes de Jacques Berger

var mongodb = require("mongodb");
var configs = require('../config.js');

var dbInstance;

var getConnection = function(callback) {
  if (dbInstance) {
    return callback(null, dbInstance);
  } else {
    var server = new mongodb.Server(configs.dbServer, 27017, {auto_reconnect: true});
    var db = new mongodb.Db(configs.mainDb, server, {safe: true});

    if (!db.openCalled) {
      db.open(function(err, db) {
        if (err) {
          return callback(err);
        }
        dbInstance = db;
        return callback(err, dbInstance);
      });
    }
  }
};

module.exports.getConnection = getConnection;
