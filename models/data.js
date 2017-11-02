var request = require('request');
var config = require('../config.js');
var fs = require('fs');
var xml2js = require('xml2js').parseString;

var listOfAquaticInstallations;
var listOfRinks;
var listOfWinterSlides;
var dict = [];


var GetDataFromMontrealCityAPI = function(db, callback){
    request.get(config.listOfAquaticInstallationsUrl, function(err, res, data){
        if(err){
            err.myMessage = "Web request failed.";
            return callback(err);
        }else{

            listOfAquaticInstallations = csvToJSON(data);
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

                            listOfRinks = result.patinoires.patinoire;
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

                                            listOfWinterSlides = result.glissades.glissade;
                                            sendAllDataToCollection(db, listOfAquaticInstallations, listOfRinks, listOfWinterSlides, function(err){
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

var sendAllDataToCollection = function(db, listOfAquaticInstallations, listOfRinks, listOfWinterSlides, callback){
    sendDataToCollection(db, config.aquaticInstallationsDb, listOfAquaticInstallations, function(err, result){
        if(err){
            return callback(err);
        }else{
            sendDataToCollection(db, config.rinksDb, listOfRinks, function(err, result){
                if(err){
                    return callback(err);
                }else{
                    sendDataToCollection(db, config.winterSlidesDb, listOfWinterSlides, function(err, result){
                        if(err){
                            return callback(err);
                        }
                        return callback(null);
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

//myString.substr(1).slice(0, -1)
//Fonction inspirée du site web http://techslides.com/convert-csv-to-json-in-javascript
var csvToJSON = function(csv){
  var lines = csv.split("\n");
  var result = [];
  var headers = lines[0].split(",");
  headers = headers.map(function(string){return string.toLowerCase()});
  for(var i = 1; i < lines.length; i++){
	  var obj = {};
	  var currentline = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
	  for(var j = 0; j < headers.length; j++){
          if(currentline[j] && currentline[j].charAt(0) === '\"'){
              currentline[j] = currentline[j].substr(1).slice(0, -1);
          }
		  obj[headers[j]] = currentline[j];
	  }
	  result.push(obj);
  }
  return result;
}

module.exports.GetDataFromMontrealCityAPI = GetDataFromMontrealCityAPI;
