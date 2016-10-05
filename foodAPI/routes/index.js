var express = require('express');
var router = express.Router();

router.post('/image_processor', function(req, res, next) {
  res.send('Hello World');
});

module.exports = router;
