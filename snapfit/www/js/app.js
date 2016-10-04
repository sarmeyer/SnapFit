var app = angular.module('app', ['ionic', 'ngCordova', 'ngResource', 'base64'])
    .value('nutritionix', {
        'appId': '67ca9680',
        'appKey': 'f2c1ffde813cfe43dad5a60f4f6faa15'
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