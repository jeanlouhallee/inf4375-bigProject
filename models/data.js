var request = require('request');
var configs = require('../config.js');
var fs = require('fs');
var mongo = require('mongodb');
var xmlParser = require('xml2js').parseString;

var listOfAquaticInstallations;
var listOfRinks;
var listOfWinterSlides;
var dict = [];


var GetData = function(db, callback){
    request.get(configs.listOfAquaticInstallationsUrl, function(err, res, data){
        if(err){
            console.log("Problem with the request...\n", err);
            return callback(err);
        }else{

            console.log("Success to read data.\n");
            //listOfAquaticInstallations = result;
            listOfAquaticInstallations = csvJSON(data);
            console.log("csv parsed!\n");
            //console.log(listOfAquaticInstallations);
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
                                            listOfWinterSlide = result;
                                            sendDataToCollection(db, configs.aquaticInstallationsDb, listOfAquaticInstallations, function(err, result){
                                                if(err){
                                                    console.log("Error inserting data1...\n");
                                                    //console.log(listOfAquaticInstallations)
                                                    return callback(err);
                                                }else{

                                                    sendDataToCollection(db, configs.rinksDb, listOfRinks, function(err, result){
                                                        if(err){
                                                            console.log("Error inserting data2...\n")
                                                            //console.log(listOfRinks)
                                                            return callback(err);
                                                        }else{

                                                            sendDataToCollection(db, configs.winterSlidesDb, listOfWinterSlide, function(err, result){
                                                                if(err){
                                                                    console.log("Error inserting data3...\n")
                                                                    //console.log(listOfWinterSlides)
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

//Fonction prise sur un site web: http://techslides.com/convert-csv-to-json-in-javascript
function csvJSON(csv){
  var lines=csv.split("\n");
  var result = [];
  var headers=lines[0].split(",");
  for(var i=1;i<lines.length;i++){
	  var obj = {};
	  var currentline=lines[i].split(",");

	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }
	  result.push(obj);
  }
  return result;
}

//Fonction non-utilisée
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
