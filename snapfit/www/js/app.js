var app = angular.module('starter', ['ionic', 'ngCordova', 'ngResource'])
    .value('nutritionix', {
        'appId': '67ca9680',
        'appKey': 'f2c1ffde813cfe43dad5a60f4f6faa15'
    });

app.controller('main', function($scope, $cordovaCamera, DataService, DataServiceHTTP) {
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
            console.log('*********');
            console.log('imageData');
            
            $scope.srcImage = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // error
        });
    };

    $scope.data = { searchKey: '' };

    $scope.getItemHeight = function(item, index) {
        return 80;
    };

    $scope.doSearch = function() {
        console.debug("Searching for: " + $scope.data.searchKey);

        if (true) {
            var promise = DataService.getAll({
                'term': $scope.data.searchKey,
                'results': '0:50', // <-- variable substitution
                //'fields':'item_name'    <-- you can specify field params
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

app.factory('DataService', function($resource, nutritionix) {
    var aSearchObject = $resource('https://api.nutritionix.com/v1_1/search/:term', { term: '@term' }, {
        getAll: {
            method: 'get',
            //isArray : true,
            params: {
                results: ':results',
                appId: nutritionix.appId,
                appKey: nutritionix.appKey,
                fields: ':fields',
            }
        }
    });
    return {
        getAll: function(_params) {
            var defaultFields = 'brand_id,item_name,item_id,brand_name,nf_calories,nf_total_fat';
            if (!_params.fields) {
                _params.fields = defaultFields;
            }
            return aSearchObject.getAll(_params);
        }
    };
});

app.factory('DataServiceHTTP', function($http, nutritionix) {
    return {
        getAll: function(_key) {
            return $http.get('https://api.nutritionix.com/v1_1/search/' + _key, {
                'params': {
                    results: '0:50',
                    appId: nutritionix.appId,
                    appKey: nutritionix.appKey,
                    fields: 'brand_id,item_name,item_id,brand_name,nf_calories,nf_total_fat'
                }
            });
        }
    };
});
app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});