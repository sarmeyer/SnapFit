  var express = require('express');
  var router = express.Router();
  var config = require('../config.js');
  var crypto = require('crypto');
  var aws = require('aws-sdk');
  var cors = require('cors');
  var moment = require('moment');

aws.config.update({
  accessKeyId: config.ACCESS_KEY, secretAccessKey: config.SECRET_KEY, region: 'us-west-2'
});

var s3Url = 'https://uploadimages-snapfit.s3.amazonaws.com/';

var corsOptions = {
    origin: '*'
};

router.options('*', cors());

router.get('/', function(req,res,next){
    res.render('index');
});
// exports.signing = function(req, res) {
router.use('/signing', cors(corsOptions),  function(req, res, next) {
    var request = req.body;
    var fileName = request.filename;
    var path = 'uploadimages-snapfit' + fileName;
    var readType = 'private';

    var expiration = moment().add(5, 'm').toDate(); //15 minutes

    var s3Policy = {
        'expiration': expiration,
        'conditions': [{
                'bucket': 'uploadimages-snapfit'
            },
            ['starts-with', '$key', path],
            {
                'acl': readType
            },
            {
              'success_action_status': '201'
            },
            ['starts-with', '$Content-Type', request.type],
            ['content-length-range', 2048, 10485760], //min and max range
        ]
    };

    var stringPolicy = JSON.stringify(s3Policy);
    var base64Policy = new Buffer(stringPolicy, 'utf-8').toString('base64');

    var signature = crypto.createHmac('sha1', aws.config.credentials.secretAccessKey)
        .update(new Buffer(base64Policy, 'utf-8')).digest('base64');

    var credentials = {
        url: s3Url,
        fields: {
            key: path,
            awsAccessKeyId: aws.config.credentials.accessKeyId,
            acl: readType,
            policy: base64Policy,
            signature: signature,
            'Content-Type': request.type,
            success_action_status: 201,
        }
    };
    res.jsonp(credentials);
    console.log('**************POST * REQUEST*********');
});

  module.exports = router;
