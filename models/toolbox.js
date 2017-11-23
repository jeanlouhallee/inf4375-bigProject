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

var renameProperty = function(data){
    data.forEach(function(d){
        d.arrondissement = d.arrondisse;
        delete d.arrondisse;
    });
    return data;
}

var adjustData = function(data, typeToAdd){
    data.forEach(function(d){
        d.cle = d.arrondissement.cle;
        d.date_maj = d.arrondissement.date_maj;
        d.arrondissement = d.arrondissement.nom_arr;
        d.type = typeToAdd;
    });
    return data;
}

module.exports.csvToJSON = csvToJSON;
module.exports.renameProperty = renameProperty;
module.exports.adjustData = adjustData;
