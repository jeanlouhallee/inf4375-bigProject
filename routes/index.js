var express = require('express');
var database = require('../models/database');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    database.getConnection(function(err, db){
        if(err){
            res.render('error', {error: err});
        }else{
            database.getData(db, function(err, data){
                if(err){
                    res.render('error', {error: err});
                }else{
                    res.render('index', { title: 'Homepage', cars: data });
                }
            });
        }
    });
});

module.exports = router;
