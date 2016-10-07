app.controller('main', function($scope, $http, DataService, DataServiceHTTP) {

 $scope.setFile = function(element){
    $scope.$apply(function($scope){
      $scope.currentDocument = element.files[0];
    });
  };

   $scope.uploadFile = function() {
    $http.post('http://localhost:3030/upload', {fileName: $scope.currentDocument.name})
     .success(function(results){
         console.log(results);

      $http.put(results.signedUrl, $scope.currentDocument)
       .success(function(){
        console.log('*********PUT REQUEST*********');

      });
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

