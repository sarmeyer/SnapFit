app.controller('main', function($scope, $http, DataService, DataServiceHTTP) {


    $scope.uploadFiles = function(file, errFiles) {
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: 'http://localhost:3030/upload',
                data: {file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                                         evt.loaded / evt.total));
            });
        }
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
