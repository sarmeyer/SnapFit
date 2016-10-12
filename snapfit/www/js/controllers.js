app.controller('imageCtrl', function($scope, $ionicActionSheet, $cordovaCamera, APIservice, DataService) {

  $scope.addMedia = function() {
    $scope.hideSheet = $ionicActionSheet.show({
      buttons: [{
        text: 'Take photo'
      }, {
        text: 'Photo from library'
      }],
      titleText: 'Add images',
      cancelText: 'Cancel',
      buttonClicked: function(index) {
        $scope.takePhoto(index);
        return true;
      }
    });
  }

  $scope.takePhoto = function(type) {
    var source;
    switch (type) {
      case 0:
        source = Camera.PictureSourceType.CAMERA;
        break;
      case 1:
        source = Camera.PictureSourceType.PHOTOLIBRARY;
        break;
    }
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: source,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };
    $cordovaCamera.getPicture(options).then(function(sourcePath) {
      $scope.imgURI = sourcePath;
      $scope.foodAPI(sourcePath);
    })
  }
  $scope.getAccess = function() {
    var image = angular.element('#url').attr('src');
    var imageURI = encodeURI(image);

    var tokenData = APIservice.getToken();
    tokenData.then(function(response) {
      var token = response.data.access_token;
      var imgData = APIservice.getTags({
        'token': token,
        'imageUrl': imageURI
      });
      imgData.then(function(data) {
        $scope.ingredients = data.data.results[0].result.tag.classes;
        $scope.doSearch();
      });
    });
  };

  $scope.data = {
    searchKey: ''
  };

  $scope.selectItem = function() {
    if (true) {
      var promise = DataService.getAll({
        'term': $scope.data.group1,
        'results': '0:50',
      }).$promise;
      promise.then(function(_response) {
        $scope.items = _response.hits;
      });
    }
  };

  $scope.doSearch = function() {
    if (true) {
      var promise = DataService.getAll({
        'term': $scope.data.searchKey,
        'results': '0:50',
      }).$promise;
      promise.then(function(_response) {
        $scope.items = _response.hits;
      });
    }
  };
});

app.controller('SaveCtrl', function($scope) {

});
