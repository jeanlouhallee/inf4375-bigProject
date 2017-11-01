var express = require('express');
var database = require('../models/database');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    database.getConnection(function(err, db){
        if(err){
            res.render('error', {error: err});
        }else{
            database.getData(db, function(err, data){
                if(err){
                    res.render('error', {error: err});
                }else{
                    let result = JSON.stringify(data, null, 2);
                    res.render('installations', { title: 'Installations', installations: result});
                }
            });
        }
    });
});

module.exports = router;
