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
var config = require('../config');
var router = express.Router();

router.get('/', function(req, res, next) {
    database.getConnection(function(err, db){
        if(err){
            res.render('500');
        }else{
            let query;
            if(req.query.arrondissement){
                // console.log(req.query);
                query = {"arrondissement": req.query.arrondissement};
            }
            db.collection(config.collection).find(req.query).toArray(function(err, data){
                if(err){
                    res.render('500');
                }else{
                    //let data = JSON.stringify(result, null, 2);
                        if(query){
                        res.json(data);
                        //res.render('installations', { title: 'Installations', installations: data});
                    }else{
                        res.json(data)
                        //res.render('installations', { title: 'Installations', installations: data});
                    }
                }
            });
        }
    });
});

module.exports = router;
