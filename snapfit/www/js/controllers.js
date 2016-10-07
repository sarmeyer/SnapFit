app.controller('main', function($scope, $cordovaCamera, $http, $cordovaFileTransfer, imageService, DataService, DataServiceHTTP) {

    $scope.takeImage = function() {
         var options = {
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA
            };
            $cordovaCamera.getPicture(options).then(function(imageURI) {
            $scope.srcImage = imageURI;
        });
            // $scope.uploadToS3(image);
    };
    var image = 'https://pbs.twimg.com/profile_images/446566229210181632/2IeTff-V.jpeg';
     $scope.uploadToS3 = function(image) {

        var signingURI = "http://localhost:3030/signing";
        var fileName = 'snapfitphoto' + new Date().getTime() + ".jpg";
         console.log('*****************');
                $http.post(signingURI, {
                    "fileName": fileName
                }).success(function(data, status, headers, config) {
                    var Uoptions = {};
                    Uoptions.fileKey = "file";
                    Uoptions.fileName = fileName;
                    Uoptions.mimeType = "image/jpeg";
                    Uoptions.chunkedMode = false;
                    Uoptions.headers = {
                        connection: "close"
                    };
                    Uoptions.params = {
                        "key": fileName,
                        "AWSAccessKeyId": data.awsKey,
                        "acl": "private",
                        "policy": data.policy,
                        "signature": data.signature,
                        "Content-Type": "image/jpeg"
                    };
                $cordovaFileTransfer.upload("https://" + data.bucket + ".s3.amazonaws.com/", image, Uoptions)
                        .then(function(result) {
                            // Success!
                            console.log('upload to s3 succeed ', result);
                        }, function(err) {
                            // Error
                            $ionicLoading.show({template : 'Upload Failed', duration: 3000});
                            console.log('upload to s3 fail ', err);
                        }, function(progress) {
                    });
                })
                    .error(function(data, status, headers, config) {
                        console.log('didnt get signed doc: ' + JSON.stringify(data));
                    });
            };

    $scope.getAccess = function(){
        var tokenData = imageService.getToken();
        tokenData.then(function(response){
            var token = response.data.access_token;
        var imgData = imageService.getTags({
            'token': token,
            'imageUrl': srcImage.getAttribute('src')
        });
            imgData.then(function(data){
                $scope.ingredients = data.data.results[0].result.tag.classes;
                $scope.data.searchKey = $scope.ingredients[0];
                $scope.doSearch();
            });
        });
    };

    $scope.data = { searchKey: '' };

    $scope.doSearch = function() {
        if ( true ) {
        var promise = DataService.getAll( {
            'term' : $scope.data.searchKey,
            'results':'0:50',
        }).$promise;
        promise.then(function(_response) {
            $scope.items = _response.hits;
        });
        }
    };
});