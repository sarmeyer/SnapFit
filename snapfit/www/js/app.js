var app = angular.module('app', ['ionic', 'ngCordova', 'ngResource'])
    .value('nutritionix', {
        'appId': '67ca9680',
        'appKey': 'f2c1ffde813cfe43dad5a60f4f6faa15'
    });
    .value('imageReq', {
        apiKey = 'acc_85fa1ef3600a1ce',
        apiSecret = '495bcac8bc9c17b37bc0778af2ecc7cd',
    })

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

// request.get('https://api.imagga.com/v1/tagging?url='+encodeURIComponent(imageUrl), function (error, response, body) {
// console.log('Status:', response.statusCode);
// console.log('Headers:', JSON.stringify(response.headers));
// console.log('Response:', body);
// }).auth(apiKey, apiSecret, true);