  var express = require('express');
  var router = express.Router();
  var config = require('../config.js');
  var crypto = require('crypto');
  var AWS = require('aws-sdk');
  var cors = require('cors');

AWS.config.update({
  accessKeyId: config.ACCESS_KEY, secretAccessKey: config.SECRET_KEY, region: 'us-west-2'
});

router.get('/', function(req,res,next){
res.send('you are at the home page');
// next();
});

router.options('/signing', cors());
router.post('/signing', cors, function(req, res, next) {
    console.log('***************REQUEST*********');

    var request = req.body;
    var fileName = request.filename;
    var index = fileName.lastIndexOf('.');
    var extension = fileName.substring(index);
    var today = new Date();
    var path = '/' + today.getFullYear() + '/' + today.getMonth() + '/' + today.getDate() + '/' + uuid.v4() + extension;

    var readType = 'private';

    var expiration = moment().add(5, 'm').toDate(); //15 minutes

    var s3Policy = {
        'expiration': expiration,
        'conditions': [{
                'bucket': aws.bucket
            },
            ['starts-with', '$key', path],
            {
                'acl': readType
            },
            {
              'success_action_status': '201'
            },
            ['starts-with', '$Content-Type', request.type],
            ['content-length-range', 2048, 10485760], //min and max
        ]
    };

    var stringPolicy = JSON.stringify(s3Policy);
    var base64Policy = new Buffer(stringPolicy, 'utf-8').toString('base64');

    // sign policy
    var signature = crypto.createHmac('sha1', aws.secret)
        .update(new Buffer(base64Policy, 'utf-8')).digest('base64');

    var credentials = {
        url: s3Url,
        fields: {
            key: path,
            AWSAccessKeyId: aws.key,
            acl: readType,
            policy: base64Policy,
            signature: signature,
            'Content-Type': request.type,
            success_action_status: 201
        }
    };
    res.jsonp(credentials);
});

  module.exports = router;
