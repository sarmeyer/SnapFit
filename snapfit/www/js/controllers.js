app.controller('main', function($scope, $cordovaCamera, $http, $cordovaFileTransfer, imageService, DataService, DataServiceHTTP) {

    $scope.takeImage = function() {
         var options = {
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA
            };
            $cordovaCamera.getPicture(options).then(function(imageURI) {
            $scope.srcImage = imageURI;
            uploadToS3(imageURI);
        });
    };
    function uploadToS3(imageURI) {
        var signingURI = "http://localhost:3000/signing";
        var fileName = 'snapfitphoto' + new Date().getTime() + ".jpg";
            function upload(imageURI, fileName) {
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
                    $cordovaFileTransfer.upload(imageURI, "https://" + data.bucket + ".s3.amazonaws.com/",
                        function (e) {
                            deferred.resolve(e);
                        },
                        function (e) {
                            alert("Upload failed");
                            deferred.reject(e);
                        }, options);
                }).fail(function (error) {
                        console.log(JSON.stringify(error));
                    });
                        return deferred.promise();
                     }
                        return {
                             upload: upload
                    };
            }

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