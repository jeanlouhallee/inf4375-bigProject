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

var config = require('./config');
var data = require('./models/data');
var db = require('./models/database');

var refreshDatabase = function(callback){
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
                    refreshDatabase(function(err){
                        if(err){
                            return callback(err);
                        }else{
                            console.log("Data updated!\n");
                            updateListOfArrondissements(function(err){
                                if(err){
                                    return callback(err);
                                }else{
                                    return callback(null);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}

var updateListOfArrondissements = function(callback){
    db.getConnection(function(err, db){
        db.collection(config.collection, function (err, collection) {
            if (err) {
                return callback(err);
            } else {
                db.collection(config.collection).find({}, {nom: 1}).toArray(function(err, arrondissements){
                    if (err) {
                        return callback(err);
                    } else {
                        data.setListOfArronfissement(arrondissements);
                        return callback(null);
                    }
                });
            }
        });
    });
}

// var updateListOfArrondissements = function(callback){
//     db.getConnection(function(err, db){
//         db.collection(config.collection, function (err, collection) {
//             if (err) {
//                 return callback(err);
//             } else {
//                 collection.distinct('nom', {"nom" : {$ne : null}}, function(err, arrondissements){
//                     if (err) {
//                         return callback(err);
//                     } else {
//                         data.setListOfArronfissement(arrondissements);
//                         return callback(null);
//                     }
//                 });
//             }
//         });
//     });
// }

module.exports.startUpTasks = startUpTasks;
module.exports.refreshDatabase = refreshDatabase;
