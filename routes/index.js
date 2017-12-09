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
var database = require('../models/database');
var config = require('../config/config')[process.env.NODE_ENV || 'development'];
var router = express.Router();

router.get('/', function(req, res, next) {
    database.getConnection(function(err, db){
        if(err){
            err.status = 500;
            next(err);
        }else{
            db.collection(config.collection, function(err, collection){
                if(err){
                    err.status = 500;
                    next(err);
                }else{
                    db.collection(config.collection).distinct("nom", {"nom" : {$ne: null}}, function(err, installations){
                        if(err){
                            err.status = 500;
                            next(err);
                        }else{
                            res.render('index', { title: 'Installations de la ville de Montréal', installations: installations});
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;
