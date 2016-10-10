app.controller('imageCtrl', function ($scope, imageService, DataService, $cordovaCamera) {
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

 $scope.images = [];

    $scope.addImage = function() {
        var options = {
		destinationType : Camera.DestinationType.FILE_URI,
		sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
		allowEdit : false,
		encodingType: Camera.EncodingType.JPEG,
		popoverOptions: CameraPopoverOptions,
	};
    	$cordovaCamera.getPicture(options).then(function(imageData) {
            onImageSuccess(imageData);
		function onImageSuccess(fileURI) {
			createFileEntry(fileURI);
            $scope.imageData = fileURI;
		}
        function createFileEntry(fileURI) {
			window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
		}
        function copyFile(fileEntry) {
                    var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
                    var newName = makeid() + name;

                    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
                        fileEntry.copyTo(
                            fileSystem2,
                            newName,
                            onCopySuccess,
                            fail
                        );
                    },
                    fail);
                }
        function onCopySuccess(entry) {
            $scope.$apply(function () {
                $scope.images.push(entry.nativeURL);
            });
        }
        function fail(error) {
			console.log("fail: " + error.code);
		}

		function makeid() {
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

			for (var i=0; i < 5; i++) {
				text += possible.charAt(Math.floor(Math.random() * possible.length));
			}
			return text;
		}
        }, function(err) {
            console.log(err);
        });
        console.log("add image");
    };

    $scope.urlForImage = function(imageName) {
        var name = imageName.substr(imageName.lastIndexOf('/') + 1);
        var trueOrigin = cordova.file.dataDirectory + name;
        return trueOrigin;
    };

    $scope.formData = {};
});     