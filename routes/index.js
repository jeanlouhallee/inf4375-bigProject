var express = require('express');
var data = require('../models/data');
var database = require('../models/database');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    database.getConnection(function(err, db){
        if(err){
            res.render('error', {error: err});
        }else{
            data.getData(db, function(err, data){
                if(err){
                    res.render('error', {error: err});
                }else{
                    res.render('index', { title: 'Homepage', data: data });
                }
            });
        }
    });
});

module.exports = router;
