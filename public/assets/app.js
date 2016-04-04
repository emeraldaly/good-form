
var classApp = angular.module('classApp', ['ui.bootstrap','ui.router', 'btford.socket-io','ngTable']);

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
     .state('addUser', {
    url: '/addUser',
    templateUrl: '/views/addUser.html'
  })
       .state('class', {
    url: '/class',
    templateUrl: '/views/class.html'
  })
    .state('showClasses', {
    url: '/showClasses',
    templateUrl: '/views/showClasses.html'
  })
         .state('createClass', {
    url: '/createClass',
    templateUrl: '/views/createClass.html'
  })
           .state('editClass', {
    url: '/editClass',
    templateUrl: '/views/editClass.html'
  })
    .state('info', {
    url: '/info',
    templateUrl: '/views/info.html'
  })
    .state('chat', {
    url: '/chat',
    templateUrl: '/views/chat.html',
    controller: 'chatControl'
  })
});

classApp.controller('newUser', function($scope, $http) {
$scope.addUser = function(){
console.log($scope.userFirstName)
     $http({
        method: 'POST',
        url: '/addUser',
        data: {username:$scope.userEmail,
          userRole:$scope.userRole,
          userPassword:$scope.userPassword,
          userFirstName:$scope.userFirstName,
          userLastName:$scope.userLastName,
        }
      }).then(function(result) {
       
      });
    };
$scope.register = function(){
  console.log($scope.organizationName)
     $http({
        method: 'POST',
        url: '/newUser',
        data: {username:$scope.userEmail,
          organizationName:$scope.organizationName,
          address:$scope.address,
          website:$scope.website,
          userRole:$scope.userRole,
          userPassword:$scope.userPassword,
          userFirstName:$scope.userFirstName,
          userLastName:$scope.userLastName,
        }
      }).then(function(result) {
        console.log(result)
      });
  }
});

