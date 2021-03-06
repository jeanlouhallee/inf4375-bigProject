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

var mongodb = require('mongodb');
var env = process.env.NODE_ENV || 'development';
var config = require('../config/config')[env];

var dbInstance;

var getConnection = function(callback){
    if(env === "development"){
        if (dbInstance) {
            return callback(null, dbInstance);
        }else{
            var server = new mongodb.Server(config.dbServer, config.dbServerPort, {auto_reconnect: false});
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
    }else{
        if (dbInstance) {
            return callback(null, dbInstance);
        }else{
            mongodb.connect(process.env.MONGOLAB_URI, {}, function(err, db){
                dbInstance = db;
                return callback(err, dbInstance);
            });
        }
    }
};

module.exports.getConnection = getConnection;
