var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/i/data/list', function(req, res) {
  res.send({code:0,data:[{a:1,b:2},{a:3,b:4}]});
});

module.exports = router;
