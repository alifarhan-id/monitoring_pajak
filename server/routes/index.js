var express = require('express');
var router = express.Router();
var path = require('path');
const filePath = path.join(__dirname, '../client');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({
      message:"hello DOG"
  })
});

module.exports = router;