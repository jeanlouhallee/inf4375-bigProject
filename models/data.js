var request = require('request');
var configs = require('../config.js');
var fs = require('fs');
var mongo = require('mongodb');
var xmlParser = require('xml2js').parseString;
var csv = require('csv');

var listOfAquaticInstallations;
var listOfRinks;
var listOfWinterSlides;
var dict = [];

var sendDataToCollection = function(db, collection, data, callback){
    db.collection(collection, function (err, collection) {
        if (err) {
            console.log("Erreur avec la base de données.", err);
            return callback(err);
        } else {
            collection.insert(data, function (err, result) {
                if (err) {
                    console.log("Erreur lors de l'insertion.", err);
                    return callback(err);
                }else{
                    return callback(null, result);
                }
            });
        }
    });
}

var GetData = function(db, callback){
    request.get(configs.listOfAquaticInstallationsUrl, function(err, res, data){
        if(err){
            console.log("Problem with the request...\n", err);
            return callback(err);
        }else{

            console.log("Success to read data.\n");
            csv.parse(data, function(err, result){
                if(err){
                    console.log("Can't parse csv...\n");
                    return callback(err);
                }else{

                    console.log("csv parsed!\n");
                    listOfAquaticInstallations = result;
                    request.get(configs.listOfRinksUrl, function(err, res, data){
                        if(err){
                            console.log("Problem with the request...\n", err);
                            return callback(err);
                        }else{

                            console.log("Success to read data.\n");
                            xmlParser(data, function(err, result){
                                if(err){
                                    console.log("Can't parse xml...\n");
                                    return callback(err);
                                }else{

                                    console.log("xml parsed!\n");
                                    listOfRinks = result.patinoires.patinoire;
                                    request.get(configs.listOfWinterSlidesUrl, function(err, res, data){
                                        if(err){
                                            console.log("Problem with the request...\n", err);
                                            return callback(err);
                                        }else{

                                            console.log("Success to read data.\n");
                                            xmlParser(data, function(err, result){
                                                if(err){
                                                    console.log("Can't parse xml...\n")
                                                    return callback(err);
                                                }else{

                                                    console.log("xml parsed!\n");
                                                    listOfWinterSlide = data;
                                                    sendDataToCollection(db, configs.aquaticInstallationsDb, listOfAquaticInstallations, function(err, result){
                                                        if(err){
                                                            console.log("Error inserting data...\n");
                                                            return callback(err);
                                                        }else{

                                                            sendDataToCollection(db, configs.rinksDb, listOfRinks, function(err, result){
                                                                if(err){
                                                                    console.log("Error inserting data...\n")
                                                                    return callback(err);
                                                                }else{

                                                                    sendDataToCollection(db, configs.winterSlidesDb, listOfWinterSlide, function(err, result){
                                                                        if(err){
                                                                            console.log("Error inserting data...\n")
                                                                            return callback(err);
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
                    });
                }
            });
        }
    });
}


var sendDataToCollection = function(db, collection, data, callback){
    db.collection(collection, function (err, collection) {
        if (err) {
            console.log("Erreur avec la base de données.", err);
            return callback(err);
        } else {
            collection.insert(data, function (err, result) {
                if (err) {
                    console.log("Erreur lors de l'insertion.", err);
                    return callback(err);
                }else{
                    return callback(null, result);
                }
            });
        }
    });
}

var sendToDatabase = function(data){
    var server = new mongo.Server("localhost", 27017);
    var db = new mongo.Db("atelier", server, {safe:true});
    db.open(function (err, db) {
        if (err) {
            console.log("Impossible d'ouvrir une connexion sur la base de données.", err);
        } else {
            db.collection("laboNode", function (err, collection) {
                if (err) {
                    console.log("Erreur avec la base de données.", err);
                    db.close();
                } else {
                    collection.insert(list, function (err, result) {
                        if (err) {
                            console.log("Erreur lors de l'insertion.", err);
                        }
                        db.close();
                    });
                }
            });
        }
    });
}

module.exports.GetData = GetData;
