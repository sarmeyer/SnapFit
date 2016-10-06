  var express = require('express');
  var router = express.Router();
  var aws = require('aws-sdk');
  var config = require('../config.js')

function sign(req, res, next) {
    var fileName = req.body.fileName,
        expiration = new Date(new Date().getTime() + 1000 * 60 * 5).toISOString();

    var policy =
    { "expiration": expiration,
        "conditions": [
            {"bucket": config.S3_BUCKET},
            {"key": fileName},
            {"acl": 'public-read'},
            ["starts-with", "$Content-Type", ""],
            ["content-length-range", 0, 524288000]
        ]};

    policyBase64 = new Buffer(JSON.stringify(policy), 'utf8').toString('base64');
    signature = crypto.createHmac('sha1', secret).update(policyBase64).digest('base64');
    res.json({bucket: config.S3_BUCKET, awsKey: config.ACCESS_KEY, policy: policyBase64, signature: signature});
}
 app.post('/signing', sign);

  module.exports = router
