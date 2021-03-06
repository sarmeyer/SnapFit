var app = angular.module('fileUpload', ['ionic', 'ngCordova', 'ngResource', 'ngFileUpload', 'ngMaterial'])
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
app.config(function($ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
})

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .dark();
});

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

  .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'imageCtrl'
        }
      }
    })
    .state('tab.saved', {
      url: '/saved',
      views: {
        'tab-saved': {
          templateUrl: 'templates/tab-saved.html',
          controller: 'SaveCtrl'
        }
      }
    })
  $urlRouterProvider.otherwise('/tab/dash');

})
