var classApp = angular.module('classApp', ['ui.bootstrap','ui.router', 'btford.socket-io', 'ngTable', 'ngCookies']);

classApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/views/info.html')
  $stateProvider
  // HOME STATES AND NESTED VIEWS ========================================
  .state('home', {
    url: '/home',
    templateUrl: '/views/home.html'
  })
  .state('allUsers', {
    url: '/allUsers',
    templateUrl: '/views/allUsers.html'
  })
  .state('myLecture', {
    url: '/myLecture',
    templateUrl: '/views/myLecture.html'
  })
  .state('updateLecture', {
    url: '/updateLecture',
    templateUrl: '/views/updateLecture.html'
  })
.state('lectures', {
    url: '/lectures',
    templateUrl: '/views/lectures.html'
  })
.state('viewLecture', {
    url: '/viewLecture',
    templateUrl: '/views/viewLecture.html'
  })
  .state('createLecture', {
    url: '/createLecture',
    templateUrl: '/views/createLecture.html'
  })
    .state('editAttend', {
    url: '/editAttend',
    templateUrl: '/views/editAttend.html'
  })
  .state('viewAttendDates', {
    url: '/viewAttendDates',
    templateUrl: '/views/viewAttendDates.html'
  })
   .state('viewAttend', {
    url: '/viewAttend',
    templateUrl: '/views/viewAttend.html'
  })
  .state('attendance', {
    url: '/attendance',
    templateUrl: '/views/attendance.html'
  })
    .state('submitHomework', {
    url: '/submitHomework',
    templateUrl: '/views/submitHomework.html'
  })
     .state('editAttendance', {
    url: '/editAttendance',
    templateUrl: '/views/editAttendance.html'
  })
   .state('homeworkSubmissions', {
    url: '/homeworkSubmissions',
    templateUrl: '/views/homeworkSubmissions.html'
  })
   .state('viewHomeworkByClass', {
    url: '/viewHomeworkByClass',
    templateUrl: '/views/viewHomeworkByClass.html'
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
  .state('myClass', {
    url: '/myClass',
    templateUrl: '/views/myClass.html'
  })
   .state('myClassStudents', {
    url: '/myClassStudents',
    templateUrl: '/views/myClassStudents.html'
  })
  .state('myHomework', {
    url: '/myHomework',
    templateUrl: '/views/myHomework.html'
  })
  .state('updateUser', {
    url: '/updateUser',
    templateUrl: '/views/updateUser.html'
  })
  .state('lectureLinks', {
    url: '/lectureLinks',
    templateUrl: '/views/lectureLinks.html'
  })
  // .state('login', {
  //   url: '/splash',
  //   templateUrl: '/splash.html'
  // })
});
classApp.run(['$state', function ($state) {
   $state.transitionTo('info');
}])

classApp.controller('newUser', function($scope, $http, $state, $rootScope) {
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
      if (result.data == "taken"){
       $scope.userTaken="This Email was already used, please try another";
      }
      else{
        $state.go($state.current, {}, {reload: true});
        $rootScope.message = "New User Created!";
        
      }
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

classApp.controller('loginController',['$scope', '$http', '$state','$rootScope', '$cookies',  function($scope, $http, $state, $rootScope, $cookies) {

  $scope.login = function(){
    $http({
      method: 'POST',
      url: '/login',
      data: {
        username:$scope.userEmail,
        password:$scope.userPassword,
      }
    }).then(function(res) {
      console.log("Login response is", res);
      $cookies.put('token', res.data.token);
      $cookies.put('currentUser', res.firstname);
      console.log(res.data);
      $rootScope.currentUser = res.firstname;

      $state.go('home');
    }, function(err){
      console.log("Login error ", err);
    });
  }
}]);


// angular.module('classApp').run(function($rootScope, $cookies){
//   if($cookies.get('token') && $cookies.get('currentUser')){
//     $rootScope.token = $cookies.get('token');
//     $rootScope.currentUser = $cookies.get('currentUser');
//   }
// });
