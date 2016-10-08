  var express = require('express');
  var router = express.Router();
  var config = require('../config.js');
  var crypto = require('crypto');
  var AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: config.ACCESS_KEY, secretAccessKey: config.SECRET_KEY, region: 'us-west-2'
});

router.get('/', function(req,res,next){
res.send('you are at the home page');
});

function S3upload(req, res, next){
    var s3bucket = new AWS.S3({params: {Bucket: 'uploadsnapfit'}});
    s3bucket.createBucket(function() {
        console.log('*********REQ******');
        console.log(req.body);
        var params = {Key: req.body.fileName, ContentType: 'req.body.type'};
        s3.getSignedUrl('getObject', params, function (err, url) {
            console.log("The URL is", url);
            });
        s3bucket.upload(params, function(err, data) {
            if (err) {
            console.log("Error uploading data: ", err);
            } else {
            console.log("Successfully uploaded data to S3");
            }
        });
    });
}
 router.post('/upload', S3upload);

  module.exports = router;
