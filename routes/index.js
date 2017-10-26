var express = require('express');
var router = express.Router();

var data = [
    [
        brand = "Honda",
        model = "Civic",
        year = 2012
    ],
    [
        brand = "Acura",
        model = "TSX",
        year = 2007
    ]
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', data: data });
});

module.exports = router;
