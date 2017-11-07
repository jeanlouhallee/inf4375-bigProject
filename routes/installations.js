var express = require('express');
var database = require('../models/database');
var config = require('../config');
var router = express.Router();

router.get('/', function(req, res, next) {
    database.getConnection(function(err, db){
        if(err){
            res.render('error', {error: err});
        }else{
            let query;
            if(req.query.arrondissement){
                query = {"arrondisse": req.query.arrondissement};
            }
            db.collection(config.collection).find(query).toArray(function(err, result){
                if(err){
                    res.render('error', {error: err});
                }else{
                    let data = JSON.stringify(result, null, 2);
                    if(query){
                        //res.json(result);
                        res.render('installations', { title: 'Installations', installations: data});
                    }else{
                        res.render('installations', { title: 'Installations', installations: data});
                    }
                }
            });
        }
    });
});

module.exports = router;
