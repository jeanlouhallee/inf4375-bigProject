//Pris dans les notes de Jacques Berger

var mongodb = require("mongodb");
var configs = require('../config.js');

var dbInstance;

module.exports.getConnection = function(callback) {
  if (dbInstance) {
    callback(null, dbInstance);
  } else {
    var server = new mongodb.Server(configs.dbServer, 27017, {auto_reconnect: true});
    var db = new mongodb.Db(configs.mainDb, server, {safe: true});

    if (!db.openCalled) {
      db.open(function(err, db) {
        if (err) {
          callback(err);
        }
        dbInstance = db;
        callback(err, dbInstance);
      });
    }
  }
};
