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

var express = require('express');
var mongodb = require('mongodb');
var database = require('../models/database');
var config = require('../config/config')[process.env.NODE_ENV || 'development'];
var data = require('../models/data');
var router = express.Router();

router.get('/', function(req, res, next) {
    let sorting;
    database.getConnection(function(err, db){
        if(err){
            res.sendStatus(500);
        }else{
            db.collection(config.collection).find(req.query).toArray(function(err, data){
                if(err){
                    res.sendStatus(500);
                }else{
                    res.json(data)
                }
            });
        }
    });
});

router.get('/mauvaise_condition', function(req, res, next) {
    let sorting;
    database.getConnection(function(err, db){
        if(err){
            res.sendStatus(500);
        }else{
            db.collection(config.collection).find({condition: "Mauvaise"}).sort({ nom: 1}).toArray(function(err, data){
                if(err){
                    res.sendStatus(500);
                }else{
                    res.json(data)
                }
            });
        }
    });
});

router.get('/:id', function(req, res, next) {
    let id;
    let invalidMongoId = false;
    database.getConnection(function(err, db){
        if(err){
            res.sendStatus(500);
        }else{
            try{
                id = new mongodb.ObjectId(req.params.id);
            }catch(err){
                invalidMongoId = true;
            }
            db.collection(config.collection).find({_id: id}).toArray(function(err, data){
                if(invalidMongoId){
                    res.sendStatus(404);
                }else if (err) {
                    res.sendStatus(500);
                }
                else{
                    res.json(data[0])
                }
            });
        }
    });
});
try{
                id = new mongodb.ObjectId(req.params.id);
            }catch(err){
                invalidMongoId = true;
            }
router.put('/:id', function(req, res) {
    let id;
    let invalidMongoId = false;
    var result = jsonschema.validate(req.body, schemas.updateCondition);
    if (result.errors.length > 0) {
        res.status(400).json(result);
    } else {
        database.getConnection(function(err, db){
            db.collection(config.collection, function (err, collection) {
                if (err) {
                    res.sendStatus(500);
                } else {
                    try{
                        id = new mongodb.ObjectId(req.params.id);
                    }catch(err){
                        invalidMongoId = true;
                    }
                    collection.update({_id: id}, {$set : {condition : req.body.condition} }, function(err, result) {
                        if (invalidMongoId || result.result.n === 0) {
                            res.sendStatus(404);
                        } else if (err) {
                            res.sendStatus(500);
                        } else {
                            res.sendStatus(200);
                        }
                    });
                }
            });
        });
    }
});

router.delete('/:id', function(req, res) {
    let id;
    let invalidMongoId = false;
    database.getConnection(function(err, db){
        db.collection(config.collection, function (err, collection) {
            if (err) {
                res.sendStatus(500);
            } else {
                try{
                    id = new mongodb.ObjectId(req.params.id)
                }catch(err){
                    invalidMongoId = true;
                }
                collection.remove({_id: id}, function(err, result) {
                    if (invalidMongoId || result.result.n === 0) {
                        res.sendStatus(404);
                    } else if (err) {
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(200);
                    }
                });
            }
        });
    });
});
//
// router.delete('/:id', function(req, res) {
//   database.getConnection(function(err, db){
//     db.collection(config.collection, function (err, collection) {
//       if (err) {
//         res.sendStatus(500);
//       } else {
//         collection.findOneAndDelete({_id: new mongodb.ObjectId(req.params.id)}, {projection: {"nom": 1}}, function(err, deletedDocument) {
//           if (err) {
//               console.log(err);
//             res.sendStatus(500);
//         } else if (!deletedDocument.value) {
//             res.sendStatus(404);
//           } else {
//             let test = data.getListOfInstallations();
//             data.removeInstallationFromList(deletedDocument.value);
//             res.sendStatus(200);
//           }
//         });
//       }
//     });
//   });
// });


module.exports = router;
