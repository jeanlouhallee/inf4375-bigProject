var express = require('express');
var database = require('../models/database');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Installations de la ville de Montréal'});
});

module.exports = router;
