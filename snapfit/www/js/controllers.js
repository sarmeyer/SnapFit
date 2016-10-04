app.controller('main', function($scope, $cordovaCamera, DataService, DataServiceHTTP) {
    // var config = require('../config.json');

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
    $scope.srcImage = { imageUrl: ''};
    $scope.getItemHeight = function(item, index) {
        return 80;
    };

    $scope.doSearch = function() {
        console.debug("Searching for: " + $scope.data.searchKey);

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