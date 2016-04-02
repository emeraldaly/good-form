var classApp = angular.module('classApp', ['ui.bootstrap','ui.router', 'btford.socket-io']);
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
     .state('newUser', {
    url: '/newUser',
    templateUrl: '/views/newUser.html'
  })
       .state('class', {
    url: '/class',
    templateUrl: '/views/class.html'
  })
         .state('createClass', {
    url: '/createClass',
    templateUrl: '/views/createClass.html'
  })
         .state('chat', {
    url: '/chat',
    templateUrl: '/views/chat.html',
    controller: 'chatControl'
  })
});

classApp.controller('newUser', function($scope, $http) {
$scope.newUser = function(){
debugger
console.log($scope.userFirstName)
     $http({
        method: 'POST',
        url: '/newUser',
        data: {username:$scope.userEmail,
          userPassword:$scope.userPassword,
          userFirstName:$scope.userFirstName,
          userLastName:$scope.userLastName,
        }
      }).then(function(result) {

        console.log(result)

      });
    };

  })
