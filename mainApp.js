//angular.module('MainApp',[]);
var MainApp=angular.module('MainApp', ['ngRoute']);

MainApp.config(function($routeProvider){
	$routeProvider
    .when('/', {
      controller: 'MainController',
      templateUrl: '/views/list_and_add.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});

