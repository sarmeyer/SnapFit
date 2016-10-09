app.controller('imageCtrl', function ($scope, $http, Upload, $timeout) {
    // ['$scope', '$http', 'Upload', '$timeout',
    $scope.uploadPic = function(file) {
        console.log('********ANGULAR UPLOAD PIC FUNCTION*****');

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
                console.log(result);
                Upload.upload({
                    url: 'https://snapfitupload.s3.amazonaws.com/', //S3 upload url including bucket name
                    transformRequest: function(data, headersGetter) {
                        var headers = headersGetter();
                        delete headers.Authorization;
                        return data;
                    },
                    fields: result.fields, //credentials
                    method: 'POST',
                    file: file
                }).progress(function(evt) {
                    console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total));
                }).success(function(data, status, headers, config) {
                    // file is uploaded successfully
                    console.log('file ' + config.file.name + 'is uploaded successfully. Response: ' + data);
                }).error(function() {

                });
            })
            .error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
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
