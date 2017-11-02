/////Pris dans les notes de Jacques Berger

var mongodb = require("mongodb");
var config = require('../config.js');

var dbInstance;

var getConnection = function(callback) {
  if (dbInstance) {
    return callback(null, dbInstance);
  } else {
    var server = new mongodb.Server(config.dbServer, 27017, {auto_reconnect: true});
    var db = new mongodb.Db(config.mainDb, server, {safe: true});

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

var getDataFromOneCollection = function(db, collection, callback){
    let query = {};
    db.collection(collection).find(query).toArray(function(err, result){
        if(err){
            console.log("Cannot fetch data from database...\n");
            return callback(err);
        }else{
            return callback(null, result);
        }
    });
}

module.exports.getConnection = getConnection;
module.exports.getDataFromOneCollection = getDataFromOneCollection;
