
var classApp = angular.module('classApp', ['ui.bootstrap','ui.router', 'btford.socket-io','ngTable']);

classApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/splash')
  $stateProvider
  // HOME STATES AND NESTED VIEWS ========================================
  .state('home', {
    url: '/home',
    templateUrl: '/views/home.html'
  })
    .state('submitHomework', {
    url: '/submitHomework',
    templateUrl: '/views/submitHomework.html'
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
  .state('info', {
    url: '/info',
    templateUrl: '/views/info.html'
  })
  .state('chat', {
    url: '/chat',
    templateUrl: '/views/chat.html',
    controller: 'chatControl'
  })
  .state('editClass', {
    url: '/editClass',
    templateUrl: '/views/editClass.html'
  })
  .state('metrics', {
    url: '/metrics',
    templateUrl: '/views/highcharts.html'
  })
  .state('createHomework', {
    url: '/createHomework',
    templateUrl: '/views/createHomework.html'
  })
  .state('viewAssignments', {
    url: '/viewAssignments',
    templateUrl: '/views/viewAssignments.html'
  })
  .state('updateUser', {
    url: '/updateUser',
    templateUrl: '/views/updateUser.html'
  })
  .state('login', {
    url: '/splash',
    templateUrl: '/splash.html'
  })
});


classApp.controller('newUser', function($scope, $http, $state) {
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
      $state.go('login');
    });
  };

  $scope.register = function(){
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
    }).then(
      function successCallback(result) {
        console.log(result)
        $state.go('login');
      }, function errorCallback(result){
        console.log(result);
      }
    );
  }
});

classApp.controller('loginController', function($scope, $http, $state) {
  $scope.login = function(){
    $http({
      method: 'POST',
      url: '/login',
      data: {
        username:$scope.userEmail,
        password:$scope.userPassword,
      }
    }).then(function(result) {
      console.log(result.data);
      $state.go('home');
    });
  }
});
