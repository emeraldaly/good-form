var classApp = angular.module('classApp', ['ui.bootstrap','ui.router']);
  // .config(function($routeProvider, $locationProvider){
  //   $routeProvider
  //     .when('/home', {
  //       templateUrl:"/views/home.html"
  //     })
  //     .when('/users', {
  //       templateUrl:"/views/users.html"
  //     });

  //   $locationProvider.html5Mode({
  //     enabled: true,
  //     requireBase: false
  //   });
  // });


classApp.config(function($stateProvider, $urlRouterProvider) {
$urlRouterProvider.otherwise('/home')
$stateProvider
// HOME STATES AND NESTED VIEWS ========================================
  .state('home', {
    url: '/home',
    templateUrl: '/views/home.html'
  })
    .state('users', {
    url: '/users',
    templateUrl: '/views/users.html'
  })
    .state('register', {
    url: '/register',
    templateUrl: '/views/register.html'
  })

  });