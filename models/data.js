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

var request = require('request');
var config = require('../config.js');
var toolbox = require('./toolbox');
var fs = require('fs');
var xml2js = require('xml2js').parseString;

var listOfAquaticInstallations;
var listOfRinks;
var listOfWinterSlides;
var listOfArrondissements;


var GetDataFromMontrealCityAPI = function(db, callback){
    var allData = [];
    request.get(config.listOfAquaticInstallationsUrl, function(err, res, data){
        if(err){
            err.myMessage = "Web request failed.";
            return callback(err);
        }else{

            listOfAquaticInstallations = toolbox.renameProperty(toolbox.csvToJSON(data));
            allData.push(listOfAquaticInstallations);
            request.get(config.listOfRinksUrl, function(err, res, data){
                if(err){
                    err.myMessage = "Web request failed.";
                    return callback(err);
                }else{

                    xml2js(data, {explicitArray:false, ignoreAttrs:true}, function(err, result){
                        if(err){
                            err.myMessage = "Can't parse xml.";
                            return callback(err);
                        }else{

                            listOfRinks = toolbox.flattenSlidesAndRinks(result.patinoires.patinoire);
                            allData.push(listOfRinks);
                            request.get(config.listOfWinterSlidesUrl, function(err, res, data){
                                if(err){
                                    err.myMessage = "Web request failed.";
                                    return callback(err);
                                }else{

                                    xml2js(data, {explicitArray:false, ignoreAttrs:true}, function(err, result){
                                        if(err){
                                            err.myMessage = "Can't parse xml.";
                                            return callback(err);
                                        }else{

                                            listOfWinterSlides = toolbox.flattenSlidesAndRinks(result.glissades.glissade);
                                            allData.push(listOfWinterSlides);
                                            dataToSave = [].concat.apply([], allData);
                                            sendDataToCollection(db, config.collection, dataToSave, function(err){
                                                if(err){
                                                    err.myMessage = "Can't send data to collection.";
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
            });
        }
    });
}

var sendDataToCollection = function(db, collection, data, callback){
    db.collection(collection, function (err, collection) {
        if (err) {
            console.log("Erreur avec la base de données...");
            return callback(err);
        } else {
            collection.insert(data, function (err, result) {
                if (err) {
                    console.log("Erreur lors de l'insertion...");
                    return callback(err);
                }else{
                    return callback(null, result);
                }
            });
        }
    });
}

module.exports.GetDataFromMontrealCityAPI = GetDataFromMontrealCityAPI;
