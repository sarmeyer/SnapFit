app.controller('main', function($scope, $cordovaCamera, $http, imageService, DataService, DataServiceHTTP) {

    $scope.takeImage = function() {
         var options = {
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA
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