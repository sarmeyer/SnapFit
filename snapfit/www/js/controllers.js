app.controller('main', function($base64, $scope, $http, $cordovaCamera, imageService, DataService, DataServiceHTTP) {

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

            // console.log('**********');
            // console.log(srcImage.getAttribute('ng-src'));
    $scope.data = { searchKey: '' };

    $scope.getAccess = function(){
        var tokenData = imageService.getToken();
        tokenData.then(function(response){
            var token = response.data.access_token;
        var imgData = imageService.getTags({
            'token': token,
            'imageUrl': srcImage
        });
            imgData.then(function(data){
                console.log(data);
            })
        })
    }

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