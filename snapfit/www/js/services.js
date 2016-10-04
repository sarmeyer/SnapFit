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
// app.factory('imageService', function($http){
//     apiKey = 'acc_85fa1ef3600a1ce',
//     apiSecret = '495bcac8bc9c17b37bc0778af2ecc7cd',
//     imageUrl = $scope.srcImage;

//     return {
//         tagImage: function(imageUrl){
//             return $http.get('https://api.imagga.com/v1/tagging?url='+encodeURIComponent(imageUrl), function (error, response, body) {
//                 console.log('Status:', response.statusCode);
//                 console.log('Headers:', JSON.stringify(response.headers));
//                 console.log('Response:', body);
//                 }).auth(apiKey, apiSecret, true);
//         }
//     }
// })
