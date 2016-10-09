app.controller('imageCtrl', function ($scope, imageService, DataService) {
    $scope.getAccess = function(){
    var image = angular.element('#url').attr('src');
    var imageURI = encodeURI(image);

        var tokenData = imageService.getToken();
            tokenData.then(function(response){
                var token = response.data.access_token;
                var imgData = imageService.getTags({
                    'token': token,
                    'imageUrl': imageURI
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
    // };
