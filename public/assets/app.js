angular.module("ClassApp", ['ngRoute'])
  .config(function($routeProvider, $locationProvider){
    $routeProvider
      .when('/home', {
        templateUrl:"/views/home.html"
      })
      .when('/users', {
        templateUrl:"/views/users.html"
      });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  });
