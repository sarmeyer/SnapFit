app.factory('imageService', function($http){
    return {
        getToken: function(){
            return $http.post('https://api.clarifai.com/v1/token/?client_id=Fi1oy98C5k1GWRFjZHDBKb0OVPAefQh5anrvnVoB&client_secret=sH7N9LUeacLgmdUlMPKQWTH3zdhUC8NwKRL3bs-t&grant_type=client_credentials');
        },
        getTags: function(accessData){
            return $http.get('https://api.clarifai.com/v1/tag/?model=food-items-v1.0&url='+ accessData.imageUrl, {
                    headers: {'Authorization': 'Bearer ' + accessData.token}
            });
        }
    };
});

app.factory('DataService', function($resource, nutritionix) {
    var aSearchObject = $resource('https://api.nutritionix.com/v1_1/search/:term', { term: '@term' }, {
        getAll: {
            method: 'get',
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
