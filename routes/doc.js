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
var raml2html = require('raml2html');
var router = express.Router();
var configWithDefaultTheme = raml2html.getConfigForTheme();
/* GET users listing. */
router.get('/', function(req, res, next) {
     var onError = function (err) {
       console.log(err);
       res.sendStatus(500);
     };
     var onSuccess = function(html) {
         res.render('doc', {content: html});
     };
     raml2html.render("routes/doc/doc.raml", configWithDefaultTheme).then(onSuccess, onError);
});

module.exports = router;
