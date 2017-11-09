var express = require('express');
var database = require('../models/database');
var config = require('../config');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    database.getConnection(function(err, db){
        if(err){
            res.render('500');
        }else{
            db.collection(config.collection, function(err, collection){
                if(err){
                    res.render('500');
                }else{
                    collection.distinct('nom', {"nom" : {$ne : null}}, function(err, data){
                        if(err){
                            res.render('500');
                        }else{
                            console.log(data);
                            res.render('index', { title: 'Installations de la ville de Montréal', installlations: data});
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;
