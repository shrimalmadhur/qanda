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

router.post('/', (req, res, next) => {
  var errors = []
  if (!req.body.question) {
    errors.push("No question specified")
  }

  if (!req.body.answer) {
    errors.push("No answer specified")
  }

  if (errors.length){
    res.status(400).json({"error":errors.join(",")});
    return;
  }

  var data = {
    question: req.body.question,
    answer: req.body.answer
  }

  var sql ='INSERT INTO qanda (question, answer) VALUES (?,?)'
  var params =[data.question, data.answer]

  db.run(sql, params, function(err, result) {
    if (err) {
      res.status(500).json({"error": err.message})
      return;
    }

    res.redirect('/')
  })
})

router.get('/create', (req, res, next) => {
  res.render('create.pug')
})

module.exports = router;
