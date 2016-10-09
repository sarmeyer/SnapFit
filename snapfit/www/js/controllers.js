app.controller('imageCtrl', function ($scope, $http, Upload, $timeout) {
    $scope.uploadPic = function(file) {

        var filename = file.name;
        var type = file.type;
        var query = {
            filename: filename,
            type: type,
            crossDomain: true
        };

        $http.post('http://localhost:3030/signing', query)
            .success(function(result) {
                console.log('*********SIGNING RESULT********');
                console.log(result.fields);
                var data = result.fields;
                Upload.upload({
                    url:'https://uploadimages-snapfit.s3.amazonaws.com/',
                    method: 'POST',
                    data: {
                        key: data.key,
                        acl: 'private',
                        Policy: data.policy,
                        'X-Amz-Credential' : result.credentials,
                        'X-Amz-Algorithm': 'AWS4-HMAC-SHA256',
                        'X-Amz-Signature': data.signature,
                        "Content-Type": data['Content-Type'],
                        file: file
                    }
                }).progress(function(evt) {
                    console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total));
                }).success(function(data, status, headers, config) {
                    // file is uploaded successfully
                    console.log('file ' + config.file.name + 'is uploaded successfully. Response: ' + data);
                }).error(function() {

                });
            })
            .error(function(data, status, headers, config) {
                console.log('There was an error');
                console.log(data);
        });
    };
});


//     $scope.getAccess = function(){
//         var tokenData = imageService.getToken();
//         tokenData.then(function(response){
//             var token = response.data.access_token;
//         var imgData = imageService.getTags({
//             'token': token,
//             'imageUrl': srcImage.getAttribute('src')
//         });
//             imgData.then(function(data){
//                 $scope.ingredients = data.data.results[0].result.tag.classes;
//                 $scope.data.searchKey = $scope.ingredients[0];
//                 $scope.doSearch();
//             });
//         });
//     };

//     $scope.data = { searchKey: '' };

//     $scope.doSearch = function() {
//         if ( true ) {
//         var promise = DataService.getAll( {
//             'term' : $scope.data.searchKey,
//             'results':'0:50',
//         }).$promise;
//         promise.then(function(_response) {
//             $scope.items = _response.hits;
//         });
//         }
//     };
// });

    // $scope.takeImage = function() {
    //      var options = {
    //         destinationType: Camera.DestinationType.FILE_URI,
    //         sourceType: Camera.PictureSourceType.CAMERA
    //         };
    //         $cordovaCamera.getPicture(options).then(function(imageURI) {
    //         $scope.srcImage = imageURI;
    //     });
    //         // $scope.uploadToS3(image);
    // };
