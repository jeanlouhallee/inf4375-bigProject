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
                query = {"arrondisse": req.query.arrondissement};
            }
            db.collection(config.collection).find(query).toArray(function(err, data){
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
