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


<form class="ng-pristine ng-valid">
                    <!-- ngRepeat: ingredient in ingredients | limitTo: 8 --><div class="ingredientList" name="ingredientList" ng-repeat="ingredient in ingredients | limitTo: 8">
                        <label class="checkbox-inline ng-binding">
                            <input type="checkbox" name="sweet" ng-model="formData.ingredient" ng-value="sweet" class="ng-pristine ng-untouched ng-valid ng-empty">sweet
                        </label>
                    </div><!-- end ngRepeat: ingredient in ingredients | limitTo: 8 --><div class="ingredientList" name="ingredientList" ng-repeat="ingredient in ingredients | limitTo: 8">
                        <label class="checkbox-inline ng-binding">
                            <input type="checkbox" name="syrup" ng-model="formData.ingredient" ng-value="syrup" class="ng-pristine ng-untouched ng-valid ng-empty">syrup
                        </label>
                    </div><!-- end ngRepeat: ingredient in ingredients | limitTo: 8 --><div class="ingredientList" name="ingredientList" ng-repeat="ingredient in ingredients | limitTo: 8">
                        <label class="checkbox-inline ng-binding">
                            <input type="checkbox" name="pastry" ng-model="formData.ingredient" ng-value="pastry" class="ng-pristine ng-untouched ng-valid ng-empty">pastry
                        </label>
                    </div><!-- end ngRepeat: ingredient in ingredients | limitTo: 8 --><div class="ingredientList" name="ingredientList" ng-repeat="ingredient in ingredients | limitTo: 8">
                        <label class="checkbox-inline ng-binding">
                            <input type="checkbox" name="pancake" ng-model="formData.ingredient" ng-value="pancake" class="ng-pristine ng-untouched ng-valid ng-empty">pancake
                        </label>
                    </div><!-- end ngRepeat: ingredient in ingredients | limitTo: 8 --><div class="ingredientList" name="ingredientList" ng-repeat="ingredient in ingredients | limitTo: 8">
                        <label class="checkbox-inline ng-binding">
                            <input type="checkbox" name="cake" ng-model="formData.ingredient" ng-value="cake" class="ng-pristine ng-untouched ng-valid ng-empty">cake
                        </label>
                    </div><!-- end ngRepeat: ingredient in ingredients | limitTo: 8 --><div class="ingredientList" name="ingredientList" ng-repeat="ingredient in ingredients | limitTo: 8">
                        <label class="checkbox-inline ng-binding">
                            <input type="checkbox" name="cream" ng-model="formData.ingredient" ng-value="cream" class="ng-pristine ng-untouched ng-valid ng-empty">cream
                        </label>
                    </div><!-- end ngRepeat: ingredient in ingredients | limitTo: 8 --><div class="ingredientList" name="ingredientList" ng-repeat="ingredient in ingredients | limitTo: 8">
                        <label class="checkbox-inline ng-binding">
                            <input type="checkbox" name="honey" ng-model="formData.ingredient" ng-value="honey" class="ng-pristine ng-untouched ng-valid ng-empty">honey
                        </label>
                    </div><!-- end ngRepeat: ingredient in ingredients | limitTo: 8 --><div class="ingredientList" name="ingredientList" ng-repeat="ingredient in ingredients | limitTo: 8">
                        <label class="checkbox-inline ng-binding">
                            <input type="checkbox" name="chocolate" ng-model="formData.ingredient" ng-value="chocolate" class="ng-pristine ng-untouched ng-valid ng-empty">chocolate
                        </label>
                    </div><!-- end ngRepeat: ingredient in ingredients | limitTo: 8 -->
                    <button ng-show="showme" type="submit" class="nutritionBtn button button-assertive" style="">Get nutrition facts!</button>
                </form>