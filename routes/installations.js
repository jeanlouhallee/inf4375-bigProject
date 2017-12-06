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
var jsonschema = require('jsonschema');
var schemas = require('./schemas/schemas');
var database = require('../models/database');
var logger = require('heroku-logger');
var config = require('../config/config')[process.env.NODE_ENV || 'development'];
var data = require('../models/data');
var router = express.Router();

router.get('/', function(req, res, next) {
    database.getConnection(function(err, db){
        if(err){
          console.log(err);
            logger.error('Error 500', { error: err });
            res.status(500).json({error: "Internal server error; don't worry, it's not your fault."});
        }else{
            db.collection(config.collection).find(req.query).toArray(function(err, data){
                if(err){
                    logger.error('Error 500', { error: err });
                    res.status(500).json({error: "Internal server error; don't worry, it's not your fault."});
                }else{
                    res.json(data)
                }
            });
        }
    });
});

router.get('/:id', function(req, res, next) {
    let id;
    database.getConnection(function(err, db){
        if(err){
            logger.error('Error 500', { error: err });
            res.status(500).json({error: "Internal server error; don't worry, it's not your fault."});
        }else{
            try{
                id = new mongodb.ObjectId(req.params.id);
            }catch(err){
                res.status(404).json({error: "Can't find id " + req.params.id});
                return;
            }
            db.collection(config.collection).find({_id: id}).toArray(function(err, data){
                if(data.length === 0){
                    res.status(404).json({error: "Can't find id " + req.params.id});
                }else if (err) {
                    logger.error('Error 500', { error: err });
                    res.status(500).json({error: "Internal server error; don't worry, it's not your fault."});
                }
                else{
                    res.json(data[0]);
                }
            });
        }
    });
});

router.patch('/:id', function(req, res) {
    let id;
    var result = jsonschema.validate(req.body, schemas.updateInstallation);
    if(!(!req.body.condition && req.body.type !== "Glissade")){
        res.status(400).json({error: "You can't modify field condition on installations other than Glissade"});
        return
    } else if (result.errors.length > 0) {
        res.status(400).json(result);
        return;
        } else {
        database.getConnection(function(err, db){
            db.collection(config.collection, function (err, collection) {
                if (err) {
                    logger.error('Error 500', { error: err });
                    res.status(500).json({error: "Internal server error; don't worry, it's not your fault."});
                } else {
                    try{
                        id = new mongodb.ObjectId(req.params.id);
                    }catch(err){
                        res.status(404).json({error: "Can't find id " + req.params.id});
                        return;
                    }
                    collection.update({_id: id}, {$set : req.body}, function(err, result) {
                        if (!result) {
                            res.status(400).json({error: "Can't format JSON"});
                        }else if(result.result.n === 0){
                            res.status(404).json({error: "Can't find id " + id});
                        } else if (err) {
                            logger.error('Error 500', { error: err });
                            res.status(500).json({error: "Internal server error; don't worry, it's not your fault."});
                        } else {
                            let response = {
                              "_id" : id,
                              "modified_content" : req.body,
                              "success" : true
                            }
                            res.status(200).json(response);
                        }
                    });
                }
            });
        });
    }
});

router.delete('/:id', function(req, res) {
    let id;
    database.getConnection(function(err, db){
        db.collection(config.collection, function (err, collection) {
            if (err) {
                logger.error('Error 500', { error: err });
                res.status(500).json({error: "Internal server error; don't worry, it's not your fault."});
            } else {
                try{
                    id = new mongodb.ObjectId(req.params.id)
                }catch(err){
                    res.status(404).json({error: "Can't find id " + req.params.id});
                }
                collection.remove({_id: id}, function(err, result) {
                    if (result.result.n === 0) {
                        res.status(404).json({error: "Can't find id " + req.params.id});
                    } else if (err) {
                        logger.error('Error 500', { error: err });
                        res.status(500).json({error: "Internal server error; don't worry, it's not your fault."});
                    } else {
                        res.status(200).json(result);
                    }
                });
            }
        });
    });
});

module.exports = router;
