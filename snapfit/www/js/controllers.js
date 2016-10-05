app.controller('main', function($scope, $cordovaCamera, $http, imageService, DataService, DataServiceHTTP) {

    $scope.takeImage = function() {
        var options = {
            quality: 80,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 250,
            targetHeight: 250,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.srcImage = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // error
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
                console.log(data.data.results[0].result.tag.classes);
            });
        });
    };

    $scope.data = { searchKey: '' };

    $scope.doSearch = function() {
        if (true) {
            var promise = DataService.getAll({
                'term': $scope.data.searchKey,
                'results': '0:50'
            }).$promise;
            promise.then(function(_response) {
                $scope.items = _response.hits;
            });

        } else {
            var promise = DataServiceHTTP.getAll($scope.data.searchKey);
            promise.then(function(_response) {
                $scope.items = _response.data.hits;
            });
        }
    };
});