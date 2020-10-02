var express = require('express');
var router = express.Router();
var db = require('../db/database')

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  var sql = "select * from qanda"
  var params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }

    res.render('index', {
      "message":"success",
      "data":rows
    });
  });
});

module.exports = router;
