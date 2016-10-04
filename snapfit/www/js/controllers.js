app.controller('main', function($scope, $cordovaCamera, DataService, DataServiceHTTP, $http) {

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

    $scope.data = { searchKey: '' };

    // $scope.srcImage = { imageUrl: ''};
    $scope.getTags = function(){
        $http.get('https://api.imagga.com/v1/tagging?url='+encodeURIComponent($scope.srcImage), function (error, response, body) {
            console.log('Status:', response.statusCode);
            console.log('Headers:', JSON.stringify(response.headers));
            console.log('Response:', body);
            }).auth(apiKey, apiSecret, true);
        }

    $scope.doSearch = function() {
        if (true) {
            var promise = DataService.getAll({
                'term': $scope.data.searchKey,
                'results': '0:50',
                //'fields':'item_name'
            }).$promise;
            promise.then(function(_response) {
                console.debug(" The data " + JSON.stringify(_response));
                $scope.items = _response.hits;
            });

        } else {
            var promise = DataServiceHTTP.getAll($scope.data.searchKey);
            promise.then(function(_response) {
                console.debug(" The data " + JSON.stringify(_response.data));
                $scope.items = _response.data.hits;
            });
        }
    };
});